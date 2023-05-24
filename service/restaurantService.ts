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
}       