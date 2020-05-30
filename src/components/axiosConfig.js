import axios from 'axios'
// Set config defaults when creating the instance
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_B_URL
});

export default axiosInstance
