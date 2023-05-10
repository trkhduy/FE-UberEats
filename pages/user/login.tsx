import { MailOutlined, LockOutlined, GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import style from './style/login.module.scss'
function Login() {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <>
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
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input className={style.input_login} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input className={style.input_login}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <button className={style.btn_login}>Login</button>
                            <span style={{ padding: '12px 10px', display: 'inline-block' }}> Or <a href="" style={{ color: "#4C3D3D", fontWeight: "500" }}>register now!</a></span>
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