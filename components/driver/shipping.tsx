
import Head from 'next/head';
import style from './style/home.module.scss';
import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Collapse, Divider, Popconfirm, Result, Row, Space, message } from 'antd';
import { EnvironmentOutlined, SmileOutlined } from '@ant-design/icons';
import RestaurentService from '@/service/restaurantService';
import { WebsocketContext } from '@/context/WebsocketContext';
import ProductService from '@/service/productService';
import { updateOrder } from '../restaurant_owner/listOrder';
import { useRouter } from 'next/router';

function DriverShippingPage() {
    const { Panel } = Collapse;
    const router = useRouter()
    const mapContainer: any = useRef(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [with2, setWith2] = useState(0);
    const [zoom, setZoom] = useState(9);
    const [acpOrder, setAcpOrder]: any = useState(true);
    const socket = useContext(WebsocketContext)
    const productService = new ProductService
    const [result, setResult] = useState(false)
    const [listOrder, setListOrder] = useState([])
    // useEffect(() => {
    //     getOrderDriver()
    //     socket.on('connect', () => {
    //         console.log('connection..');
    //     })
    //     socket.on('test', (data: any) => {
    //         console.log('connection..', data);
    //     })
    //     socket.on('GetOrderDriver', (listOrder: any) => {
    //         console.log('driver', listOrder);
    //         listOrder && setListOrder(listOrder)
    //     })
    //     return () => {
    //         console.log('Unregistering Events...');
    //         socket.off('connect');
    //         socket.off('GetOrderDriver');
    //     };
    // }, [])
    // const getOrderDriver = async () => {
    //     let [data, err] = await productService.getOrderDriver()
    //     if (!err) {
    //         console.log('dsadas', data);
    //         setListOrder(data)
    //     }
    //     return data
    // }

    const confirm = (e: any): void => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e: any): void => {
        // console.log(e);
        // message.error('Click on No');
    };



    const getDetail = async () => {
        let [data, err] = await productService.getDetailOrderDriver()
        if (!err) {
            if (data.length == 0) {
                message.warning("You need chose Order")
                router.push('/driver')
            }
            console.log('kist', data);

            setListOrder(data)
        }
    }

    useEffect(() => {
        getDetail()
        setWith2(window.innerWidth)
    }, []);
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
    const InforRestaurant = (data: { name: string, address: string, phone: string }) => {
        return (
            <>
                <div className={style.info} style={{ backgroundColor: "#e9e9e9" }}>
                    <h3><EnvironmentOutlined /> Main Boulevard, , Lahore, Punjab, Pakistan - 54000</h3>
                    <p>Name: <span>Sơn</span></p>
                    <p>Phone: <span>0987654321</span></p>
                    <p>Note: <span>cô lô nhuê</span></p>
                </div>
            </>
        )
    }
    const handleAccept = async (dataO: any) => {
        // setAcpOrder(dataO.id)
        console.log("datao", listOrder);

        const dataUpdate: updateOrder = {
            clientid: dataO.user.id,
            restaurantid: dataO.restaurant.id,
            statusid: 5
        }
        let [data, err] = await productService.updateOrder(dataUpdate, dataO.id)
        if (!err) {
            message.success("Thank you very much!")
            setResult(true)
        }
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
            {result && <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 20, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Result
                    status="success"
                    title={" Successfully delivered!"}
                    subTitle="have a nice shipping !"
                    extra={[
                        <Button type="primary" key="console" onClick={() => router.push('/driver')}>
                            Next Order
                        </Button>
                        // <Button key="buy"></Button>,
                    ]}
                />
            </div>}

            <Head>
                <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />
            </Head>
            <div className={style.driver}>
                <Row justify={"center"}>

                    <Col md={12} sm={24} span={24}>
                        <div className={style.map} style={{ width: "100%", maxWidth: "1440px", aspectRatio: acpOrder && (with2 <= 768) ? '9/16' : '16/9' }} >
                            <Map
                                style={{ width: '100%', height: '100%' }}
                                mapboxAccessToken="pk.eyJ1IjoidHJpZGMiLCJhIjoiY2xobm4xdXh3MW16azNnbHJvcHRwYmRodiJ9.WK8ZUq8s5DqkBdqzj20a6Q"
                                initialViewState={{
                                    longitude: 107.4204107,
                                    latitude: 19.8434013,
                                    zoom: 4.84,
                                }}
                                mapStyle="mapbox://styles/tridc/clhnnergm01p401pr3eulbcaa"
                            >
                                <GeolocateControl
                                    // positionOptions={{ enableHighAccuracy: true }}
                                    trackUserLocation={true}
                                />
                            </Map>
                        </div>
                        {acpOrder && < div >
                            <Button style={{ width: "100%", margin: "10px 0", backgroundColor: "greenyellow", color: "#000" }} type='primary' onClick={() => handleAccept(listOrder[0])} >Order Successfuly</Button>
                        </div>}
                    </Col>
                    <Col md={!acpOrder ? 12 : 24} sm={24} span={24} >
                        <div className={style.listOrder}>
                            {!acpOrder && <h2>List Order</h2>}
                            <div className={style.list}>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    {listOrder.map((item: any) => (
                                        <Collapse className={style.coll} collapsible="header" style={{ width: "100%" }}  >
                                            <Panel header={Header('#' + item.id, getPrice(item))} key={item.id}  >
                                                <div className={style.item}>
                                                    <Divider orientation="left">Orderer</Divider>
                                                    {InforOrderer(item.user_address)}
                                                    <Divider style={{ marginTop: '40px' }} orientation="left">Restaurant</Divider>
                                                    {InforRestaurant({ name: 'Thằng Sơn', address: "Hoài Đức", phone: "0987654321" })}

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
                                                </div>
                                                <div className={style.btn}>
                                                    {/* <Popconfirm
                                            title="Delete the task"
                                            description="Are you sure to delete this task?"
                                            onConfirm={confirm}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button type="primary" danger>Deny</Button>
                                        </Popconfirm> */}
                                                    {!acpOrder && <Button type="primary" style={{ backgroundColor: "#ABC270", marginLeft: "12px" }} onClick={() => handleAccept(item)} >Accept</Button>}
                                                </div>
                                            </Panel>

                                        </Collapse>
                                    ))}


                                </Space>


                            </div>
                        </div>
                    </Col>
                </Row>

            </div >
        </>
    );
}

export default DriverShippingPage;