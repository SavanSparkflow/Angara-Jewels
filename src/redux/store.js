import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Slices
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import bannerSlice from "./slices/bannerSlice";
import footerSlice from "./slices/footerSlice";
import collectionSlice from "./slices/collectionSlice";
import diamondShapeSlice from "./slices/diamondShapeSlice";
import productSlice from "./slices/productSlice";
import filterSlice from "./slices/filterSlice";
import diamondTypeSlice from "./slices/diamondTypeSlice";
import addressSlice from "./slices/addressSlice";
import orderSlice from "./slices/orderSlice";
import diamondSlice from "./slices/diamondSlice";
import birthstoneSlice from "./slices/birthstoneSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    category: categorySlice,
    banner: bannerSlice,
    footer: footerSlice,
    collection: collectionSlice,
    diamondShape: diamondShapeSlice,
    product: productSlice,
    filter: filterSlice,
    diamondType: diamondTypeSlice,
    address: addressSlice,
    orderHistory: orderSlice,
    diamond: diamondSlice,
    birthstone: birthstoneSlice,
});

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // Only persist auth state
    blacklist: [
        "village", "taluka", "district", "occupation", "education",
        "entertainment", "committee", "relation", "userAnalytic",
        "message", "gallery", "userType", "funds", "year",
        "donators", "award", "honored", "result", "branch", "role", "user", "product", "goldRate", "outstanding", "exhibition", "diamondType", "address", "orderHistory", "diamond", "birthstone"
    ]
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production'
});

// Create persistor
export const persistor = persistStore(store);

export default store;
