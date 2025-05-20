import axios from "axios";

const BASE_URL = "http://localhost:2000";

const api = axios.create({
    baseURL:BASE_URL
})


api.interceptors.request.use((config) =>{
    const token = localStorage.getItem('user__token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

// api.interceptors.response.use(
//     res => res,
//     error => {
//         if (error.response && error.response.status === 401 && error.response.data?.error === "TokenExpiredError") {
//             alert("Your Session has Expired. Please log in again.")
//             localStorage.removeItem('user__token')
//             window.location.href ="/login2"
//         }
//         return Promise.reject(error)
//     }
// )


api.interceptors.response.use(
    res => res,
    error =>{
        if(error.response && error.response.status === 401 && error.response.data?.error === 'TokenExpiredError') {
            alert(" Your Session Expired Pls login again");
            localStorage.removeItem('user__token');
            window.location.href = "/login2"
        }
        if (error.response && error.response.status === 403) {
            window.location.href = "/login2"
        }
        return Promise.reject(error)
    }
)

export default api;