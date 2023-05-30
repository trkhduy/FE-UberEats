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
export default class CartSrtvice {

    async getAllCart() {
        return await axiosClient.get('/cart')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
    async createCart(data: Cart) {

        return await axiosClient.post('/cart', getFormData(data))
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async editCart(data: Cart, id: number) {
        return await axiosClient.put('/cart/' + id, getFormData(data))
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
    async detete(id: number) {
        return await axiosClient.delete('/cart/' + id,)
            .then((data) => [data, null])
            .catch((err) => [null, err])
    }
}