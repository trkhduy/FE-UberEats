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
        try {
            const response = await axiosClient.post('/user/login', data);
            // console.log('response', response);
            return [response, null];
        } catch (error) {
            // console.error(error);
            return [null, error];
        }
    }

    

    async register(data: Register) {
        return await axiosClient.post('/user/register', data)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }

    async logOut() {
        try {
            const res = await axiosClient.get('/user/logout');
            return [res, null]
        } catch (error) {
            return [null, error ]
        }
    }
}