
import { Col, Rate, Row, message, notification } from "antd";
import style from "../../styles/restaurant/restaurant.module.scss";
import Menu from "@/components/restaurant_owner/listMenu";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import Order from "@/components/restaurant_owner/listOrder";
import ProcessOrder from "@/components/restaurant_owner/listProcess";
import Statictisc from "@/components/restaurant_owner/statictisc";
import Profile from "@/components/profile/profile";
import { useRouter } from "next/router";
import RestaurentService from "@/service/restaurantService";
import Category from "@/components/restaurant_owner/listCategory";
import Voucher from "../voucher";
import ListVoucher from "@/components/restaurant_owner/listVoucher";

import axiosClient from "@/service/config/axiosInstance";
import ProductService from "@/service/productService";
import { resourceUsage } from "process";
import { AreaChartOutlined, SmileOutlined } from "@ant-design/icons";
import { WebsocketContext } from "@/context/WebsocketContext";
import { io } from "socket.io-client";


function RestaurentOwner() {
    const router = useRouter()
    const [listOrder, setListOrder] = useState([])
    const [nav, setNav] = useState<any>()
    const [dataInfo, setDataInfo] = useState({})
    const productService = new ProductService
    const restaurantService = new RestaurentService
    // const socket = useContext(WebsocketContext)
    //Socket connect
    const [token, setToken]: any = useState(null)
    const getCookie = (name: string) => {
        const cookieValue = document.cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)') || null;
        return cookieValue ? cookieValue.pop() : null;
    }

    useEffect(() => {
        setToken(getCookie('refresh_token') as string)
    }, [])
    useEffect(() => {
        if (token) {
            const socket = io('http://localhost:3333', {
                extraHeaders: {
                    authorization: `Bearer ${(token)}`
                }
            })
            console.log('socket', socket);
            socket.on('connect', () => {
                console.log('connection..');
            })
            socket.on('GetOrder', (listOrder: any) => {
                // console.log('order', listOrder);
                getOrderRestaurant()
            })
            socket.on('GetMessage', (message: any) => {
                if (message == 'You have a new order!') {
                    notification.open({
                        message: message,
                        icon: <AreaChartOutlined style={{ color: '#8BC34A' }} />,
                    });
                }
            })
            return () => {
                console.log('Unregistering Events...');
                socket.off('connect');
                socket.off('GetOrder');
            };
        }
    }, [token])
    useEffect(() => {
        getOrderRestaurant()
        info()
        const orderBy = listOrder.filter((e: any) => {
            return e.status.id <= 1;
        })
        if (orderBy.length > 0) {
            message.success(`You have ${orderBy.length} order !`)
        }
    }, [])
    const info = async () => {
        const [data, err]: any = await restaurantService.getInfo()
        if (!err) {
            setDataInfo(data)
        }
    }
    const getOrderRestaurant = async () => {
        let [data, err] = await productService.getOrderRestaurant()
        if (!err) {
            // console.log('dsadas', data);
            setListOrder(data)
        }
        return data
    }
    return (
        <>
            <div className={style.page}>
                <div className={style.banner}> </div>
                <div className={style.head}>
                    <div className={style.container}>
                        <Row align={"bottom"} justify={"space-between"}>
                            <Col >
                                <div style={{ display: 'flex' }}>
                                    <div className={style.avatar}>
                                        <img width={'100%'} src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/066.jpg" alt="avatar" />
                                    </div>
                                    <div>
                                        <div className={style.star}>
                                            <Rate disabled defaultValue={6} />
                                        </div>
                                        <h2 className={style.name}>  Organic Arcadian Food</h2>
                                        <p className={style.address}><span> <img width={22} src="https://marketplace.foodotawp.com/wp-content/themes/foodota/libs/images/map.png" alt="address" /></span> Main Boulevard, , Lahore, Punjab, Pakistan - 54000</p>
                                    </div>
                                </div>
                            </Col>

                            <Col >
                                <div className={style.workingHour}>8:00AM - 9:00PM</div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={style.body}>
                    <div className={style.container}>
                        <Row gutter={[20, 10]}>
                            <Col xxl={6} xl={6} lg={8} md={24}>
                                <div className={style.nav}>
                                    <h2>All Details</h2>
                                    <div >
                                        <span style={{ display: "inline-block", width: "40px", height: "2px", backgroundColor: "#FFD95A" }} ></span>
                                        <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                                        <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                                        <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                                    </div>
                                    <div className={style.list}>
                                        <div onClick={() => setNav(null)} className={clsx(style.item, !nav && style.active)}><img width={24} src="https://cdn-icons-png.flaticon.com/512/1046/1046747.png" alt="" /> Menu</div>
                                        <div onClick={() => setNav('nav5')} className={clsx(style.item, nav === 'nav5' && style.active)}><img width={24} src="https://cdn-icons-png.flaticon.com/512/3843/3843517.png" alt="" /> Category</div>
                                        <div onClick={() => setNav('nav6')} className={clsx(style.item, nav === 'nav6' && style.active)}><img width={24} src="https://cdn-icons-png.flaticon.com/512/9031/9031952.png" alt="" /> Voucher</div>
                                        <div onClick={() => setNav('nav1')} className={clsx(style.item, nav === 'nav1' && style.active)}><img width={24} src="https://cdn-icons-png.flaticon.com/512/10674/10674751.png" alt="" /> Order</div>
                                        <div onClick={() => setNav('nav2')} className={clsx(style.item, nav === 'nav2' && style.active)}><img width={24} src="https://cdn-icons-png.flaticon.com/512/5643/5643764.png" alt="" /> Process Order</div>
                                        <div onClick={() => setNav('nav3')} className={clsx(style.item, nav === 'nav3' && style.active)}><img width={24} src="https://cdn-icons-png.flaticon.com/512/9849/9849587.png" alt="" /> Statictisc</div>
                                        <div onClick={() => setNav('nav4')} className={clsx(style.item, nav === 'nav4' && style.active)}><img width={24} src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="" /> Profile</div>
                                    </div>
                                </div>
                            </Col>
                            <Col flex="auto" >
                                <div className={style.content}>
                                    {!nav && <Menu title='Menu' />}
                                    {nav === 'nav1' && <Order title="Order" data={listOrder.filter((item: any) => item?.status.id <= 1)}></Order>}
                                    {nav === 'nav2' && <ProcessOrder title="Process Order" data={listOrder.filter((item: any) => item?.status.id > 1)} />}
                                    {nav === 'nav3' && <Statictisc title="Statictisc" />}
                                    {nav === 'nav4' && <Profile data={dataInfo} />}
                                    {nav === 'nav5' && <Category />}
                                    {nav === 'nav6' && <ListVoucher voucher={[]} />}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

            </div >
        </>
    );
}

export default RestaurentOwner;