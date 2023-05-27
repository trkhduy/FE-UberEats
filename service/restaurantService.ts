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
function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
export default class RestaurentService {
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
        return await axiosClient.put('/restaurent/delete', id)
            .then((data) => [data, null])
            .catch((err) => [null, err])
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
        const { address, ...rest } = data;
        const data1 = { 'address': address };
        const data2 = rest
        let res = (data1)
        let user = getFormData(data2)
        const checkRes: any = await axiosClient.get('/restaurant/detail')

        try {
            const response = await axiosClient.put('/user', user);
            if (!checkRes.data) {
                const createRes = await axiosClient.post('/restaurant')
                console.log('if' + createRes);
            } else {
                const updateRes = await axiosClient.put(`/restaurant/${checkRes.data.id}`, res)
                console.log('else' + updateRes);
            }
            return [response, null];
        } catch (error) {
            return [null, error];
        }
    }
}       