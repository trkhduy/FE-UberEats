import { Col, Drawer, DrawerProps, RadioChangeEvent, Row, Select } from 'antd'
import React, { useState } from 'react'
import style from '../styles/layout/Header.module.scss'
import Link from 'next/link'
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { BarsOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
const Header = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    return (
        <>
            <div className={style.nav_container}>
                <div className={style.nav}>
                    <Row justify="space-between" align="middle">
                        <Col flex={"141px"} className={style.nav_mobile} >
                            <Row align="middle" justify={"space-between"}>
                                <Col>
                                    <Row>
                                        <Col className={style.bars_mobile}>
                                            <BarsOutlined onClick={showDrawer} style={{ fontSize: '24px', color: '#fff', marginRight: '20px' }} />
                                        </Col>
                                        <Col>
                                            <div>
                                                <Link href="/">
                                                    <span className={style.logo}>Uber <span style={{ color: "#FFD95A" }}>Eats</span></span>
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className={style.login_mobile}>
                                    <Row align="middle" >
                                        <Col>
                                            <Link href={''}>
                                                <div style={{ background: '#fff', borderRadius: '25px', width: '30px', height: "25px", textAlign: 'center', marginRight: '5px' }}>
                                                    <UserOutlined style={{ lineHeight: '25px', color: '#4D3C3C' }} />
                                                </div>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <div style={{ background: '#FFD95A', borderRadius: '25px', padding: '3px 10px', height: "25px", textAlign: 'center' }}>
                                                <Link href={''}>
                                                    <span style={{ lineHeight: '25px', color: '#4D3C3C', fontWeight: '500' }}>Sign up</span>
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col className={style.menu} flex="auto" >
                            <Row align="middle" justify={'end'}>
                                <Col>
                                    <ul className={style.menuOptions}>
                                        <li className={clsx([style.option])}><Link href={''}>Restaurant</Link></li>
                                        <li className={style.option}><Link href={''}>Food</Link></li>
                                        <li className={style.option}><Link href={''}>Voucher</Link></li>
                                        <li className={style.headerForm}>
                                            <div className={style.iconLocation}>
                                                <EnvironmentOutlined />
                                            </div>
                                            <Select
                                                className={style.selectForm}
                                                defaultValue="lucy"
                                                style={{ width: 200 }}
                                                onChange={handleChange}
                                                options={[
                                                    { value: 'jack', label: 'Jack' },
                                                    { value: 'lucy', label: 'Lucy' },
                                                    { value: 'Yiminghe', label: 'yiminghe' },
                                                ]}
                                            />
                                        </li>
                                    </ul>
                                </Col>
                                <Col>
                                    <Row>
                                        <Link href={'/user/login'}>
                                            <div className={style.login}>
                                                <span>Login</span>
                                            </div>
                                        </Link>
                                        <Link href={'/user/register'}>
                                            <div className={style.login}>
                                                <span>Register</span>
                                            </div>
                                        </Link>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </div>
            </div >



            <Drawer
                title="Uber Eats"
                placement={placement}
                closable={true}
                onClose={onClose}
                open={open}
                key={placement}
            >
                <ul style={{ listStyle: "none", padding: '0' }}>
                    <li style={{ padding: '13px 5px', borderBottom: '1px solid #d8d8d8' }}>
                        <Link href={''} style={{ fontSize: '22px', fontWeight: '600', color: '#000' }} >
                            Restaurant
                        </Link>
                    </li>
                    <li style={{ padding: '13px 5px', borderBottom: '1px solid #d8d8d8' }}>
                        <Link href={''} style={{ fontSize: '22px', fontWeight: '600', color: '#000' }}>
                            Food
                        </Link>
                    </li>
                    <li style={{ padding: '13px 5px', borderBottom: '1px solid #d8d8d8' }}>
                        <Link href={''} style={{ fontSize: '22px', fontWeight: '600', color: '#000' }}>
                            Voucher
                        </Link>
                    </li >
                    <li style={{ padding: '13px 5px', marginTop: '20px' }}>
                        <Row align={'middle'}>
                            <Col>
                                <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '15px' }} />
                            </Col>
                            <Col>
                                <Select
                                    className={style.selectForm}
                                    defaultValue="lucy"
                                    style={{ width: 200 }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        { value: 'Yiminghe', label: 'yiminghe' },
                                    ]}
                                />
                            </Col>
                        </Row>
                    </li>
                    <li style={{ padding: '13px 5px', marginTop: '25px' }}>
                        <Link href={'/user/register'} style={{ padding: '13px 40px', background: '#000', color: '#fff', fontSize: '17px', fontWeight: '600', borderRadius: '5px' }}>
                            Sign up
                        </Link>
                    </li>
                    <li style={{ padding: '13px 5px', marginTop: '25px' }}>
                        <Link href={'/user/login'} style={{ padding: '13px 40px', background: '#e9e9e9', color: '#000', fontSize: '17px', fontWeight: '600', borderRadius: '5px' }}>
                            Log in
                        </Link>
                    </li>
                </ul>
            </Drawer>
        </>


    )
}

export default Header