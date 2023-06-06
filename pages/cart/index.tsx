import { CloseOutlined, DeleteOutlined, MinusOutlined } from '@ant-design/icons';
import { Checkbox, Col, Divider, Empty, Input, Row, message } from 'antd';
import clsx from 'clsx';
// import IpNumber from '../../../component/inputNumber/ipNumber';
import style from './style/cart.module.scss'
import C_product from '@/components/carousel_product/c_product';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CartService from '@/service/cartService';
import { useDispatch } from 'react-redux';
import { fetchCartCount } from '@/redux/reducer/cartReducer';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRouter } from 'next/router';
import ClientService from '@/service/clientService';
function Cart() {
    const router = useRouter()
    const [dataCart, setDataCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [voucher, setVoucher]: any = useState();
    const dispatch = useDispatch();
    const [checkRes, setCheckRes]: any = useState(null);
    const [listcheckRes, setListCheckRes]: any = useState([]);
    const ship = 2.5;
    const cartService = new CartService;
    const clientService = new ClientService;
    const coupon: any = useRef()
    async function quantity(action: any, id_p: any, item: any) {
        const id: any = document.getElementById('ip_number' + id_p)
        if (action == '-') {
            id.value > 1 && (id.value -= 1)
        } else if (action == '+') {
            let number = Number(id.value)
            number += 1
            id.value = number
        }
        setLoading(true)
        if (id.value < 1) {
            id.value = 1
        }
        const [data, err] = await cartService.editCart({ ...item, quantity: id.value }, id_p)
        if (!err) {
            getCart()
            message.success('Update sucessfuly!')
        }
        setLoading(false)
    }
    const getVoucher = async (code: string) => {

        let [voucher, err] = await clientService.getDetailVocher(code)
        if (voucher) {
            setVoucher(voucher)
            message.success('Added coupon sucessfuly!')
        }
        if (!voucher) {
            message.error("not found coupon")
        }
    }
    const applyCoupon = async () => {
        let valueCou = coupon.current.value;
        getVoucher(valueCou);
        setTotal(totalPrice(dataCart))
    }

    const getCart = async () => {
        let [data, err] = await cartService.getAllCart()
        if (!err) {
            setDataCart(data)
        }
    }
    const deleteCart = async (id: number) => {
        setLoading(true)
        let [data, err] = await cartService.deteteCart(id)
        if (!err) {
            setLoading(false)
            getCart()
            dispatch(fetchCartCount());
            message.success('Delete sucessfuly!')
        } else {
            message.error("ERROR! Please try again")
        }
    }
    useEffect(() => {
        setTotal(totalPrice(dataCart))
    }, [listcheckRes])
    const subPrice = (data: any) => {
        if (data.product.sale_price) {
            return Number(data.product.sale_price) * Number(data.quantity)
        }
        return Number(data.product.price) * Number(data.quantity)
    }
    const totalPrice = (data: any[]) => {
        data = data.filter(item => listcheckRes.includes(item.id))
        let total = data.reduce((total: number, item: any) => {
            return total + subPrice(item)
        }, 0)
        if (voucher) {
            console.log('voucher.discount', voucher.discount);
            return total * (1 - (voucher.discount / 100))
        }

        return total
    }

    const onChange = (e: any, id: number, resId: number) => {

        if (e.target.checked) {
            setListCheckRes((prevList: any) => [...prevList, id]);
        } else {
            setListCheckRes((prevList: any) => prevList.filter((res: any) => res !== id));
        }
        if (checkRes == resId && !e.target.checked && listcheckRes.length <= 1) {
            setCheckRes(null)
        } else {
            setCheckRes(resId)
        }
    };
    const saveCart = () => {
        sessionStorage.setItem('cart', JSON.stringify(listcheckRes));
        sessionStorage.setItem('totalCart', JSON.stringify(total));
        if (voucher) {
            sessionStorage.setItem('coupon', JSON.stringify(voucher.code));
        } else {
            sessionStorage.removeItem('coupon')
        }
        router.push('/checkout')
    }
    useEffect(() => {
        getCart()
    }, [])

    return (
        <>

            <div style={{ backgroundColor: "#f8f9fa", height: '80px' }}>
                <div className={clsx(style.title)} style={{ padding: "0 1rem" }}>
                    <h2>Cart</h2>
                    <span className={style.redirect} >
                        Home
                        <span style={{ width: '5px', margin: '0 10px', height: "5px", borderRadius: "50%", backgroundColor: "#e2e2e2", display: "inline-block", verticalAlign: "middle" }}></span>
                        Cart
                    </span>
                </div>
            </div>
            <div className={style.cart}>

                <Row>
                    <Col lg={16} span={24}>
                        <div className={clsx(style.list, 'pe-lg-3 pe-0')}>
                            {dataCart && dataCart.length > 0 ? dataCart.map((item: any, i) => (
                                <div className={style.item} key={item.id}>
                                    <Row align='middle'>
                                        <Col sm={12} span={24}>
                                            <div className='d-flex align-items-center'>
                                                <Checkbox onChange={(e) => onChange(e, item.id, item.product.restaurant.id)} disabled={checkRes ? (checkRes != item.product.restaurant.id) : false} style={{ marginRight: '10px' }} />
                                                <div className={style.image}>
                                                    <img style={{ maxWidth: "200px", maxHeight: "150px" }} src={item.product.images} alt=''></img>
                                                </div>
                                                <div className={clsx(style.content, 'ps-4')}>
                                                    <p><b style={{ color: "#4D3C3C" }}>Restaurant's name </b>:{item.product.restaurant.name}</p>
                                                    <p className={style.name}>{item.product.name}</p>
                                                    <span style={{ color: "#7a7a7a" }}>${item.product.sale_price ? item.product.sale_price : item.product.price}</span>
                                                    <span style={{ fontSize: "20px" }}> x </span>
                                                    <span>{item.quantity}</span>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={12} span={24}>
                                            <div className='d-flex align-items-center pt-sm-0 pt-2' style={{ justifyContent: "space-between" }}>
                                                <div className={style.input_number}>
                                                    <span onClick={() => quantity('-', item.id, item)}><MinusOutlined style={{ fontSize: "13px", verticalAlign: "middle" }} /></span>
                                                    <input type='number' id={'ip_number' + item.id} defaultValue={item.quantity} onBlur={() => quantity(null, item.id, item)} />
                                                    <span onClick={() => quantity('+', item.id, item)}>+</span>
                                                </div>
                                                <div>${subPrice(item)}</div>
                                                <div><DeleteOutlined style={{ verticalAlign: "middle", cursor: 'pointer' }} onClick={() => deleteCart(item.id)} /></div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                                : <Empty style={{ margin: '0 auto' }} />
                            }

                            <Row justify={'space-between'} align={'middle'}>
                                <Col>
                                    <div className={style.coupon}>
                                        <input type={'text'} ref={coupon} placeholder="Coupon Code" />
                                        <a id="" className="btn btn-primary" onClick={applyCoupon} role="button">Apply Coupon</a>
                                    </div>
                                </Col>
                                <Col>
                                    <div className={style.continue_shopping}>
                                        <a id="" className="btn btn-primary" href="#" role="button">Continue Shopping</a>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col lg={8} span={24}>
                        <div className={clsx(style.total, 'mt-lg-0 mt-5')}>
                            <h5>Cart totals</h5>
                            <div className='d-flex justify-content-between'>
                                <span style={{ textTransform: "uppercase" }}>SUBTOTAL</span>
                                <b>${total}</b>

                            </div>
                            <div style={{ backgroundColor: '#f8f9fa', padding: ' 8px', marginBottom: '8px' }}>
                                <div className='d-flex justify-content-between'>
                                    <span>Shipping</span><b></b>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Flat rate:</span><b>${ship}</b>
                                </div>
                                <div className=''>
                                    <span>Shiping to </span><b>NY</b>
                                </div>
                                <div className=''>
                                    <span>Change Address</span><b></b>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <span style={{ textTransform: "uppercase" }}>TOTAL</span>
                                <b>${total + ship}</b>
                            </div>
                            <span className={clsx(style.btn_checkout, 'btn')} onClick={saveCart}>
                                Process To Checkout
                            </span>
                        </div>
                    </Col>
                </Row>
                {/* <div style={{ paddingTop: '80px' }}>
                    <h4 style={{ padding: '0 1rem' }}>You May Be Interested In…</h4>
                    <C_product number={5} />
                </div> */}
            </div>


        </>
    );
}

export default Cart;