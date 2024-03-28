import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: 'https://major-project-2021.herokuapp.com/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});


export const signInPatient = (formData) => API.post('/user/patient/signin', formData);
export const signUpPatient = (formData) => API.post('/user/patient/signup', formData);

export const signInDoctor = (formData) => API.post('/user/doctor/signin', formData);
export const signUpDoctor = (formData) => API.post('/user/doctor/signup', formData);

// export const searchDoctorByName = (name) => API.get('/search/doctor');
// export const searchPatientByName = (name) => API.get('/search/patient');

export const getAllDoctors = () => API.get('/search/doctor');
export const getAllPatients = () => API.get('/search/patient');

export const getAppointmentById = (id) => API.get('/appointment/get/' + id);
export const bookAppointment = (formData) => API.post('/appointment/book', formData);
export const getAppointmentForDoctorId = (id) => API.get('/appointment/doctor/' + id);
export const getAppointmentForPatientId = (id) => API.get('/appointment/patient/' + id);
export const approveAppointmentById = (id, appointment) => API.patch(`/appointment/update/${id}`, appointment);
export const deleteAppointmentById = (id) => API.delete(`/appointment/delete/${id}`);
export const addPrescriptionToAppointment = (data) => API.patch('/appointment/addPrescription', data);
export const endAppointment = (id) => API.patch('/appointment/end/' + id);

export const sendEmail = (data) => API.post('/email/send', data);
export const sendOtp = (id) => API.get(`/otp/generate/${id}`);
export const verifyOtp = (otp, id) => API.post('otp/verify', { otp, id });

export const addPrescription = (prescription) => API.post('/prescription/add', prescription);
export const getAppointmentPrescriptionById = (id) => API.get(`/prescription/get/${id}`);

export const addUserData = (formData, type, id) => API.post(`/userData/add/${type}/${id}`, formData);
export const getUserData = (id) => API.get(`/userData/get/${id}`);
