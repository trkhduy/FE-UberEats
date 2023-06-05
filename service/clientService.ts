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

    //detail food
    async getDetailFood(id: any) {
        try {
            const respone = await axiosClient.get(`/product/${id}`);
            return [respone.data, null]
        } catch (error) {
            return [null, error]
        }
    }

    async getRelatedFood(id: any) {
        try {
            const respone = await axiosClient.get(`/product/${id}/relatedProduct`);
            return [respone.data, null]
        } catch (error) {
            return [null, error]
        }
    }
    // Voucher
    async getRestaurant() {
        try {
            const respone = await axiosClient.get('/user/restaurant');
            return [respone.data, null]
        } catch (error) {
            return [null, error]
        }
    }

    async getAllVocher(keyword: string) {
        let url = keyword ? '?' + keyword : ''
        try {
            const respone = await axiosClient.get('/voucher' + url);
            return [respone.data, null]
        } catch (error) {
            return [null, error]
        }
    }
    async getDetailVocher(code: string) {
        try {
            const respone = await axiosClient.get(`/voucher/detailVoucher/${code}`);
            return [respone.data, null]
        } catch (error) {
            return [null, error]
        }
    }
}