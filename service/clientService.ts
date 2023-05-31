import axiosClient from "./config/axiosInstance";


export default class ClientService {
    async getNewProduct() {
        try {
            const respone = await axiosClient.get('/product/getNewProduct');
            return [respone.data, null]
        } catch (error) {
            return [null, error]
        }
    }

    async getInfo() {
        try {
            const respone = await axiosClient.get('/user/profile')
            return [respone.data, null];
        } catch (error) {
            return [null, error];
        }
    }

    async getSaleProduct() {
        try {
            const respone = await axiosClient.get('/product/getSaleProduct');
            return [respone.data, null]
        } catch (error) {
            return [null, error]
        }
    }

    async getCategory() {
        try {
            const respone = await axiosClient.get('/category');
            return [respone.data, null]
        } catch (error) {
            return [null, error]
        }
    }

    async getAllPro(keyword?: any) {
        let url = keyword ? '?' + keyword : ''
        console.log(url);
        try {
            const respone = await axiosClient.get('/product' + url);
            return [respone.data, null]
        } catch (error) {
            return [null, error]
        }
    }
}