import { FC, useEffect, useState } from "react";
import style from "./style/listOrder.module.scss"
import { Button, Col, Collapse, Divider, Popconfirm, Row, Space, message } from "antd";
import clsx from "clsx";
import { EnvironmentOutlined } from "@ant-design/icons";
import Voucher from "@/pages/voucher";
import ProductService from "@/service/productService";

export interface updateOrder {
    statusid: number;
    driverid?: number;
    clientid: number;
    restaurantid: number;
}

const Order: FC<any> = ({ title, data }: { title: string, data: [] }) => {
    const { Panel } = Collapse;
    const [listO, setListO] = useState([])
    const productService = new ProductService
    useEffect(() => {
        data && setListO(data)
    }, [data])
    useEffect(() => {
        data && setListO(data)
    }, [])

    // Btn Delete
    const confirm = (e: any): void => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e: any): void => {
    };
    const Header = (code: string, price: number) => (
        <Row align={"middle"} justify={"space-between"} style={{ width: "100%" }}>
            <Col><h3 style={{ margin: "0" }}>{code}</h3></Col>
            <Col><h3 style={{ margin: "0", color: "#59CE8F" }}>${price}</h3></Col>
        </Row>
    )

    const InforOrderer = (data: { name: string, name_address: string, note: string, phone: string }) => {
        return (
            <>
                <div className={style.info}>
                    <h3><EnvironmentOutlined />{data.name_address}</h3>
                    <p>Name: <span>{data.name}</span></p>
                    <p>Phone: <span>{data.phone}</span></p>
                    <p>Note: <span>{data.note}</span></p>
                </div>
            </>
        )
    }

    // const [message, context] = message()
    const getPrice = (data: any) => {

        let subPrice = data.order_detail.reduce((total: number, item: any) => {

            return total + item.product.sale_price ? (item.product.sale_price * item.quantity) : (item.product.price * item.quantity)
        }, 0)
        if (data.voucher) {
            subPrice = subPrice * ((100 - data.voucher.discount) / 100)
        }
        return subPrice.toFixed(2)
    }
    const handleAccept = async (dataO: any) => {
        const dataUpdate: updateOrder = {
            clientid: dataO.user.id,
            restaurantid: dataO.restaurant.id,
            statusid: 2
        }
        let [data, err] = await productService.updateOrder(dataUpdate, dataO.id)
        if (!err) {
            message.success("Accept Done~!")
        }
    }
    return (
        <>
            <div className={style.menu}>
                <h2>{title}</h2>
                <div >
                    <span style={{ display: "inline-block", width: "40px", height: "2px", backgroundColor: "#FFD95A" }} ></span>
                    <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                    <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                    <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                </div>
                <div className={style.list}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        {listO.map((item: any) =>
                            // debugger
                            <Collapse className={style.coll} collapsible="header" style={{ width: "100%" }} key={item.id} >
                                <Panel header={Header('#' + item.id, getPrice(item))} key={item.id}  >
                                    {InforOrderer(item.user_address)}
                                    {item.order_detail.map((listProduct: any) => (
                                        <div className={style.item}>
                                            <Divider />

                                            <Row>
                                                <Col flex={'auto'}>
                                                    <div style={{ display: 'flex' }}>
                                                        <div className={style.img}>
                                                            <img src={listProduct.product.images} alt="coca" width={100} />
                                                        </div>
                                                        <div>
                                                            <div className={style.name}>{listProduct.product.name}</div>
                                                            {listProduct.product.sale_price ? (
                                                                <div className={style.price}>
                                                                    <span className={style.sale}>${listProduct.product.price}</span>
                                                                    ${listProduct.product.sale_price}
                                                                </div>
                                                            ) : (
                                                                <div className={style.price} style={{ color: "yellowgreen" }}>
                                                                    ${listProduct.product.price}

                                                                </div>
                                                            )}
                                                        </div>

                                                    </div>

                                                </Col>

                                            </Row>

                                        </div>
                                    ))}

                                    <Divider />

                                    <div className={style.btn}>
                                        <Popconfirm
                                            title="Delete the task"
                                            description="Are you sure to delete this task?"
                                            onConfirm={() => confirm(item.id)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button type="primary" danger>Deny</Button>
                                        </Popconfirm>
                                        <Button type="primary" style={{ backgroundColor: "#ABC270", marginLeft: "12px" }} onClick={() => handleAccept(item)} >Accept</Button>
                                    </div>
                                </Panel>

                            </Collapse>
                        )}


                    </Space>


                </div>
            </div>
        </>
    );
}

export default Order;