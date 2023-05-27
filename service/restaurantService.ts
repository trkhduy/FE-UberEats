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

function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
export default class RestaurentService {
    async getAllProduct() {
        return await axiosClient.get('/product/menu')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async createProduct(data: Product) {

        return await axiosClient.post('/product', getFormData(data))
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async editProduct(data: Product, id: number) {
        return await axiosClient.put('/product/' + id, getFormData(data))
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async detete(id: number) {
        return await axiosClient.delete('/product/' + id,)
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