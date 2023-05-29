import { FC, useEffect, useState } from "react";
import style from "./style/listMenu.module.scss"
import { Button, Col, Divider, Empty, Popconfirm, Row, message } from "antd";
import clsx from "clsx";
import CreateProductModal from "./modelProduct";
import RestaurentService from "@/service/restaurantService";
const Menu: FC<any> = ({ title }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [productToEdit, setProductToEdit]: any = useState(null);
    const [listProduct, setListProduct] = useState([])

    const [messageApi, contextHolder] = message.useMessage();

    //productService
    const restaurentService = new RestaurentService

    const success = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const error = (message: string = 'Error! An error occurred. Please try again later') => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };


    const handleCreate = async (values: any, onSuccess: any) => {
        // Gửi request tạo sản phẩm đến API
        console.log("Form values", values);
        let [data, err] = values.id ? await restaurentService.editProduct(values, values.id) : await restaurentService.createProduct(values)
        if (err) {
            error('Error! An error occurred. Please try again later')
            onSuccess();
            setModalVisible(false);
        } else {
            success(values.id ? 'Update successfuly' : 'Create successfuly')
            await getAllProduct()
            onSuccess();
            setModalVisible(false);
        }

    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    // Btn Delete
    const confirm = async (id: number) => {

        let [data, err] = await restaurentService.detete(id)
        getAllProduct()
        err ? error() : message.success('Delete Done');
    };

    const cancel = (e: any): void => {
        console.log(e);
        message.error('Click on No');
    };
    const getAllProduct = async () => {
        let [data, err] = await restaurentService.getAllProduct()
        if (!err) {
            setListProduct(data)
        }
    }

    useEffect(() => {
        getAllProduct()
    }, [])
    console.log('listProduct', listProduct);

    return (
        <>
            {contextHolder}
            <div className={style.menu}>
                <Row justify={'space-between'} align={"middle"}>
                    <Col><h2>{title}</h2></Col>
                    <Col>
                        <Button type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D" }} onClick={() => {
                            setProductToEdit(null)
                            setModalVisible(true)
                        }}>
                            Create Product
                        </Button>
                    </Col>
                </Row>

                <div >
                    <span style={{ display: "inline-block", width: "40px", height: "2px", backgroundColor: "#FFD95A" }} ></span>
                    <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                    <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                    <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                </div>
                <div className={style.list}>
                    {listProduct.length > 0 ? listProduct.map((item: any) =>
                        <div className={style.item}>
                            <Row>
                                <Col flex={'auto'}>
                                    <div style={{ display: 'flex' }}>
                                        <div className={style.img}>
                                            <img src={item.images} alt="coca" width={100} />
                                        </div>
                                        <div>
                                            <div className={style.name}>{item.name}</div>
                                            {item.sale_price ? (
                                                <div className={style.price}>
                                                    <span className={style.sale}>${item.price}</span>
                                                    ${item.sale_price}
                                                </div>
                                            ) : (
                                                <div className={style.price} style={{ color: "yellowgreen" }}>
                                                    ${item.price}

                                                </div>
                                            )}
                                        </div>

                                    </div>

                                </Col>
                                <Col>
                                    <div className={style.btn}>
                                        <Button type="primary" style={{ marginRight: "12px" }} className={clsx(true && style.activeOrder)} >{false ? 'Stop' : 'Start'} Order</Button>
                                        <Button onClick={() => {
                                            setModalVisible(true)
                                            setProductToEdit(item)
                                        }} type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D", marginRight: "12px" }} >Edit</Button>
                                        <Popconfirm
                                            title="Delete the task"
                                            description="Are you sure to delete this task?"
                                            onConfirm={() => (confirm(item.id))}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button type="primary" danger>Delete</Button>
                                        </Popconfirm>

                                    </div>
                                </Col>
                            </Row>

                            <Divider />
                        </div>
                    ) : <Empty />}



                </div>
            </div>
            <CreateProductModal
                visible={modalVisible}
                onCreate={handleCreate}
                onCancel={handleCancel}
                product={productToEdit}
            />
        </>
    );
}

export default Menu;