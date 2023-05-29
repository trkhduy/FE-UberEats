import { Button, Col, message, Popconfirm, Row, Space, Table, Tag } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { FC, useContext, useEffect, useState } from 'react';
import CreateProductModal from './modelProduct';
import CategoryModal from './modelCategory';
import RestaurentService from '@/service/restaurantService';
import axiosClient from '@/service/config/axiosInstance';



const Category: FC<any> = () => {
    const { Column, ColumnGroup } = Table;
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryToEdit, setCategoryToEdit]: any = useState(null);
    const [listCategory, setListCategory] = useState([])
    const restaurentService = new RestaurentService
    const handleCreate = async (values: any, onSuccess: any) => {
        // Gửi request tạo sản phẩm đến API
        console.log("Form values", values);
        let [data, err] = values.id ? await restaurentService.editCategory(values, values.id) : await restaurentService.createCategory(values)
        if (err) {
            message.error('Error! An error occurred. Please try again later')
            onSuccess();
            setModalVisible(false);
        } else {
            message.success(values.id ? 'Update successfuly' : 'Create successfuly')
            await getAllCategory()
            onSuccess();
            setModalVisible(false);
        }

    };
    const handleCancel = () => {
        setModalVisible(false);
    };
    const confirm = async (id: number) => {
        let [data, err] = await restaurentService.deteteCategory(id)
        if (err) {
            message.error('error! Please try again');
        } else {
            getAllCategory()
            message.success('Xóa thành công');
        }

    };
    const cancel = (e: any) => {
        // console.log(e);
        // message.error('Click on No');
    };
    const handleEdit = async (record: any) => {
    }
    const getAllCategory = async () => {
        let [data, err] = await restaurentService.getAllCategory()
        if (!err) {
            setListCategory(data)
        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])


    return (
        <>
            <Row justify={'space-between'} align={"middle"}>
                <Col><h2>Category</h2></Col>
                <Col>
                    <Button type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D" }} onClick={() => {
                        setCategoryToEdit(null)
                        setModalVisible(true)
                    }}>
                        Create Category
                    </Button>
                </Col>
            </Row>

            <div >
                <span style={{ display: "inline-block", width: "40px", height: "2px", backgroundColor: "#FFD95A" }} ></span>
                <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
            </div>
            <Table dataSource={listCategory}>

                <Column title="Id" dataIndex="id" key="id" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Status" dataIndex="status" key="status" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record: any) => (<>
                        {console.log(record)}
                        {record.user ? <Space size="middle" >
                            <div style={{ cursor: "pointer" }}>
                                <Button type="primary" onClick={() => {
                                    setModalVisible(true)
                                    setCategoryToEdit(record)
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


                        </Space> : "no action"}
                    </>

                    )}
                />
            </Table>
            <CategoryModal
                visible={modalVisible}
                onCreate={handleCreate}
                onCancel={handleCancel}
                category={categoryToEdit}
            />
        </>
    )
}
export default Category;