import axios from "axios";
import axiosClient from "./config/axiosInstance";


interface Register {
    name: string,
    email: string,
    phone: string,
    role: number,
    password: string
}
export default class UserService {

    async login(data: { email: string, password: string }) {
        return await axiosClient.post('/user/login', data)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async register(data: Register) {
        return await axiosClient.post('/user/register', data)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }

}