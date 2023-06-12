import axiosClient from "./config/axiosInstance";


interface Cart {
    productid: number
    quantity: number
}
function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
export default class CartService {

    async getAllCart() {
        return await axiosClient.get('/cart')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async createCart(data: Cart) {
        return await axiosClient.post('/cart', data)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async editCart(data: Cart, id: number) {
        return await axiosClient.put('/cart/' + id, data)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async deteteCart(id: number) {
        return await axiosClient.delete('/cart/' + id,)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async deteteCartMany(id: any) {
        return await axiosClient.post('/cart/delete', id)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
}