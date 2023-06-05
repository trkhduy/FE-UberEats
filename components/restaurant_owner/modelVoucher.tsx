import React, { FC, useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import RestaurentService from "@/service/restaurantService";

const { Option } = Select;

const VoucherModal: FC<any> = ({ visible, onCreate, onCancel, voucher }) => {
    const [formV] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const restaurantService = new RestaurentService
    useEffect(() => {
        // Nếu Voucher đang được truyền vào,
        // thì update lại form fields với các giá trị của Voucher.
        console.log(voucher);

        if (voucher) {
            // form.setFieldsValue(voucher);
        } else {
            formV.resetFields()
        }
    }, [voucher]);


    const onFinish = async (values: any) => {
        setLoading(true);
        if (typeof values.images === 'string') {
            delete values.images
        } else {
            values.images = values.images.originFileObj
        }
        if (voucher) {
            values.id = voucher.id
        }
        onCreate(values, () => {
            console.log(values);
            setLoading(false);
            !voucher && formV.resetFields();
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
            title={!voucher ? "Create Voucher" : "Edit Voucher"}
            okText={loading ? !voucher ? "Creating .." : "Editing ..." : !voucher ? "Create " : "Edit "}
            cancelText="Cancel"
            onCancel={async () => {
                onCancel();
                setLoading(false)
                await formV.resetFields()
                return true
            }}
            onOk={() => formV.submit()}
            confirmLoading={loading}
            destroyOnClose
        >
            <Form layout="vertical" form={formV} initialValues={voucher} onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please enter Voucher name." }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="discount"
                    label="Discount(%)"
                    rules={[
                        { required: true, message: "Please enter discount." },
                        { type: "number", min: 1, message: "Discount > 0, Please" },
                        { type: "number", max: 100, message: "Discount <= 100, Please" },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="conditions"
                    label="Conditions Min Price"
                    rules={[
                        { required: true, message: "Please enter product price." },
                        { type: "number", min: 1, message: "Price must be greater than 0." },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="images"
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

export default VoucherModal;
