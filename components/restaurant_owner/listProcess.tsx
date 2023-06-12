import { FC, useEffect, useState } from "react";
import style from "./style/processOrder.module.scss"
import { Button, Col, Collapse, Divider, Empty, Popconfirm, Rate, Row, Space, message } from "antd";
import clsx from "clsx";
import { EnvironmentOutlined } from "@ant-design/icons";
import useToken from "@/pages/hook/useToken";
import ProductService from "@/service/productService";
import { updateOrder } from "./listOrder";
const ProcessOrder: FC<any> = ({ title, data }) => {
    const { Panel } = Collapse;
    const [role, setRole] = useState(0)
    const [listOP, setListOP] = useState([])
    const productService = new ProductService
    useEffect(() => {
        data && setListOP(data)
    }, [data])
    useEffect(() => {
        setRole(useToken());
        data && setListOP(data)
    }, [])
    // Btn Delete
    const confirm = (e: any): void => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e: any): void => {
        console.log(e);
        message.error('Click on No');
    };
    const updateStatus = async (dataOP: any) => {
        const dataUpdate: updateOrder = {
            clientid: dataOP.user.id,
            restaurantid: dataOP.restaurant.id,
            statusid: Number(dataOP.status.id) + 1
        }
        let [data, err] = await productService.updateOrder(dataUpdate, dataOP.id)
        if (!err) {
            message.success("Accept Done~!")
        }
    }
    console.log('role', role);
    const Header = (id: string, status: any, price: number, data: any) => (
        <Row align={"middle"} justify={"space-between"} style={{ width: "100%" }}>
            <Col><h3 style={{ margin: "0" }}>{id}</h3></Col>
            <Col>
                {/* <h3 style={{ margin: "0", fontWeight: "600", color: '#4C3D3D', padding: "2px 8px", borderRadius: "10px", backgroundColor: "#FFF7D4" }}> */}
                <Button style={{ position: "absolute", top: '0', transform: "translate(-50%,-50%)", backgroundColor: "#FFD95A", zIndex: 2 }} type='default' disabled={role != Number(status.role)} onClick={() => updateStatus(data)} >{status.name}</Button>
                {/* </h3> */}
            </Col>
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
    const InforDriver = (data: { name: string, star: number, phone: string }) => {
        return (
            <>
                <div style={{ backgroundColor: "#f9f9f9" }} className={style.info}>
                    <h3>✔ Driver</h3>
                    <p>Name: <span>{data.name}</span></p>
                    <p>Phone: <span>{data.phone}</span></p>
                    <div style={{ verticalAlign: "middle" }}>Star: <span><Rate style={{ fontSize: "12px" }} disabled defaultValue={data.star} /></span></div>
                </div>
            </>
        )
    }
    const getPrice = (data: any) => {

        let subPrice = data.order_detail.reduce((total: number, item: any) => {

            return total + item.product.sale_price ? (item.product.sale_price * item.quantity) : (item.product.price * item.quantity)
        }, 0)
        if (data.voucher) {
            subPrice = subPrice * ((100 - data.voucher.discount) / 100)
        }
        return subPrice.toFixed(2)
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
                        {listOP.length > 0 ? listOP.map((item: any) => (
                            <Collapse className={style.coll} style={{ width: "100%", position: 'relative' }}  >
                                <Panel header={Header('#' + item.id, item.status, getPrice(item), item)} key="1"  >
                                    {InforOrderer(item.user_address)}
                                    {item.driver && InforDriver(item.driver)}
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

                                </Panel>

                            </Collapse>
                        ))
                            : <Empty />
                        }

                    </Space>


                </div>
            </div>
        </>
    );
}

export default ProcessOrder;