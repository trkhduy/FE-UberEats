import { UserOutlined, LockOutlined, GoogleOutlined, FacebookFilled, MailOutlined, PhoneOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Col, Form, Input, Row, Segmented, Select, Upload, message } from 'antd';
import style from '@/pages/user/style/login.module.scss'
import { FC, useState } from 'react';
import clsx from 'clsx';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    console.log(reader.readAsDataURL(img));

};

const beforeUpload = (file: RcFile) => {
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
const Profile: FC<any> = ({ title = 'Your profile' }) => {
    const [disabled, setDisabled] = useState(true)

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
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
                        disabled={disabled}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
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
                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleChangeA}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>

                        </Form.Item>
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
                                disabled
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
                            <button disabled={disabled} className={clsx(style.btn_login, disabled && style.disabled)}>Update</button>

                        </Form.Item>
                    </Form>
                </div>
            </div>


        </>
    );
}

export default Profile;