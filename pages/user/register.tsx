import { UserOutlined, LockOutlined, GoogleOutlined, FacebookFilled, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import style from './style/login.module.scss'
import UserService from '@/service/userService';
import { useRouter } from 'next/router';
// import { Option } from 'antd/es/mentions';
const { Option } = Select;
function Register() {
    const userService = new UserService

    const [messageApi, contextHolder] = message.useMessage()
    const router = useRouter()

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Register Successfuly !',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Error! An error occurred. Please try again later !',
        });
    };

    const onFinish = async (values: any) => {
        delete values.confirmPassword
        !values.role && (values.role = 1)
        const [data, err] = await userService.register(values)
        if (data) {
            success()
            return router.push('/user/login')
        }
        return err()

        // console.log('Received values of form: ', values);
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
                            name="name"
                            rules={[{ required: true, message: "Please input your Username/ Restaurant's name!" }]}
                        >
                            <Input className={style.input_login} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username/ Restaurant's name" />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your phone number!",
                                },
                                {
                                    pattern: /^((\+84)|0)(9[0-9]{8}|3[2-9]{1}[0-9]{7})$/,
                                    message: "Please input VN phone number!",
                                },
                                {

                                }
                            ]}
                        >
                            <Input className={style.input_login} prefix={<PhoneOutlined style={{ transform: 'translate(rotage(90deg))' }} className="site-form-item-icon" />} placeholder="Phone" />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label="Role"
                        >
                            <Select
                                // labelInValue
                                className={style.select}
                                defaultValue="1"
                                style={{ width: '50%', minWidth: "200px", backgroundColor: "transparent !important" }}
                                onChange={handleChange}
                            >
                                <Option value="2">Driver</Option>
                                <Option value="3">Restautant</Option>
                                <Option value="1">Client</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }, { type: "email", message: 'Emmail Invatid' }]}
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
                            name={'confirmPassword'}
                            dependencies={['password']}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
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

export default Register;