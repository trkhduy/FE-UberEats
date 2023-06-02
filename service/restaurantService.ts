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
interface Category {
    id?: number,
    name: string,
    status: string
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
            return [respone.data, null];
        } catch (error) {
            return [null, error];
        }
    }


    async updateProfile(data: any) {
        const { restaurant, ...rest } = data;
        // const data1 = { 'address': address, 'opentime': opentime, 'endtime': endtime };
        const data2 = rest;
        console.log('user', data2);

        // let res = data1;
        let user = getFormData(data2);
        const checkRes: any = await axiosClient.get('/restaurant/detail');

        try {
            const response = await axiosClient.put('/user', user);
            if (!checkRes.data) {
                const createRes = await axiosClient.post('/restaurant', data.restaurant)
            } else {
                const updateRes = await axiosClient.put(`/restaurant/${checkRes.data.id}`, data.restaurant)
            }
            return [response, null];
        } catch (error) {
            return [null, error];
        }
    }

    // Category
    async getAllCategory() {
        return await axiosClient.get('/category/getCateByUser')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async createCategory(data: Category) {

        return await axiosClient.post('/category', data)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async editCategory(data: Product, id: number) {
        return await axiosClient.put('/category/' + id, data)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async deteteCategory(id: number) {
        return await axiosClient.delete('/category/' + id,)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }

    // Voucher
    async getAllVoucher() {
        return await axiosClient.get('/voucher/getByUser')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async createVoucher(data: Category) {

        return await axiosClient.post('/voucher', getFormData(data))
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async editVoucher(data: Product, id: number) {
        return await axiosClient.put('/voucher/' + id, getFormData(data))
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async deteteVoucher(id: number) {
        return await axiosClient.delete('/voucher/' + id,)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
}       