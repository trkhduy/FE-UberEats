import React, { FC, useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Upload, Button, message } from "antd";



const { Option } = Select;

const UserAddressModal: FC<any> = ({ visible, onCreate, onCancel, category }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Nếu category đang được truyền vào,
        // thì update lại form fields với các giá trị của category.
        if (category) {
            form.setFieldsValue(category);
        } else {
            form.resetFields()
        }
    }, [category]);


    const onFinish = async (values: any) => {
        setLoading(true);
        if (category) {
            values.id = category.id
        }
        onCreate(values, () => {
            console.log(values);
            setLoading(false);
            !category && form.resetFields();
        });


    };

    const beforeUpload = (file: any) => {
        // Validate image before uploading
        const isValidFileType =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isValidFileType) {
            message.error("Only JPG/PNG files are allowed.");
            return false;
        }

        const isLt2MB = file.size / 1024 / 1024 < 2;
        if (!isLt2MB) {
            message.error("Image must be smaller than 2MB.");
            return false;
        }

        return true;
    };

    return (
        <Modal
            visible={visible}
            title={!category ? "Create address" : "Edit address"}
            okText={loading ? !category ? "Creating .." : "Editing ..." : !category ? "Create " : "Edit "}
            cancelText="Cancel"
            onCancel={() => {
                onCancel();
                setLoading(false)
                { !category && form.resetFields(); }
                return true
            }}
            onOk={() => form.submit()}
            confirmLoading={loading}
            destroyOnClose
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                    name="name_address"
                    label="Name Address"
                    rules={[{ required: true, message: "Please enter category name." }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: "Please enter category name." }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="note"
                    label="Note"
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default UserAddressModal;
