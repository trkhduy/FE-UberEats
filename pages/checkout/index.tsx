import { Button, Checkbox, Col, Form, Input, Radio, RadioChangeEvent, Row, Select, Space } from 'antd'
import React, { useState } from 'react'
import style from './style/checkout.module.scss'
import clsx from 'clsx'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import Link from 'next/link'
import { LeftOutlined } from '@ant-design/icons'


const Checkout = () => {
    const { TextArea } = Input;
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };
    const [value, setValue] = useState(1);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onChangeCheckBox = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    return (
        <>
            <div className={style.cart_page}>
                <div style={{ backgroundColor: "#f8f9fa", height: '80px' }}>
                    <h2 style={{ lineHeight: '80px', margin: '0', fontWeight: '600' }}>Checkout</h2>
                </div>
                <Form
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    initialValues={{ size: componentSize }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                    style={{ maxWidth: '100%' }}
                >
                    <div className={style.container}>
                        <Row align={'top'}>
                            <Col xl={8} md={12} sm={24} xs={24} >
                                <div className={style.info_ship}>
                                    <h5 style={{ color: '#333', marginBottom: '20px' }}>Shipment Details</h5>
                                    <Form.Item label="" style={{ width: '100%' }}>
                                        <Input placeholder='Full name' className={style.input_form} />
                                    </Form.Item>
                                    <Form.Item label="">
                                        <Input placeholder='Phone number' className={style.input_form} />
                                    </Form.Item>
                                    <Form.Item label="">
                                        <Input placeholder='Address' className={style.input_form} />
                                    </Form.Item>
                                    <Checkbox onChange={onChangeCheckBox} >Pick another address</Checkbox>
                                    <Form.Item label="">
                                        <Select

                                            defaultValue="lucy"
                                            style={{ marginTop: '20px' }}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'jack', label: 'Jack' },
                                                { value: 'lucy', label: 'Lucy' },
                                                { value: 'Yiminghe', label: 'yiminghe' },
                                                { value: 'disabled', label: 'Disabled', disabled: true },
                                            ]}
                                        />
                                    </Form.Item>

                                    <Form.Item label="">
                                        <TextArea placeholder='Notes' className={style.input_form} rows={4} />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col xl={8} md={12} sm={24} xs={24}>
                                <div className={style.shipment_method}>
                                    <h5 style={{ color: '#333', marginBottom: '20px' }}>Shipment Method</h5>
                                    <Radio.Group onChange={onChange} value={value}>
                                        <Space direction="vertical">
                                            <Radio value={1}>Payment by e-wallet</Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </Col>
                            <Col xl={8} md={18} sm={24} xs={24}>
                                <div className={style.order_item}>
                                    <h5 style={{ color: '#333', marginBottom: '20px' }}>Your Order(5 items)</h5>
                                    <div className={style.items}>
                                        <Row align={'middle'}>
                                            <Col xl={4} md={4} sm={4} xs={6}>
                                                <div className={style.img_item}>
                                                    <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/04/hardees.jpg" alt="" />
                                                </div>
                                            </Col>
                                            <Col xl={16} md={16} sm={16} xs={18}>
                                                <div>
                                                    <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>Masterchef Chinese Food</p>
                                                    <p style={{ color: '#969696' }}>x 2</p>
                                                </div>
                                            </Col>
                                            <Col xl={4} md={4} sm={4} xs={24}>
                                                <div className={style.price} >
                                                    <span style={{ fontWeight: '600' }}>400 $</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className={style.apply_dicount}>
                                        <Row align={'middle'} justify={'space-between'}>
                                            <Col xl={18} md={18} sm={18} xs={24} >
                                                <Input placeholder='Enter your discount' className={style.input_form} />
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
                                            <span style={{ fontSize: '16px' }}>800 $</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '17px', fontWeight: '400' }}>Shipping Fee:</span>
                                            <span style={{ fontSize: '16px' }}>10 $</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '20px', fontWeight: '500' }}>Total:</span>
                                            <span style={{ fontSize: '18px', fontWeight: '500', color: '#fcaf17' }}>810 $</span>
                                        </div>
                                        <div style={{ display: 'flex', marginBottom: '10px', marginTop: '25px', justifyContent: 'space-between' }}>
                                            <Link href={'/cart'}>
                                                <div className={style.backToCart} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fcaf17', fontWeight: '600' }}>
                                                    <LeftOutlined style={{ fontSize: '10.5px' }} /> Back to cart
                                                </div>
                                            </Link>
                                            <Form.Item>
                                                <Button style={{ borderRadius: '0 !important' }}>Submit</Button>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div >
        </>
    )
}

export default Checkout