import { File } from "buffer";
import axiosClient from "./config/axiosInstance";



function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
export default class ProductService {

    async getOrderRestaurant() {
        return await axiosClient.get('/order/getByRestaurant')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async getOrderDriver() {
        return await axiosClient.get('/order/getOrderFindDriver')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async getDetailOrderDriver() {
        return await axiosClient.get('/order/getDetailOrderFindDriver')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async getOrderClient() {
        return await axiosClient.get('/order/getByClient')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async createOrder(data: any) {
        return await axiosClient.post('/order', data)
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async createOrderDetail(data: any) {
        return await axiosClient.post('/orderdetail', data)
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async updateOrder(data: any, id: number) {
        return await axiosClient.put('/order/' + id, data)
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async deleteOrder(id: number) {
        return await axiosClient.delete('/order/' + id)
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }

}       