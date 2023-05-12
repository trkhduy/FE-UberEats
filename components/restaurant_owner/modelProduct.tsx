import React, { FC, useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateProductModal: FC<any> = ({ visible, onCreate, onCancel, product }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Nếu product đang được truyền vào,
        // thì update lại form fields với các giá trị của product.
        if (product) {
            form.setFieldsValue(product);
        }
    }, [product]);
    const onFinish = (values: any) => {
        setLoading(true);
        onCreate(values, () => {
            setLoading(false);
            form.resetFields();
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
            title={!product ? "Create Product" : "Edit Product"}
            okText={loading ? !product ? "Creating .." : "Editing ..." : !product ? "Create " : "Edit "}
            cancelText="Cancel"
            onCancel={() => {
                onCancel();
                form.resetFields();
                return true
            }}
            onOk={() => form.submit()}
            confirmLoading={loading}
            destroyOnClose
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please enter product name." }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        { required: true, message: "Please enter product price." },
                        { type: "number", min: 1, message: "Price must be greater than 0." },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="desc"
                    label="Description"
                    rules={[
                        { required: true, message: "Please enter product description." },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: "Please select product status." }]}
                >
                    <Select>
                        <Option value="available">Available</Option>
                        <Option value="out_of_stock">Out of Stock</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image"
                    rules={[{ required: true, message: "Please upload product image." }]}
                    // valuePropName="fileList"
                    getValueFromEvent={(files) =>
                        files.fileList.length > 0 ? files.fileList[0] : null
                    }
                >
                    <Upload
                        listType="picture"
                        maxCount={1}
                        beforeUpload={beforeUpload}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateProductModal;
