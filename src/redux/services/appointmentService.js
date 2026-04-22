import { apiInstance } from "./axiosApi";

export const appointmentService = {
    bookAppointment: (payload) => {
        return apiInstance.post('/api/user/appointments/book', payload);
    },
};
