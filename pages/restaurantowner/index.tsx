
import { Col, Rate, Row } from "antd";
import style from "../../styles/restaurant/restaurant.module.scss";
import Menu from "@/components/restaurant_owner/listMenu";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Order from "@/components/restaurant_owner/listOrder";
import ProcessOrder from "@/components/restaurant_owner/listProcess";
import Statictisc from "@/components/restaurant_owner/statictisc";
import Profile from "@/components/profile/profile";
import { useRouter } from "next/router";
import RestaurentService from "@/service/restaurantService";
import Category from "@/components/restaurant_owner/listCategory";
import Voucher from "../voucher";
import ListVoucher from "@/components/restaurant_owner/listVoucher";


function RestaurentOwner() {
    const router = useRouter()
    const [nav, setNav] = useState<any>()
    const [dataInfo, setDataInfo] = useState({})
    const restaurantService = new RestaurentService
    const info = async () => {
        const [data, err]: any = await restaurantService.getInfo()
        if (!err) {
            setDataInfo(data)
        }
    }


    useEffect(() => {
        info()
    }, [])
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
                                    {nav === 'nav1' && <Order title="Order"></Order>}
                                    {nav === 'nav2' && <ProcessOrder title="Process Order" />}
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