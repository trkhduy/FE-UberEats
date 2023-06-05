import React, { useEffect, useState } from 'react'
import style from './style/voucher.module.scss'
import { Col, Empty, Input, Row, Select } from 'antd'
import Search from 'antd/es/transfer/search'
import { HomeOutlined } from '@ant-design/icons'
import BtnCopy from '@/components/btncopy'
import ClientService from '@/service/clientService'
import { useRouter } from 'next/router';
const Voucher = () => {
    const router = useRouter()
    const clientService = new ClientService;
    const { Search } = Input;
    const [keyword, setKeyWord]: any = useState({});
    const [res, setRes] = useState([]);
    const onSearch = (value: string) => {
        setKeyWord((data: any) => {
            return {
                ...data,
                name: value
            }
        })
    };

    const getRestaurant = async () => {
        let [res, err] = await clientService.getRestaurant();
        if (res) {
            setRes(res);
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
    const handleChange = (value: string) => {
        setKeyWord((data: any) => {
            return {
                ...data,
                userid: value
            }
        })
    };
    const handleChange1 = (value: string) => {
        setKeyWord((data: any) => {
            return {
                ...data,
                sortBy: value
            }
        })
    };
    const [voucher, setVoucher] = useState([]);
    const getAllVoucher = async () => {
        const data = queryString(keyword)
        let [voucher, err] = await clientService.getAllVocher(data);
        if (voucher) {
            setVoucher(voucher)
        }
        if (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        router.replace({
            query: keyword,
        });
        getAllVoucher()
    }, [keyword]);
    // useWindow
    const [width, setWidth] = useState(0)

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        getAllVoucher();
        getRestaurant();
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    return (
        <>
            <div className={style.main_voucher}>
                <div className={style.banner}>
                    <div className={style.title_page}>
                        <h2>List voucher</h2>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.voucher_content}>
                        <div className={style.filter_content}>
                            <Row align={'middle'} justify={'space-between'}>
                                <Col xl={14} md={16} sm={16} xs={24}>
                                    <Row align={'middle'}>
                                        <Col xl={10} md={12} sm={12} xs={24}>
                                            <Search placeholder="Search voucher" allowClear onSearch={onSearch} className={style.inputSearch} style={{ width: '100%', maxWidth: '576px', borderRadius: '0' }} />
                                        </Col>
                                        <Col xl={12} md={8} sm={12} xs={24}>
                                            <Select
                                                className={style.filterBy}
                                                defaultValue=""
                                                onChange={handleChange}
                                                options={[
                                                    { value: '', label: 'Restaurant' },
                                                    ...res.map((item: any, i) => {
                                                        return { value: item.id, label: item.name }
                                                    })
                                                ]}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={10} md={8} sm={8} xs={24} className={style.sort}>
                                    <Select
                                        className={style.sortBy}
                                        defaultValue="SortBy"
                                        onChange={handleChange1}
                                        options={[
                                            { value: '', label: 'SortBy' },
                                            { value: 'DESC', label: 'Decreasing' },
                                            { value: 'ASC', label: 'Ascending' },
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className={style.voucher_items}>
                        <div className={style.voucher_item}>
                            <h3>Quantity(3)</h3>
                            <Row >
                                {voucher && voucher.length > 0 ? voucher.map((item: any, i) => {
                                    return (
                                        <Col key={i} xl={4} md={6} sm={12} xs={width <= 425 ? 24 : 12} style={{ padding: '15px' }}>
                                            <div className={style.card_item}>
                                                <div className={style.img_item}>
                                                    <img src={item.images} alt="" />
                                                </div>
                                                <div className={style.content_item}>
                                                    <p style={{ fontSize: '16px', margin: '15px 0 7px 0', fontWeight: '600' }}>{item.name}</p>
                                                    <div>
                                                        <span>Discount: </span><span style={{ color: 'gray', fontWeight: '600' }}>{item.discount}%</span>
                                                    </div>
                                                    <span >Availabe: </span><span style={{ color: 'gray', fontWeight: '600' }}>{item.quantity}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '7px' }}>
                                                        <HomeOutlined style={{ fontSize: '16px', marginRight: '10px' }} />
                                                        <span style={{ fontWeight: '600', fontSize: "16px" }}>{item.user.name}</span>
                                                    </div>
                                                    <div style={{ padding: "10px 10px" }}>
                                                        <BtnCopy value={item.code} />
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Voucher