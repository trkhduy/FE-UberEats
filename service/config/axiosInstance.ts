import axios from "axios";
import { setCookies } from "cookies-next";
import jwtDecode from "jwt-decode";

const axiosClient = axios.create({
    withCredentials: true
})

//default url
axiosClient.defaults.baseURL = 'http://localhost:3333/api'


//get token in cookie
const getCookie = (name: string) => {
    const cookieValue = document.cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)') || null;
    return cookieValue ? cookieValue.pop() : null;
}

// refreshtoken
const refreshtoken = async () => {
    await axiosClient.get('refresh').then(async (res) => {
        await setCookies('access_token', res.data.token.access_token as string, { maxAge: 100000000000 });
        await setCookies('refresh_token', res.data.token.refresh_token as string, { maxAge: 100000000000 });
    }).catch(e => {
        window.location.href = '/user/login'
    })
}
// request parse
axiosClient.interceptors.request.use(async (config) => {
    if (Number(config.url?.indexOf('/login')) >= 0 || Number(config.url?.indexOf('refresh')) >= 0) {
        return config
    }
    if (getCookie('access_token')) {
        const access_token: any = jwtDecode(getCookie('access_token') as string)
        const now = Math.floor(new Date().getTime() / 1000);
        // console.log('now', now, 'access token', access_token.exp);
        if (access_token.exp <= now) {
            console.log('refresh..');
            await refreshtoken()
        }
    }
    if (getCookie('refresh_token') && !getCookie('access_token')) {
        await refreshtoken()
    }
    return config

}, async (error) => {
    console.log(error);
})

//response
axiosClient.interceptors.response.use((response: any) => {
    console.log('res', response);

    return response
}, (err) => {
    if (err.response.status === 401) {
        // window.location.href = '/user/login'
    }
    // if (err.response.status === 403) {
    //     window.location.href = '/user/login'
    // }
    return Promise.reject(err);

}
)

export default axiosClient