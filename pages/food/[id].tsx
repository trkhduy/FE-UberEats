import { Col, InputNumber, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import style from './style/detail.module.scss'
import Link from 'next/link'
import { ClockCircleFilled, ClockCircleOutlined, CopyFilled, DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import BtnCopy from '@/components/btncopy'
const DetailProduct = () => {
    const router = useRouter()
    const changeQuantity = (value: 1 | 100 | null) => {
        console.log('changed', value);
    };
    return (
        <>
            <div className={style.detail_product}>
                <div className={style.container}>
                    <div className={style.product_detail}>
                        <Row>
                            <Col xl={12} md={12} sm={24}>
                                <div className={style.img_detail}>
                                    <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/04/Arcadian.jpg" alt="" />
                                </div>
                            </Col>
                            <Col xl={12} md={12} sm={24}>
                                <div className={style.content_detail}>
                                    <div className={style.pro_cate}>
                                        <span className={style.category}>FastFood/Chicken</span> - <span><Link href={''} style={{ color: '#187caa' }}>Branches</Link></span>
                                    </div>
                                    <h2 style={{ margin: '20px 0', fontWeight: '700', fontSize: '26px', color: '#464646', letterSpacing: '1.1px' }}>Tasty Food Pizza</h2>
                                    <p style={{ color: "#252525", margin: '20px 0', }}>8 Ng. 66 Đ. Hồ Tùng Mậu, P. Mai Dịch, Cầu Giấy, Hà Nội</p>
                                    <div className={style.working} style={{ margin: '20px 0' }}>
                                        <div style={{ display: "flex", alignItems: 'center' }}>
                                            <div style={{ width: '9px', height: '9px', background: '#6cc942', borderRadius: '50%' }}></div>
                                            <span style={{ marginLeft: '3px', color: "#6cc942", fontWeight: '600' }}>Open:</span>
                                            <span style={{ marginLeft: '10px', color: "#252525", fontWeight: '600' }}><ClockCircleOutlined style={{ color: '#959595' }} /> 8:00 AM - 10:00 PM</span>
                                        </div>
                                    </div>
                                    <div className={style.price} style={{ margin: '20px 0' }}>
                                        <DollarOutlined style={{ color: '#959595' }} /><span style={{ color: '#959595', marginLeft: '10px', fontSize: '16px' }}>$100</span>
                                    </div>
                                    <div className={style.quantity} style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                                        <span>Quantity:</span>
                                        <InputNumber style={{ borderRadius: '0', marginLeft: '15px' }} min={1} max={100} defaultValue={1} onChange={changeQuantity} />
                                    </div>
                                    <div className={style.addToCart} style={{ margin: '60px 0' }}>
                                        <Link href={''} >
                                            Add To Cart
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={style.related_info}>
                        <Row >
                            <Col xl={18} md={24}>
                                <div className={style.related_pro}>
                                    <h2>Restaurant's Menu</h2>
                                    <Row>
                                        <Col xl={8} md={8} xs={24} sm={12} style={{ padding: "0 10px", marginBottom: "35px" }}>
                                            <div className={style.card_item}>
                                                <div className={style.img_item}>
                                                    <Link href={''}>
                                                        <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/04/01-1-1.png" alt="" />
                                                    </Link>
                                                </div>
                                                <div className={style.content_item}>
                                                    <Link href={''}>
                                                        <h3>Organic Acardian Food</h3>
                                                    </Link>
                                                    <div className={style.price_item}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span className={style.cur_price}>$100</span>
                                                            <div className={style.dash}></div>
                                                            <span className={style.sale_price}>$70</span>
                                                        </div>
                                                        <div className={style.cart_plus}>
                                                            <Link href={''} style={{ color: '#4D3C3C' }}>
                                                                <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className={style.res_info}>
                                                        <div className={style.img_res}>
                                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/066.jpg" alt="" />
                                                        </div>
                                                        <div className={style.res_detail_info}>
                                                            <div className={style.working_on}>
                                                                <ClockCircleFilled style={{ color: 'green' }} />
                                                                <span>8:00 am - 10:00 pm</span>
                                                            </div>
                                                            <div className={style.res_address}>
                                                                <img src="https://cdn-icons-png.flaticon.com/512/1865/1865269.png" alt="" />
                                                                <span>Main Boulevard, , Lahore,</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xl={8} md={8} xs={24} sm={12} style={{ padding: "0 10px", marginBottom: "35px" }}>
                                            <div className={style.card_item}>
                                                <div className={style.img_item}>
                                                    <Link href={''}>
                                                        <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/04/01-1-1.png" alt="" />
                                                    </Link>
                                                </div>
                                                <div className={style.content_item}>
                                                    <Link href={''}>
                                                        <h3>Organic Acardian Food</h3>
                                                    </Link>
                                                    <div className={style.price_item}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span className={style.cur_price}>$100</span>
                                                            <div className={style.dash}></div>
                                                            <span className={style.sale_price}>$70</span>
                                                        </div>
                                                        <div className={style.cart_plus}>
                                                            <Link href={''} style={{ color: '#4D3C3C' }}>
                                                                <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className={style.res_info}>
                                                        <div className={style.img_res}>
                                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/066.jpg" alt="" />
                                                        </div>
                                                        <div className={style.res_detail_info}>
                                                            <div className={style.working_on}>
                                                                <ClockCircleFilled style={{ color: 'green' }} />
                                                                <span>8:00 am - 10:00 pm</span>
                                                            </div>
                                                            <div className={style.res_address}>
                                                                <img src="https://cdn-icons-png.flaticon.com/512/1865/1865269.png" alt="" />
                                                                <span>Main Boulevard, , Lahore,</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xl={8} md={8} xs={24} sm={12} style={{ padding: "0 10px", marginBottom: "35px" }}>
                                            <div className={style.card_item}>
                                                <div className={style.img_item}>
                                                    <Link href={''}>
                                                        <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/04/01-1-1.png" alt="" />
                                                    </Link>
                                                </div>
                                                <div className={style.content_item}>
                                                    <Link href={''}>
                                                        <h3>Organic Acardian Food</h3>
                                                    </Link>
                                                    <div className={style.price_item}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <span className={style.cur_price}>$100</span>
                                                            <div className={style.dash}></div>
                                                            <span className={style.sale_price}>$70</span>
                                                        </div>
                                                        <div className={style.cart_plus}>
                                                            <Link href={''} style={{ color: '#4D3C3C' }}>
                                                                <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className={style.res_info}>
                                                        <div className={style.img_res}>
                                                            <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/066.jpg" alt="" />
                                                        </div>
                                                        <div className={style.res_detail_info}>
                                                            <div className={style.working_on}>
                                                                <ClockCircleFilled style={{ color: 'green' }} />
                                                                <span>8:00 am - 10:00 pm</span>
                                                            </div>
                                                            <div className={style.res_address}>
                                                                <img src="https://cdn-icons-png.flaticon.com/512/1865/1865269.png" alt="" />
                                                                <span>Main Boulevard, , Lahore,</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xl={6} md={24}>
                                <div className={style.voucher}>
                                    <h2>Available Voucher</h2>
                                    <div style={{ background: '#fbf9d8', padding: '15px 10px', borderBottom: '1px solid #ebe9c9' }}>
                                        <Row align={'middle'}>
                                            <Col xl={4} md={6} sm={4} xs={4} className={style.img_vou}>
                                                <img src="https://images.foody.vn/icon/discount/s/shopeefood_voucher_14.png" alt="" />
                                            </Col>
                                            <Col xl={20} md={18} sm={20} xs={20} className={style.vou}>
                                                <span>Thanh toán thẻ tín dụng Home Credit: Giảm 30K, đơn tối thiểu 120K vào tất cả các ngày trong tuần.</span>
                                            </Col>
                                        </Row>
                                        <BtnCopy value={'123'} />
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailProduct