import axios from "axios";
import axiosClient from "./config/axiosInstance";


interface Register {
    name: string,
    email: string,
    phone: string,
    role: number,
    password: string
}
function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
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
            return [null, error]
        }
    }

    //profile
    async getInfo() {
        try {
            const respone = await axiosClient.get('/user/profile')
            return [respone.data, null];
        } catch (error) {
            return [null, error];
        }
    }
    async updateProfile(data: any) {
        try {
            const respone = await axiosClient.put('/user', getFormData(data))
            return [respone.data, null];
        } catch (error) {
            return [null, error];
        }
    }

    //crud user Address

    async createUserAdress(data: any) {
        try {
            const respone = await axiosClient.post('/user-address', data)
            return [respone.data, null];
        } catch (error) {
            return [null, error];
        }
    }
    async updateUserAdress(data: any, id: any) {
        try {
            const respone = await axiosClient.put(`/user-address/${id}`, data)
            return [respone.data, null];
        } catch (error) {
            return [null, error];
        }
    }
    async deleteUserAddress(id: any) {
        try {
            const respone = await axiosClient.delete(`/user-address/${id}`)
            return [respone.data, null];
        } catch (error) {
            return [null, error];
        }
    }
}