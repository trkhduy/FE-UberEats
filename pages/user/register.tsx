import { UserOutlined, LockOutlined, GoogleOutlined, FacebookFilled, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import style from './style/login.module.scss'
function Login() {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className={style.bg}>
                <div className={style.login}>
                    <h1>Register</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input className={style.input_login} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                        >
                            <Input className={style.input_login} prefix={<PhoneOutlined style={{ transform: 'translate(rotage(90deg))' }} className="site-form-item-icon" />} placeholder="Phone" />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label="Role"
                        // rules={[{ required: true, message: 'Please input your Pho!' }]}
                        >
                            <Select
                                labelInValue
                                className={style.select}
                                defaultValue="3"
                                style={{ width: '50%', minWidth: "200px", backgroundColor: "transparent !important" }}
                                onChange={handleChange}
                                options={[
                                    { value: '1', label: 'Driver' },
                                    { value: '2', label: 'Restaurent' },
                                    { value: '3', label: 'Client' },

                                ]}
                            />
                        </Form.Item>
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
                            <Input.Password className={style.input_login}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name=""

                            rules={[{ required: true, message: 'Please input your Confirm Password!' }]}
                        >
                            <Input.Password className={style.input_login}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item>


                        <Form.Item>
                            <button className={style.btn_login}>Register</button>
                            <span style={{ padding: '12px 10px', display: 'inline-block' }}> Or <span style={{ color: "#4C3D3D", fontWeight: "500" }}>Login With</span></span>
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