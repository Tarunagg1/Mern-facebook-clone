import axios from 'axios';

const token = localStorage.getItem("token");

const API_URL = process.env.REACT_APP_API_URL;

const axiosinstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Authrization": token ? `Bearear ${token}` : ""
    }
});

// axiosinstance.interceptors.request.use((req) => {
//     const {auth:{token}} = store.getState();
//     if(token){
//         req.headers.Authrization = `Bearer ${token}`;
//     }
//     return req;
// })


export default axiosinstance;
