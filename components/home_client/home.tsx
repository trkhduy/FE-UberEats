import React, { useEffect, useState } from 'react'
import style from './style/home.module.scss'
import { Button, Col, Empty, Input, Row, Tooltip } from 'antd'
import { ClockCircleFilled, SearchOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import Link from 'next/link'
import ClientService from '@/service/clientService'


function HomeClient(): any {
    const clientService = new ClientService;
    const [width, setWidth] = useState(0);
    const [newPro, setNewPro] = useState([]);
    const [salePro, setSalePro] = useState([]);
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    }
    const getNewProduct = async () => {
        const [newPro, err]: any = await clientService.getNewProduct();
        if (newPro) {
            setNewPro(newPro);
        }
        if (err) {
            console.log(err);
        }
    }
    const getSaleProduct = async () => {
        const [salePro, err]: any = await clientService.getSaleProduct();
        if (salePro) {
            setSalePro(salePro);
        }
        if (err) {
            console.log(err);
        }
    }
    useEffect(() => {

        getNewProduct();
        getSaleProduct()
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    return (
        <>
            <div className={style.home_main}>
                <div className={style.banner}>
                    <div>
                        <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/9b21aa66b4922ae2.png" alt="" />
                    </div>
                    <div className={style.content_banner}>
                        <h2 className={style.title_banner}>Order food to your door</h2>
                        <div className={style.dFlex}>
                            <Input
                                style={{ borderRadius: '0', padding: "15px 20px" }}
                                placeholder="Enter the dish or restaurant name you want to search for"
                                prefix={<SearchOutlined className="site-form-item-icon" style={{ fontSize: "20px", marginRight: "13px" }} />}
                            />
                            <button style={{
                                marginLeft: '15px',
                                padding: "12px 20px",
                                width: "150px",
                                height: "53.6px !important",
                                backgroundColor: '#000 !important',
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                                // margin: '0'

                            }}>Find Food</button>
                        </div>
                        <div className={style.restaurant_popular}>
                            <h2>Popular Restaurant</h2>
                            <Row>
                                <Col>
                                    <Link href={""}>
                                        <Tooltip placement="top" title={<span>Test</span>} >
                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/066.jpg" className={style.resAvatar} alt="" />
                                        </Tooltip>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link href={""}>
                                        <Tooltip placement="top" title={<span>Test</span>} >
                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/022.jpg" className={style.resAvatar} alt="" />
                                        </Tooltip>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link href={""}>
                                        <Tooltip placement="top" title={<span>Test</span>} >
                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/downtown.jpg" className={style.resAvatar} alt="" />
                                        </Tooltip>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link href={""}>
                                        <Tooltip placement="top" title={<span>Test</span>} >
                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/088.jpg" className={style.resAvatar} alt="" />
                                        </Tooltip>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link href={""}>
                                        <Tooltip placement="top" title={<span>Test</span>} >
                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/077.jpg" className={style.resAvatar} alt="" />
                                        </Tooltip>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link href={""}>
                                        <Tooltip placement="top" title={<span>Test</span>} >
                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/0011.jpg" className={style.resAvatar} alt="" />
                                        </Tooltip>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link href={""}>
                                        <Tooltip placement="top" title={<span>Test</span>} >
                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/055.jpg" className={style.resAvatar} alt="" />
                                        </Tooltip>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                {/* newProduct */}
                <div className={style.new_product} >
                    <div className={style.title_top_res}>
                        <h3>new arrival</h3>
                        <h1>Food and Beverage</h1>
                        <div style={{ marginBottom: '20px' }}>
                            <span style={{ display: "inline-block", width: "45px", height: "3px", backgroundColor: "#FFD95A" }} ></span>
                            <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                            <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                            <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                        </div>
                    </div>
                    <div className={style.item_top_res}>
                        <Row>
                            {
                                newPro && newPro.length > 0 ? newPro.map((e: any, i) => {
                                    return (
                                        <Col key={i} xl={6} md={width >= 992 ? 8 : 12} sm={12} xs={24} style={{ padding: "0 20px", marginBottom: "35px" }}>
                                            <div className={style.card_item}>
                                                <div className={style.img_item}>
                                                    <Link href={''}>
                                                        <img src={e.images} alt="" />
                                                    </Link>
                                                </div>
                                                <div className={style.content_item}>
                                                    <Link href={''}>
                                                        <h3>{e.name}</h3>
                                                    </Link>
                                                    <div className={style.price_item}>
                                                        {
                                                            e.sale_price > 0 && <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <span className={style.cur_price}>${e.price}</span>
                                                                <div className={style.dash}></div>
                                                                <span className={style.sale_price}>${e.sale_price}</span>
                                                            </div>
                                                        }
                                                        {
                                                            e.sale_price == 0 && <div>
                                                                <span className={style.sale_price}>${e.price}</span>
                                                            </div>
                                                        }

                                                        <div className={style.cart_plus}>
                                                            <Link href={''} style={{ color: '#4D3C3C' }}>
                                                                <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className={style.res_info}>
                                                        <div className={style.img_res}>
                                                            <img src={e.user.avatar} alt="" />
                                                        </div>
                                                        <div className={style.res_detail_info}>
                                                            <div className={style.working_on}>
                                                                <ClockCircleFilled style={{ color: 'green' }} />
                                                                {e.restaurant && e.restaurant.opentime && e.restaurant.endtime
                                                                    ? < span > {e.restaurant.opentime} am - {e.restaurant.endtime} pm</span>
                                                                    : <span>8:00 am - 10:00 pm</span>
                                                                }

                                                            </div>
                                                            <div className={style.res_address}>
                                                                <img src="https://cdn-icons-png.flaticon.com/512/1865/1865269.png" alt="" />
                                                                {
                                                                    e.restaurant && e.restaurant.address
                                                                        ? <span>{e.restaurant.address}</span>
                                                                        : <span>Main Boulevard, , Lahore,</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                                    : <Empty />
                            }
                        </Row>
                    </div>
                </div>
                {/* top restaurant */}
                <div className={style.top_restaurant} style={{ background: '#f2f2f2', padding: '80px 0' }}>
                    <div className={style.title_top_res}>
                        <h3>Top Restaurants</h3>
                        <h1>Popular Restaurant</h1>
                        <div style={{ marginBottom: '20px' }}>
                            <span style={{ display: "inline-block", width: "45px", height: "3px", backgroundColor: "#FFD95A" }} ></span>
                            <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                            <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                            <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                        </div>
                    </div>
                    <div className={style.item_top_res}>
                        <Row>
                            {salePro && salePro.length > 0 ? salePro.map((e: any, i) => {
                                return (
                                    < Col key={i} xl={6} md={width >= 992 ? 8 : 12} sm={12} xs={24} style={{ padding: "0 20px", marginBottom: "35px" }}>
                                        <div className={style.card_item}>
                                            <div className={style.img_item}>
                                                <Link href={''}>
                                                    <img src={e.images} alt="" />
                                                </Link>
                                                <div className={style.stars}>
                                                    <StarFilled style={{ fontSize: "1rem", marginRight: "3px" }} />
                                                    <StarFilled style={{ fontSize: "1rem", marginRight: "3px" }} />
                                                    <StarFilled style={{ fontSize: "1rem", marginRight: "3px" }} />
                                                    <StarFilled style={{ fontSize: "1rem", marginRight: "3px" }} />
                                                    <StarFilled style={{ fontSize: "1rem", marginRight: "3px" }} />
                                                </div>
                                            </div>
                                            <div className={style.content_item}>
                                                <Link href={''}>
                                                    <h3>{e.name}</h3>
                                                </Link>
                                                <div className={style.price_item}>
                                                    {
                                                        e.sale_price > 0 && <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span className={style.cur_price}>${e.price}</span>
                                                            <div className={style.dash}></div>
                                                            <span className={style.sale_price}>${e.sale_price}</span>
                                                        </div>
                                                    }
                                                    {
                                                        e.sale_price == 0 && <div>
                                                            <span className={style.sale_price}>${e.price}</span>
                                                        </div>
                                                    }
                                                    <div className={style.cart_plus}>
                                                        <Link href={''} style={{ color: '#4D3C3C' }}>
                                                            <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className={style.res_info}>
                                                    <div className={style.img_res}>
                                                        <img src={e.images} alt="" />
                                                    </div>
                                                    <div className={style.res_detail_info}>
                                                        <div className={style.working_on}>
                                                            <ClockCircleFilled style={{ color: 'green' }} />
                                                            {e.restaurant && e.restaurant.opentime && e.restaurant.endtime
                                                                ? < span > {e.restaurant.opentime} am - {e.restaurant.endtime} pm</span>
                                                                : <span>8:00 am - 10:00 pm</span>
                                                            }

                                                        </div>
                                                        <div className={style.res_address}>
                                                            <img src="https://cdn-icons-png.flaticon.com/512/1865/1865269.png" alt="" />
                                                            {
                                                                e.restaurant && e.restaurant.address
                                                                    ? <span>{e.restaurant.address}</span>
                                                                    : <span>Main Boulevard, , Lahore,</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                                : <Empty />
                            }
                        </Row>
                    </div>
                </div>
                <div className={style.feat_home}>
                    <Row>
                        <Col xl={8} md={24} sm={24} xs={24}>
                            <div className={style.card_feat} style={{ padding: '0 15px' }}>
                                <div className={style.img_feat}>
                                    <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/dd109bb1f7572eed.png" alt="" />
                                </div>
                                <Link href={''}>
                                    <h3 className={style.title_feat}>Feed your employees</h3>
                                </Link>
                                <Link href={''}>
                                    <span className={style.btn_feat}>Create a business account</span>
                                </Link>
                            </div>
                        </Col>
                        <Col xl={8} md={24} sm={24} xs={24}>
                            <div className={style.card_feat} style={{ padding: '0 15px' }}>
                                <div className={style.img_feat}>
                                    <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/8148ef38ec4096b7.png" alt="" />
                                </div>
                                <Link href={''}>
                                    <h3 className={style.title_feat}>Your restaurant, delivered</h3>
                                </Link>
                                <Link href={''}>
                                    <span className={style.btn_feat}>Add your restaurant</span>
                                </Link>
                            </div>
                        </Col>
                        <Col xl={8} md={24} sm={24} xs={24}>
                            <div className={style.card_feat} style={{ padding: '0 15px' }}>
                                <div className={style.img_feat}>
                                    <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/7a9d4feba62d2c0b.png" alt="" />
                                </div>
                                <Link href={''}>
                                    <h3 className={style.title_feat}>Deliver with UberEats</h3>
                                </Link>
                                <Link href={''}>
                                    <span className={style.btn_feat}>Sign up to deliver</span>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={style.map}>
                    <h1>Cities near me</h1>
                    <div className={style.gg_map}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14896.825722694739!2d105.79380725!3d21.02442465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1684134270606!5m2!1sen!2s" width="100%" height="450" ></iframe>
                    </div>
                </div>
            </div >
        </>
    )
}

export default HomeClient