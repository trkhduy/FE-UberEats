import React, { useEffect, useState } from 'react'
import style from './style/shop.module.scss'
import { Button, Col, Empty, Form, Input, Radio, RadioChangeEvent, Row, Space } from 'antd';
import { ClockCircleFilled, RightOutlined, ShoppingCartOutlined, SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import ClientService from '@/service/clientService';



const Index = () => {
    const clientService = new ClientService;
    const { Search } = Input;
    const [keyword, setKeyWord]: any = useState({});
    const onSearch = (value: string) => {
        setKeyWord((data: any) => {
            return {
                ...data,
                name: value
            }
        })
    };
    const [collapse, setCollapse] = useState(false);
    const [collapse2, setCollapse2] = useState(false);
    const [collapse3, setCollapse3] = useState(false);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const getCategory = async () => {
        const [cate, err]: any = await clientService.getCategory();
        if (cate) {
            setCategory(cate);
        }
        if (err) {
            console.log(err);
        }
    }
    const getProduct = async () => {
        const data = queryString(keyword);
        const [pro, err]: any = await clientService.getAllPro(data);
        if (pro) {
            setProduct(pro);
        }
        if (err) {
            console.log(err);
        }
    }
    const queryString = (data: any) => {
        return Object.entries(data)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setKeyWord((data: any) => {
            return { ...data, ...values }
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [value, setValue] = useState();

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setKeyWord((data: any) => {
            return { ...data, categoryid: e.target.value }
        })
        setValue(e.target.value);
    }

    const [width, setWidth] = useState(0)

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        getProduct()
    }, [keyword]);

    useEffect(() => {
        getCategory()

        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return (
        <>
            <div className={style.main_shop}>
                <div className={style.banner}>
                    <div className={style.title_page}>
                        <h2>List product</h2>
                    </div>
                </div>
                <div className={style.content_shop}>
                    <Row>
                        <Col xl={6} md={24} sm={24} xs={24}>
                            <div className={style.filter}>
                                <div className={style.title_filter}>
                                    <div>
                                        <h3 style={{ fontSize: '24px', letterSpacing: '1.2px', margin: '0' }}>Filters</h3>
                                        <div>
                                            <span style={{ display: "inline-block", width: "45px", height: "3px", backgroundColor: "#FFD95A" }} ></span>
                                            <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                                            <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                                            <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                                        </div>
                                    </div>
                                    <div className={style.refresh}>
                                        <SyncOutlined style={{ fontSize: '16px', color: '#FFD95A' }} />
                                        <span>Refresh</span>
                                    </div>
                                </div>
                                <div className={style.filter_area}>
                                    <div className={style.search}>
                                        <div className={style.title_search} onClick={() => setCollapse((aa) => !aa)}>
                                            <span>Food Search</span>
                                            <RightOutlined style={{ fontSize: '12px', transition: "0.3s", transform: collapse ? "rotate(90deg)" : 'rotate(0)' }} />
                                        </div>
                                        {collapse && <Search placeholder="search product" allowClear onSearch={onSearch} className={style.inputSearch} style={{ width: '100%', borderRadius: '0' }} />}
                                    </div>
                                </div>

                                <Form
                                    name="basic"
                                    style={{ maxWidth: '100%' }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <div className={style.filter_area}>
                                        <div className={style.search}>
                                            <div className={style.title_search} onClick={() => setCollapse2((aa) => !aa)}>
                                                <span>Food By Price</span>
                                                <RightOutlined style={{ fontSize: '12px', transition: "0.3s", transform: collapse2 ? "rotate(90deg)" : 'rotate(0)' }} />
                                            </div>
                                            {collapse2 &&
                                                <div>
                                                    <Row gutter={[10, 0]} style={{ marginTop: '20px' }}>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                name="minPrice"
                                                            >
                                                                <Input placeholder='Min price' />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                name="maxPrice"
                                                            >
                                                                <Input placeholder='Max price' />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <Form.Item style={{ textAlign: 'end' }}>
                                                        <Button type="default" htmlType="submit" style={{ borderRadius: "0" }}>
                                                            Submit
                                                        </Button>
                                                    </Form.Item>
                                                </div>

                                            }
                                        </div>
                                    </div>

                                    <div className={style.filter_area}>
                                        <div className={style.search}>
                                            <div className={style.title_search} onClick={() => setCollapse3((aa) => !aa)}>
                                                <span>Food By Categories</span>
                                                <RightOutlined style={{ fontSize: '12px', transition: "0.3s", transform: collapse3 ? "rotate(90deg)" : 'rotate(0)' }} />
                                            </div>
                                            {collapse3 &&
                                                <Radio.Group onChange={onChange} value={value}>
                                                    <Space direction="vertical">
                                                        {category && category.length > 0 ? category.map((e: any, i) => {
                                                            return (
                                                                <>
                                                                    <Radio key={i} value={e.id}>{e.name}</Radio>
                                                                </>
                                                            )
                                                        })
                                                            : <></>
                                                        }

                                                    </Space>
                                                </Radio.Group>
                                            }
                                        </div>
                                    </div>


                                </Form>


                            </div>
                        </Col>
                        <Col xl={18} md={24} sm={24} xs={24}>
                            <div className={style.item_top_res}>
                                <div className={style.quantity_res} style={{ padding: '0 10px', marginBottom: '25px' }}>
                                    <h3 style={{ fontSize: '28px', letterSpacing: '1px', margin: '0' }}>3+ Restaurants</h3>
                                    <div>
                                        <span style={{ display: "inline-block", width: "45px", height: "3px", backgroundColor: "#FFD95A" }} ></span>
                                        <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                                        <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                                        <span style={{ display: "inline-block", width: "2px", height: "3px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                                    </div>
                                </div>
                                <Row>
                                    {product && product.length > 0 ? product.map((e: any, i) => {
                                        return (
                                            < Col key={i} className={style.item} xl={8} md={width >= 992 ? 8 : 12} sm={12} xs={24} style={{ padding: "0 10px", marginBottom: "35px" }}>
                                                <div className={style.card_item}>
                                                    <div className={style.img_item}>
                                                        <Link href={`/food/${e.id}`} style={{ textDecoration: 'none' }}>
                                                            <img src={e.images} alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className={style.content_item}>
                                                        <Link href={`/food/${e.id}`} style={{ textDecoration: 'none' }}>
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
                                                                <Link href={'/cart'} style={{ textDecoration: 'none', color: '#4D3C3C' }}>
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
                                        : <Empty style={{ margin: '0 auto' }} />
                                    }
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div >
        </>
    )
}

export default Index