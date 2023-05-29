import { Button, Col, message, Popconfirm, Row, Space, Table, Tag } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { FC, useContext, useEffect, useState } from 'react';
import CreateProductModal from './modelProduct';
import VoucherModal from './modelVoucher';
import RestaurentService from '@/service/restaurantService';


const ListVoucher: FC<any> = () => {
    const { Column, ColumnGroup } = Table;
    const [modalVisible, setModalVisible] = useState(false);
    const [voucherToEdit, setVoucherToEdit]: any = useState(null);
    const [listVoucher, setListVoucher] = useState([])
    const restaurentService = new RestaurentService
    const handleCreate = async (values: any, onSuccess: any) => {
        // Gửi request tạo sản phẩm đến API
        console.log("Form values", values);
        let [data, err] = values.id ? await restaurentService.editVoucher(values, values.id) : await restaurentService.createVoucher(values)
        if (err) {
            message.error('Error! An error occurred. Please try again later')
            onSuccess();
            setModalVisible(false);
        } else {
            message.success(values.id ? 'Update successfuly' : 'Create successfuly')
            await getAllVoucher()
            onSuccess();
            setModalVisible(false);
        }

    };
    const handleCancel = () => {
        setModalVisible(false);
    };
    const confirm = async (id: number) => {
        let [data, err] = await restaurentService.deteteVoucher(id)
        if (err) {
            message.error('error! Please try again');
        } else {
            getAllVoucher()
            message.success('Xóa thành công');
        }

    };
    const cancel = (e: any) => {
        // console.log(e);
        // message.error('Click on No');
    };
    const handleEdit = async (record: any) => {
    }
    const getAllVoucher = async () => {
        let [data, err] = await restaurentService.getAllVoucher()
        if (!err) {
            setListVoucher(data)
        }
    }
    useEffect(() => {
        getAllVoucher()
    }, [])


    return (
        <>
            <Row justify={'space-between'} align={"middle"}>
                <Col><h2>Voucher</h2></Col>
                <Col>
                    <Button type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D" }}
                        onClick={() => {
                            setVoucherToEdit(null)

                            setModalVisible(true)
                        }}
                    >
                        Create Voucher
                    </Button>
                </Col>
            </Row>

            <div >
                <span style={{ display: "inline-block", width: "40px", height: "2px", backgroundColor: "#FFD95A" }} ></span>
                <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
            </div>
            <Table dataSource={listVoucher}>

                <Column title="Id" dataIndex="id" key="id" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Image" dataIndex="images" render={(images) => (<><img src={images} width="100px" alt='' /></>)} key="images" />
                <Column title="discount" dataIndex="discount" key="discount" />
                <Column title="conditions" dataIndex="conditions" key="conditions" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record:any) => (<>
                        <Space size="middle" >
                            <div style={{ cursor: "pointer" }}>
                                <Button type="primary" onClick={() => {
                                    setModalVisible(true)
                                    setVoucherToEdit(record)
                                }}>
                                    Edit
                                </Button>
                            </div>
                            <div style={{ cursor: "pointer" }}>
                                <Popconfirm
                                    title="Are you sure ?"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => confirm(record.id)}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="primary" danger>Delete</Button>
                                </Popconfirm>
                            </div>


                        </Space>
                    </>

                    )}
                />
            </Table>
            <VoucherModal
                visible={modalVisible}
                onCreate={handleCreate}
                onCancel={handleCancel}
                voucher={voucherToEdit}
            />
        </>

    )
}
export default ListVoucher;