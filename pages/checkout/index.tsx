import { Button, Checkbox, Col, Form, Input, Radio, RadioChangeEvent, Row, Select, Space, Switch, message } from 'antd'
import React, { useState, useEffect } from 'react'
import style from './style/checkout.module.scss'
import clsx from 'clsx'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import Link from 'next/link'
import { LeftOutlined } from '@ant-design/icons'
import ClientService from '@/service/clientService'
import UserService from '@/service/userService'
import CartService from '@/service/cartService'
import ProductService from '@/service/productService'

const Checkout = () => {
    const clientService = new ClientService;
    const userService = new UserService;
    const cartService = new CartService;
    const [sessionCart, setSessionCart]: any = useState();
    const [coupon, setCoupon]: any = useState();
    const [cart, setCart]: any = useState([]);
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const [disabled, setDisabled] = useState(false)
    const [dataProfile, setDataProfile]: any = useState([])
    const [totalCart, setTotalCart]: any = useState();
    const [idAdd, setIdAdd] = useState(0)
    useEffect(() => {
        getCart()
    }, [])
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const handleChange = (value: string) => {
        if (value == '') {
            let data = dataProfile.find((item: any) => item.id === value)
            form.setFieldsValue(data)
            setIdAdd(0)
        } else {
            let data = dataProfile.find((item: any) => item.id === value)
            form.setFieldsValue(data)
            setIdAdd(data.id)
        }
        // console.log(`selected ${value}`);
    };
    const getProfile = async () => {
        let [data, err] = await clientService.getInfo()
        if (!err) {
            setDataProfile(data.addresses)
            // form.setFieldsValue(data.addresses[0])
        }
    }
    const onFinish = async (values: any) => {
        let [data, err] = await userService.updateUserAdress(values, values.id)
        if (data) {
            message.success('Update infomation successfully');
        }
        if (err) {
            message.error('update failed');
        }
    }
    const getCart = async () => {
        setSessionCart(JSON.parse(sessionStorage.getItem('cart') as string));
        setCoupon(sessionStorage.getItem('coupon'));
        setTotalCart(sessionStorage.getItem('totalCart'));
        console.log(totalCart);

        const [data, err] = await cartService.getAllCart();
        if (data) {
            let curCart = data.filter((item: any) => JSON.parse(sessionStorage.getItem('cart') as string)?.includes(item.id));
            setCart(curCart)
        }
        if (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        getProfile()
        getCart()
    }, [])
    const productService = new ProductService
    const handleSubmit = async () => {
        console.log(cart);
        console.log(idAdd);
        console.log(cart[0].product.restaurant.id);
        if (!idAdd) {
            return message.error('please choose your address')
        }
        let dataOrder = {
            restaurantid: cart[0].product.restaurant.id,
            statusid: 1,
            userAddressid: idAdd
        }
        let [data, err] = await productService.createOrder(dataOrder)
        if (!err) {
            console.log(data);

            cart.forEach(async (item: any) => {
                let dataOrderDetail = {
                    orderid: data.result.id,
                    productid: item.product.id,
                    quantity: item.quantity
                }
                let [dataOD, err] = await productService.createOrderDetail(dataOrderDetail)
                if (err) {
                    console.log(err);
                }
            });
            message.success('Successfuly!')
        }
    }
    return (
        <>
            <div className={style.cart_page}>
                <div style={{ backgroundColor: "#f8f9fa", height: '80px' }}>
                    <h2 style={{ lineHeight: '80px', margin: '0', fontWeight: '600' }}>Checkout</h2>
                </div>

                <div className={style.container}>
                    <Row align={'top'}>
                        <Col xl={8} md={12} sm={24} xs={24}>
                            <div style={{ padding: '0 10px' }}>
                                <h5 style={{ color: '#333', marginBottom: '20px' }}>Shipment Details</h5>
                                <Switch checkedChildren="Edit" unCheckedChildren="Default" style={{ display: 'block' }} onChange={(v) => setDisabled(v)
                                } />
                                <Select
                                    defaultValue={''}
                                    className={style.select}
                                    onChange={handleChange}

                                    options={
                                        [
                                            { value: '', label: 'Choose Address' },
                                            ...dataProfile.map((item: any) => {
                                                return { value: item.id, label: item.name_address }
                                            })
                                        ]
                                    }
                                />
                            </div>
                            <Form
                                form={form}
                                wrapperCol={{ span: 20 }}
                                layout="horizontal"
                                disabled={!disabled}
                                initialValues={dataProfile}
                                onValuesChange={onFormLayoutChange}
                                size={componentSize as SizeType}
                                style={{ maxWidth: '100%' }}
                                onFinish={onFinish}
                            >
                                <div className={style.info_ship}>
                                    <Form.Item label="" name='id' style={{ display: "none" }}>
                                        <Input className={style.input_form} />
                                    </Form.Item>
                                    <Form.Item label="" name='name' style={{ width: '100%' }}>
                                        <Input placeholder='Full name' className={style.input_form} />
                                    </Form.Item>
                                    <Form.Item label="" name='phone'>
                                        <Input placeholder='Phone number' className={style.input_form} />
                                    </Form.Item>
                                    <Form.Item label="" name='name_address'>
                                        <Input placeholder='Address' className={style.input_form} />
                                    </Form.Item>
                                    <Form.Item label="" name='note'>
                                        <TextArea placeholder='Notes' className={style.input_form} rows={2} />
                                    </Form.Item>
                                    {disabled &&
                                        <Form.Item label="">
                                            <button type='submit' className={clsx(style.btn_login)}>Update</button>
                                        </Form.Item>
                                    }
                                </div>
                            </Form>
                        </Col>

                        <Col xl={8} md={12} sm={24} xs={24}>
                            <div className={style.shipment_method}>
                                <h5 style={{ color: '#333', marginBottom: '20px' }}>Payment Method</h5>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Space direction="vertical">
                                        <Radio value={1}>Payment by e-wallet</Radio>
                                        <Radio value={2}>Ship COD</Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </Col>
                        <Col xl={8} md={18} sm={24} xs={24}>
                            <div className={style.order_item}>
                                <h5 style={{ color: '#333', marginBottom: '20px' }}>Your Order</h5>
                                {cart && cart.length > 0 ? cart.map((item: any) => {
                                    return (
                                        <div className={style.items}>
                                            <Row align={'middle'}>
                                                <Col xl={4} md={4} sm={4} xs={6}>
                                                    <div className={style.img_item}>
                                                        <img src={item.product.images} alt="" />
                                                    </div>
                                                </Col>
                                                <Col xl={16} md={16} sm={16} xs={18}>
                                                    <div>
                                                        <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>{item.product.name}</p>
                                                        <p style={{ color: '#969696' }}>x {item.quantity}</p>
                                                    </div>
                                                </Col>
                                                <Col xl={4} md={4} sm={4} xs={24}>
                                                    {item.product.sale_price == 0 &&
                                                        <div className={style.price} >
                                                            <span style={{ fontWeight: '600' }}>$ {item.product.price}</span>
                                                        </div>
                                                    }
                                                    {item.product.sale_price > 0 &&
                                                        <div className={style.price} >
                                                            <span style={{ fontWeight: '600' }}>$ {item.product.sale_price * item.quantity}</span>
                                                        </div>
                                                    }
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                                    : <></>
                                }
                                <div className={style.apply_dicount}>
                                    <Row align={'middle'} justify={'space-between'}>
                                        <Col xl={18} md={18} sm={18} xs={24} >
                                            <Input placeholder='Enter your discount' value={coupon} className={style.input_form} />
                                        </Col>
                                        <Col xl={6} md={6} sm={6} xs={24} className={style.implement}>
                                            <Link href={''} className={style.btn_apply}>
                                                Apply
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                                <div className={style.total_price}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '17px', fontWeight: '400' }}>Subtotal:</span>
                                        <span style={{ fontSize: '16px' }}>{totalCart} $</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '17px', fontWeight: '400' }}>Shipping Fee:</span>
                                        <span style={{ fontSize: '16px' }}>10 $</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '20px', fontWeight: '500' }}>Total:</span>
                                        <span style={{ fontSize: '18px', fontWeight: '500', color: '#fcaf17' }}>{Number(totalCart) + 10} $</span>
                                    </div>
                                    <div style={{ display: 'flex', marginBottom: '10px', marginTop: '25px', justifyContent: 'space-between' }}>
                                        <Link href={'/cart'}>
                                            <div className={style.backToCart} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fcaf17', fontWeight: '600' }}>
                                                <LeftOutlined style={{ fontSize: '10.5px' }} /> Back to cart
                                            </div>
                                        </Link>
                                        <Form.Item>
                                            <Button style={{ borderRadius: '0 !important' }} onClick={handleSubmit}>Submit</Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div >
        </>
    )
}

export default Checkout