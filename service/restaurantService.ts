import { File } from "buffer";
import axiosClient from "./config/axiosInstance";

interface Product {
    id?: number
    name: string,
    price: number,
    sale_price: number,
    desc: string,
    status: string,
    image: File
}
interface Profile {
    id?: number,
    address: string,
    opentime: number,
    endtime: number
}
export default class RestaurentService {
    async getAllProduct() {
        return await axiosClient.get('/product/menu')
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async createProduct(data: Product) {
        return await axiosClient.post('/restaurant/create', data)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async editProduct(data: Product) {
        return await axiosClient.put('/restaurent/edit' + data.id, data)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async detete(id: number) {
        return await axiosClient.delete('/restaurent/delete/' + id,)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }

    //profile
    async getInfo() {
        try {
            const respone = await axiosClient.get('/user/profile')
            return [respone.data.user, null];
        } catch (error) {
            return [null, error];
        }
    }

    async updateProfile(data: Profile) {
        try {
            const response = await axiosClient.put('/user', data);
            // console.log('response', response);
            return [response, null];
        } catch (error) {
            // console.error(error);
            return [null, error];
        }
    }
}       