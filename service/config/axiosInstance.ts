import axios from "axios";

const axiosClient = axios.create()

//default url
axiosClient.defaults.baseURL = 'http://192.168.137.116:3333/api'
export default axiosClient