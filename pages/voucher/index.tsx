import React, { useEffect, useState } from 'react'
import style from './style/voucher.module.scss'
import { Col, Input, Row, Select } from 'antd'
import Search from 'antd/es/transfer/search'
import { HomeOutlined } from '@ant-design/icons'
import BtnCopy from '@/components/btncopy'
const Voucher = () => {
    const { Search } = Input;
    const onSearch = (value: string) => console.log(value);
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleChange1 = (value: string) => {
        console.log(`selected ${value}`);
    };

    // useWindow
    const [width, setWidth] = useState(0)

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
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
                                                defaultValue="Restaurant"
                                                onChange={handleChange}
                                                options={[
                                                    { value: 'jack', label: 'Jack' },
                                                    { value: '', label: 'Restaurant' },
                                                    { value: 'lucy', label: 'Lucy' },
                                                    { value: 'Yiminghe', label: 'yiminghe' },
                                                    { value: 'disabled', label: 'Disabled' },
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
                                            { value: 'jack', label: 'Jack' },
                                            { value: 'lucy', label: 'Lucy' },
                                            { value: 'Yiminghe', label: 'yiminghe' },
                                            { value: 'disabled', label: 'Disabled' },
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
                                <Col xl={4} md={6} sm={12} xs={width <= 425 ? 24 : 12} style={{ padding: '15px' }}>
                                    <div className={style.card_item}>
                                        <div className={style.img_item}>
                                            <img src="https://down-vn.img.susercontent.com/file/vn-11134201-23030-nkah04hyymovaf_tn" alt="" />
                                        </div>
                                        <div className={style.content_item}>
                                            <p style={{ fontSize: '16px', margin: '15px 0 7px 0', fontWeight: '600' }}>Gói voucher Extra</p>
                                            <span >Availabe: </span><span style={{ color: 'gray', fontWeight: '600' }}>1000</span>
                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '7px' }}>
                                                <HomeOutlined style={{ fontSize: '16px', marginRight: '10px' }} />
                                                <span style={{ fontWeight: '600', fontSize: "16px" }}>restaurant's name</span>
                                            </div>
                                            <div style={{ padding: "10px 10px" }}>
                                                <BtnCopy value={'123'} />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Voucher