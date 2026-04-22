import axios from "axios";
import { baseUrl } from "../../api/baseUrl";

const cache = new Map();
const pending = new Map();

// Dynamic cache for any read operation (GET or POST with 'get' in URL)
const getKey = (cfg) => {
    // Keep the full URL including query parameters for proper cache differentiation
    const url = cfg.url;  // Don't strip query params - they're important for cache keys!
    return `${cfg.method}:${url}:${JSON.stringify(cfg.data || {})}:${JSON.stringify(cfg.params || {})}`;
};

setInterval(() => {
    const now = Date.now();
    cache.forEach((v, k) => (now - v.t > 10000) && cache.delete(k));
}, 30000);

export const apiInstance = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' }
});

// Store toast function reference
let toastFunction = null;

// Store to track if we're in an action context (user-initiated action)
let isUserAction = false;

// Feature flag to enable/disable permission error suppression
// Set to false to always show all errors immediately (like before)
// You can change this to false to disable the feature temporarily
const ENABLE_PERMISSION_ERROR_SUPPRESSION = false; // TEMPORARILY DISABLED - Set to true to enable

// Permission-related error patterns - be specific to avoid false positives
const permissionErrorPatterns = [
    /don't have permission/i,
    /user don't have permission/i,
    /you do not have permission/i,
    /permission denied/i,
    /access denied/i,
    /not authorized to/i,
    /insufficient privileges/i,
    /forbidden access/i,
    /no permission to/i,
    /lacks permission/i,
    /permission required/i,
    /unauthorized to perform/i
];

// Check if error message is permission-related
const isPermissionError = (message) => {
    if (!message) return false;
    return permissionErrorPatterns.some(pattern => pattern.test(message));
};

// Set action context - call this before user-initiated actions
export const setUserActionContext = (isAction) => {
    isUserAction = isAction;
    // Auto-reset after a delay to ensure it doesn't stay on
    if (isAction) {
        setTimeout(() => {
            isUserAction = false;
        }, 5000); // Reset after 5 seconds
    }
};

// Wrapper for API calls that are user-initiated actions
export const withUserAction = async (apiCall) => {
    setUserActionContext(true);
    try {
        const result = await apiCall();
        setUserActionContext(false);
        return result;
    } catch (error) {
        setUserActionContext(false);
        throw error;
    }
};

// Function to set the toast function
export const setGlobalToast = (showToast) => {
    toastFunction = showToast;
};

// Smart request interceptor
apiInstance.interceptors.request.use(async (cfg) => {
    // Auth
    // Read token from storage
    const token = localStorage.getItem('token');
    
    // Only add Authorization header if we have a valid-looking token
    // This prevents sending malformed "Bearer null" or "Bearer undefined" which can cause 401s
    if (token && token !== 'null' && token !== 'undefined') {
        cfg.headers.Authorization = `Bearer ${token}`;
    }

    // Cache any read operation (GET or POST with 'get' in path)
    const isRead = cfg.method === 'get' || (cfg.method === 'post' && cfg.url?.includes('/get'));
    if (!isRead || cfg.skipCache) return cfg;

    const key = cfg.key = getKey(cfg);
    const now = Date.now();

    // Use cache if fresh
    const cached = cache.get(key);
    if (cached && (now - cached.t < 10000)) {
        console.log('🚀 Cached:', cfg.url);
        cfg.adapter = () => Promise.resolve({ data: cached.d, status: 200, statusText: 'OK', headers: {}, config: cfg });
        return cfg;
    }

    // Prevent duplicate requests
    if (pending.has(key)) {
        // console.log('⏳ Waiting:', cfg.url);
        cfg.adapter = () => pending.get(key);
        return cfg;
    }

    // New request
    const promise = new Promise((res, rej) => { cfg.res = res; cfg.rej = rej; });
    pending.set(key, promise);
    return cfg;
}, e => Promise.reject(e));

// Response handler
apiInstance.interceptors.response.use(
    (res) => {
        const { key, res: resolve } = res.config;
        if (key) {
            // Cache it
            cache.set(key, { d: res.data, t: Date.now() });
            // Resolve waiting requests
            resolve?.(res);
            pending.delete(key);
        }

        // --- Global Success Toast Handling ---
        const method = res.config.method?.toLowerCase();
        const url = res.config.url?.toLowerCase() || '';

        // Exclude listing/fetching operations even if they use POST
        const isFetchRequest = 
            url.includes('/get') || 
            url.includes('filter') || 
            url.includes('search') || 
            url.includes('history') ||
            url.includes('list') ||
            // Special case for list endpoints that use POST without /get
            (method === 'post' && !url.includes('/create') && !url.includes('/update') && !url.includes('/delete') && !url.includes('/edit') && !url.includes('/add'));

        // Mutation operations (Add, Update, Delete)
        const isMutation = (['post', 'put', 'patch', 'delete'].includes(method) && !isFetchRequest) ||
            url.includes('/create') ||
            url.includes('/update') ||
            url.includes('/delete') ||
            url.includes('/edit') ||
            url.includes('/add');

        // Only show success toast for mutations
        if (isMutation && toastFunction && !res.config.hideToast) {
            const data = res.data;
            let successMessage = '';

            // 1. Try to get message from backend response
            if (data) {
                successMessage = data.message || data.Message || data.msg || data.Msg;
            }

            // 2. Default messages based on operation type if backend didn't provide one
            if (!successMessage) {
                if (url.includes('delete') || method === 'delete') {
                    successMessage = 'Data deleted successfully';
                } else if (url.includes('update') || url.includes('edit') || method === 'put' || method === 'patch') {
                    successMessage = 'Data updated successfully';
                } else if (url.includes('create') || url.includes('add') || method === 'post') {
                    successMessage = 'Data saved successfully';
                }
            }

            if (successMessage && !isFetchRequest) {
                // Use setTimeout to ensure toast shows after any state updates
                setTimeout(() => {
                    toastFunction(successMessage, 'success');
                }, 0);
            }
        }

        return res;
    },
    (error) => {
        // Extract error message from backend response
        let errorMessage = '';

        if (error.response) {
            const data = error.response.data;

            // Common backend error message patterns
            if (data) {
                if (typeof data === 'string') {
                    errorMessage = data;
                } else if (data.message || data.Message) {
                    errorMessage = data.message || data.Message;
                } else if (data.error || data.Error) {
                    errorMessage = data.error || data.Error;
                } else if (data.errors) {
                    // Handle validation errors
                    if (Array.isArray(data.errors)) {
                        errorMessage = data.errors.join(', ');
                    } else if (typeof data.errors === 'object') {
                        const errorMessages = [];
                        Object.keys(data.errors).forEach(key => {
                            const fieldErrors = data.errors[key];
                            if (Array.isArray(fieldErrors)) {
                                errorMessages.push(...fieldErrors);
                            } else if (fieldErrors) {
                                errorMessages.push(fieldErrors);
                            }
                        });
                        errorMessage = errorMessages.join(', ');
                    }
                } else if (data.detail || data.msg || data.Msg || data.statusText) {
                    errorMessage = data.detail || data.msg || data.Msg || data.statusText;
                }
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your internet connection.';
        } else {
            errorMessage = error.message || 'Failed to make request. Please try again.';
        }

        // Show toast with error message if toast function is available
        if (toastFunction && errorMessage && !error.config?.hideToast) {
            const isPermError = isPermissionError(errorMessage);
            
            // For permission errors, only show if it's a user action (when feature is enabled)
            const shouldShowToast = !ENABLE_PERMISSION_ERROR_SUPPRESSION || !isPermError || isUserAction;

            if (shouldShowToast) {
                setTimeout(() => {
                    toastFunction(errorMessage, 'error');
                }, 0);
            } else {
                console.log('Permission error suppressed (not user action):', errorMessage);
            }
        }

        // Clean up on error
        if (error.config?.key) {
            error.config.rej?.(error);
            pending.delete(error.config.key);
        }

        return Promise.reject(error);
    }
);

// Clear cache - can clear all or specific URL patterns
export const clearCache = (url) => {
    if (url) {
        // Clear cache entries that include the specified URL
        [...cache.keys()].filter(k => k.includes(url)).forEach(k => {
            console.log('Clearing cache for:', k);
            cache.delete(k);
        });
    } else {
        // Clear all cache
        console.log('Clearing entire cache');
        cache.clear();
    }
    pending.clear();
};

// Export for debugging
export const viewCache = () => {
    console.log('Current cache entries:');
    cache.forEach((v, k) => console.log(k));
};