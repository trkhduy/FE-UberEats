import React from 'react'
import style from '../styles/layout/Footer.module.scss'
import { Col, Row } from 'antd'
import Link from 'next/link'
import { FacebookFilled, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'
const Footer = () => {
    return (
        <>
            <footer className={style.footer}>
                <div className={style.container}>
                    <Row>
                        <Col xl={12} md={24}>
                            <div className={style.footer_widget}>
                                <div className={style.logo} >
                                    <div >
                                        <Link href="/">
                                            <span className={style.logo}>Uber <span style={{ color: "#FFD95A" }}>Eats</span></span>
                                        </Link>
                                    </div>
                                </div>
                                <div className={style.dowloadApp}>
                                    <Link href="https://apps.apple.com/us/app/uber-eats-food-delivery/id1058959277" target='_blank'>
                                        <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/783bb4a82e5be29e.svg"
                                            height={'40px'} width={'135px'} alt="" />
                                    </Link>
                                    <Link href="https://play.google.com/store/apps/details?id=com.ubercab.eats&pli=1" target='_blank'>
                                        <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/163bdc9b0f1e7c9e.png"
                                            height={'40px'} width={'134px'} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xl={6} md={24}>
                            <ul>
                                <li>
                                    <Link href={''}>
                                        Get Help
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        Buy gift cards
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        Add your restaurant
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        Sign up to deliver
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        Promotions
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col xl={6} md={24}>
                            <ul>
                                <li>
                                    <Link href={''}>
                                        Restaurant near me
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        View all cities
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        View all countries
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        Pickup near me
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        About Uber Eats
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <div className={style.moreInfoFooter}>
                        <Row>
                            <Col xl={12} md={24}>
                                <Row>
                                    <Col className={style.iconMedia}>
                                        <Link href={''}>
                                            <FacebookFilled />
                                        </Link>
                                    </Col>
                                    <Col className={style.iconMedia}>
                                        <Link href={''}>
                                            <TwitterOutlined />
                                        </Link>
                                    </Col>
                                    <Col className={style.iconMedia}>
                                        <Link href={''}>
                                            <InstagramOutlined />
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={12} md={24}>
                                <Row align={'middle'} justify={'end'} className={style.policy}>
                                    <Col>
                                        <Link href={''}>Privacy Policy</Link>
                                    </Col>
                                    <Col>
                                        <Link href={''}>Terms</Link>
                                    </Col>
                                    <Col>
                                        <Link href={''}>Pricing</Link>
                                    </Col>
                                    <Col>
                                        <Link href={''}>Do not sell or share my personal information</Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }} className={style.footerInfor}>
                            <Col xl={8} className={style.left_footer}></Col>
                            <Col xl={16} md={24}>
                                <Row align={'middle'} justify={'end'} className={style.content_footer}>
                                    <Col>
                                        <span style={{ fontSize: '15px', marginRight: '25px' }}>
                                            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                                        </span>
                                    </Col>
                                    <Col>
                                        <span>
                                            © 2023 Uber Technologies Inc.
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer