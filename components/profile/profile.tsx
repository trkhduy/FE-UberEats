import { UserOutlined, LockOutlined, GoogleOutlined, FacebookFilled, MailOutlined, PhoneOutlined, LoadingOutlined, PlusOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Col, Form, Input, Row, Segmented, Select, Upload, message } from 'antd';
import style from '@/pages/user/style/login.module.scss'
import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { useRouter } from 'next/router';
import { useForm } from 'antd/es/form/Form';
import RestaurentService from '@/service/restaurantService';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    console.log(reader.readAsDataURL(img));

};

const beforeUpload = (file: RcFile) => {
    console.log("file: " + file);

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return false;
};
const Profile: FC<any> = ({ title = 'Your profile', data }) => {

    const router = useRouter();
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(true);
    const resService = new RestaurentService;
    useEffect(() => {

        if (data) {
            console.log(data.avatar);

            data.avatar = process.env.SERVER_HOST + '/' + data.avatar;
            setImageUrl(data.avatar)
        }
        // console.log(data.role);
        // let role: number = data.role
        // data.role = { value: '1' }
        // form.setFieldsValue(data);
        // form.setFieldsValue({ role: { value: 4 } });

    }, [])

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Update infomation successfully!',
        });
    };
    const error = (title: string) => {
        messageApi.open({
            type: 'error',
            content: title,
        });
    };
    const onFinish = async (values: any) => {
        if (typeof values.avatar === 'string') {
            delete values.avatar;
        } else {
            values.avatar = values.avatar.file;
        }
        const [respone, err]: any = await resService.updateProfile(values)
        if (respone) {
            router.push('/restaurantowner');
            // setDisabled(true);
            success()
        } else {
            console.log('err' + err);
            error(err.response.data.message)
        }
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChangeA: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log('info', info.file);

        // if (info.file.status === 'uploading') {
        //     setLoading(true);
        //     return;
        // }
        // if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file as RcFile, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
        // }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            {contextHolder}
            <div className={style.bg}>
                <div className={style.login}>

                    <Row align={"middle"} justify={"space-between"}>
                        <Col>
                            <h1>{title}</h1>
                        </Col>
                        <Col>
                            <Segmented onChange={() => setDisabled((v) => !v)
                            } defaultValue={'ReadOnly'} options={['ReadOnly', 'Edit']} />
                        </Col>
                    </Row>

                    <Form
                        form={form}
                        disabled={disabled}
                        name="normal_login"
                        className="login-form"
                        initialValues={data}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="avatar"
                            rules={[{ required: true, message: 'Please input your Username!' }]}

                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                maxCount={1}

                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleChangeA}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>

                        </Form.Item>
                        <Form.Item
                            name="name"
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
                                disabled
                                labelInValue
                                className={style.select}

                                style={{ width: '50%', minWidth: "200px", backgroundColor: "transparent !important" }}
                                onChange={handleChange}
                                options={[
                                    { value: 2, label: 'Driver' },
                                    { value: 3, label: 'Restaurent' },
                                    { value: 1, label: 'Client' },

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
                            name="address"
                            initialValue={data?.restaurant?.address}
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input className={style.input_login} prefix={<EnvironmentOutlined className="site-form-item-icon" />} placeholder="Address" />
                        </Form.Item>
                        <Form.Item
                            name="opentime"
                            initialValue={data?.restaurant?.opentime}
                            rules={[{ required: true, message: 'Please input your opentime!' }]}
                        >
                            <Input className={style.input_login} prefix={<ClockCircleOutlined className="site-form-item-icon" />} placeholder="Open time" />
                        </Form.Item>
                        <Form.Item
                            name="endtime"
                            initialValue={data?.restaurant?.endtime}
                            rules={[{ required: true, message: 'Please input your endtime!' }]}
                        >
                            <Input className={style.input_login} prefix={<ClockCircleOutlined className="site-form-item-icon" />} placeholder="End time" />
                        </Form.Item>
                        {/* <Form.Item
                            name="password"
                            rules={[{ message: 'Please input your Password!' }]}
                        >
                            <Input.Password className={style.input_login}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="new_password"
                            rules={[{ message: 'Please input your Password!' }]}
                        >
                            <Input.Password className={style.input_login}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="New Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name=""

                            rules={[
                                {
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),]}
                        >
                            <Input.Password className={style.input_login}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item> */}


                        <Form.Item>
                            <button type='submit' disabled={disabled} className={clsx(style.btn_login, disabled && style.disabled)}>Update</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Profile;