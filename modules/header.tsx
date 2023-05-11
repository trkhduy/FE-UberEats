import { Col, Row } from 'antd'
import React from 'react'
import style from '../styles/layout/Header.module.scss'
const Header = () => {
    return (
        <>
            <div className={style.nav_container}>
                <div className={style.nav}>
                    <Row>
                        <Col>
                            <div>
                                <span className={style.logo}>Uber Eats</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>


    )
}

export default Header