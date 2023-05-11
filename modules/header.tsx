import { Col, Row, Select } from 'antd'
import React, { useState } from 'react'
import style from '../styles/layout/Header.module.scss'
import Link from 'next/link'
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { EnvironmentOutlined } from '@ant-design/icons';
const Header = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className={style.nav_container}>
                <div className={style.nav}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <div>
                                <Link href="/">
                                    <span className={style.logo}>Uber <span style={{ color: "#FFD95A" }}>Eats</span></span>
                                </Link>
                            </div>
                        </Col>
                        <Col>
                            <Row align="middle">
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
                                        <div className={style.login}>
                                            <Link href={'/user/login'}>
                                                <span>Login</span>
                                            </Link>
                                        </div>
                                        <div className={style.login}>
                                            <Link href={'/user/register'}>
                                                <span>Register</span>
                                            </Link>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div >
        </>


    )
}

export default Header