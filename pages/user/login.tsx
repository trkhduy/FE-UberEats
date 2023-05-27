import { MailOutlined, LockOutlined, GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import style from './style/login.module.scss'
import Link from 'next/link';
import UserService from '@/service/userService';
import axiosClient from '@/service/config/axiosInstance';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { log } from 'console';
import jwtDecode from 'jwt-decode';

function Login() {
    const router = useRouter()
    const userService = new UserService

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Login successfuly !',
        });
    };
    const error = (title: string) => {
        messageApi.open({
            type: 'error',
            content: title,
        });
    };

    const onFinish = async (values: any) => {
        let [res, err]: any = await userService.login(values)
        if (res && !err) {
            console.log(res);

            setCookies('access_token', res.data.token.access_token as string);
            setCookies('refresh_token', res.data.token.refresh_token as string, { maxAge: 31556926 });
            success()
            setTimeout(() => {
                let { role }: { role: number } = jwtDecode(res.data.token.access_token as string)
                role === 1 && router.push('/')
                role === 2 && router.push('/driver')
                role === 3 && router.push('/restaurantowner')

            }, 1000)
        } else {
            console.log('err', err);

            error(err.response?.data?.message)
        }
        // console.log('Received values of form: ', values);
    };
    return (
        <>
            {contextHolder}
            <div className={style.bg}>
                <div className={style.login}>
                    <h1>Login</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: "Email is invalite" }]}
                        >
                            <Input className={style.input_login} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password className={style.input_login}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="#">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <button className={style.btn_login}>Login</button>
                            <span style={{ padding: '12px 10px', display: 'inline-block' }}> Or <Link href="/user/register" style={{ color: "#4C3D3D", fontWeight: "500" }}>register now!</Link></span>
                            <div className={style.social}><GoogleOutlined style={{ fontSize: '20px' }} /> Google</div>
                            <div className={style.social}><FacebookFilled style={{ fontSize: '20px' }} /> Facebook</div>
                        </Form.Item>
                    </Form>
                </div>
            </div>


        </>
    );
}

export default Login;