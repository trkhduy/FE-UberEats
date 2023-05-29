import { File } from "buffer";
import axiosClient from "./config/axiosInstance";



function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
export default class RestaurentService {
    async getMenu() {
        return await axiosClient.get('/product/menu')
            .then((data: any) => {
                return [data.data, null]
            })
            .catch((err) => [null, err])
    }
}       