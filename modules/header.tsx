import { Avatar, Badge, Col, Drawer, DrawerProps, RadioChangeEvent, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import style from '../styles/layout/Header.module.scss'
import Link from 'next/link'
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AlertOutlined, BarsOutlined, EnvironmentOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import useToken from '@/pages/hook/useToken';
import UserService from '@/service/userService';
import ClientService from '@/service/clientService';
import { fetchCartCount, selectCartCount } from '@/redux/reducer/cartReducer';
import CartService from '@/service/cartService';

// import { updateCart } from '@/redux/reducer/cartReducer';
const Header = () => {
    const router = useRouter();
    const cartCount = useSelector(selectCartCount);
    const [lengthCart, setLengthCart] = useState(0);
    const dispatch = useDispatch();
    const [top, setTop] = useState(0)
    const cartService = new CartService
    const userService = new UserService;
    const clientService = new ClientService;
    const [role, setRole] = useState();
    const [userInfo, setUserInfo]: any = useState({});

    const getUser = async () => {
        const [user, err] = await clientService.getInfo();
        if (user) {
            setUserInfo(user);
        }
        if (err) {
            console.log(err);
        }
    }
    const getLeghthCart = async () => {
        let [data, err] = await cartService.getAllCart()
        if (!err) {
            setLengthCart(data.length)
        }
    }

    useEffect(() => {

        // Dispatch thunk để lấy giá trị số lượng giỏ hàng ban đầu
        dispatch(fetchCartCount());
    }, [dispatch]);
    useEffect(() => {
        setRole(useToken());
    }, [router])

    useEffect(() => {
        window.addEventListener('scroll', () => setTop(window.scrollY))
        getUser();
        getLeghthCart()
        return window.removeEventListener('scroll', () => window.scrollY)
        console.log('cartC', cartCount);

    }, [])
    useEffect(() => {
        setLengthCart(cartCount)
    }, [cartCount])
    const logOut = async () => {
        await userService.logOut()
        router.push('/user/login')
    }

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const linkHeader = (): string => {
        if (!role) {
            return '/user/login'
        }
        if (role == 1) {
            return '/'
        } else if (role == 2) {
            return '/driver'
        }
        return '/restaurantowner'

    }
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const [collapse, setCollapse] = useState(false);

    return (
        <>
            <div className={style.nav_container} style={{ position: 'fixed', zIndex: "1000", width: "100%", top: -2 }}>
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
                                                <Link href={linkHeader()}>
                                                    <span className={style.logo}>Uber <span style={{ color: "#FFD95A" }}>Eats</span></span>
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className={style.login_mobile}>
                                    {!role &&
                                        <Row align="middle" >
                                            <Col>
                                                <Link href={'/user/login'}>
                                                    <div style={{ background: '#fff', borderRadius: '25px', width: '30px', height: "25px", textAlign: 'center', marginRight: '5px' }}>
                                                        <UserOutlined style={{ lineHeight: '25px', color: '#4D3C3C' }} />
                                                    </div>
                                                </Link>
                                            </Col>
                                            <Col>
                                                <div style={{ background: '#FFD95A', borderRadius: '25px', padding: '3px 10px', textAlign: 'center' }}>
                                                    <Link href={'/user/register'}>
                                                        <span style={{ color: '#4D3C3C', fontWeight: '500', margin: '0' }}>Sign up</span>
                                                    </Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    }
                                    {role && <div className={style.logged}  >
                                        <Row align={'middle'}>
                                            <Col style={{ marginRight: '20px' }}>
                                                {role == 1 &&
                                                    <Link href={'/cart'}>
                                                        <Badge count={Number(cartCount)} style={{ background: '#FFD95A', color: '#4D3C3C', fontWeight: "700" }}>
                                                            <img src={"https://cdn-icons-png.flaticon.com/512/7646/7646966.png"} alt="" style={{ width: '3 0px', height: '30px' }} />
                                                        </Badge>
                                                    </Link>
                                                }
                                            </Col>
                                            <Col>
                                                <div onClick={() => setCollapse((aa) => !aa)} style={{ cursor: 'pointer' }}>
                                                    <Avatar src={userInfo.avatar} style={{ width: '40px', height: '40px' }} />
                                                </div>
                                                {collapse &&
                                                    <div className={style.feat}>
                                                        <div className={style.btn}>
                                                            <Link href={'/user/profile'}>
                                                                <span>Profile</span>
                                                                <span className={style.logOut}>
                                                                    <UserOutlined />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <div className={style.btn}>
                                                            {role == 1 &&
                                                                <Link href={'/listOrder'}>
                                                                    <span>List Order</span>
                                                                    <span className={style.logOut} >
                                                                        <AlertOutlined />
                                                                    </span>
                                                                </Link>
                                                            }
                                                        </div>
                                                        <div className={style.btn} onClick={logOut}>
                                                            <a>
                                                                <span>Logout</span>
                                                                <span className={style.logOut} >
                                                                    <LogoutOutlined />
                                                                </span>
                                                            </a>
                                                        </div>


                                                    </div>
                                                }
                                            </Col>
                                        </Row>

                                    </div>}
                                </Col>
                            </Row>
                        </Col>
                        <Col className={style.menu} flex="auto" >
                            <Row align="middle" justify={'end'}>
                                {role == 1 &&
                                    <Col>
                                        <ul className={style.menuOptions}>
                                            <li className={clsx([style.option])}><Link href={''}>Restaurant</Link></li>
                                            <li className={style.option}><Link href={'/food'}>Food</Link></li>
                                            <li className={style.option}><Link href={'/voucher'}>Voucher</Link></li>
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
                                }
                                <Col>
                                    {!role && <div>
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
                                    </div>}


                                    {role && <div className={style.logged}  >
                                        <Row align={'middle'}>
                                            <Col style={{ marginRight: '20px' }}>
                                                {role == 1 && <Link href={'/cart'}>
                                                    <Badge count={Number(lengthCart)} style={{ background: '#FFD95A', color: '#4D3C3C', fontWeight: "700" }}>
                                                        <img src="https://cdn-icons-png.flaticon.com/512/7646/7646966.png" alt="" style={{ width: '3 0px', height: '30px' }} />
                                                    </Badge>
                                                </Link>}
                                            </Col>
                                            <Col>
                                                <div onClick={() => setCollapse((aa) => !aa)} style={{ cursor: 'pointer' }}>
                                                    <Avatar src={userInfo.avatar} style={{ width: '40px', height: '40px' }} />
                                                </div>
                                                {collapse &&
                                                    <div className={style.feat}>
                                                        <div className={style.btn}>
                                                            <Link href={'/user/profile'}>
                                                                <span>Profile</span>
                                                                <span className={style.logOut}>
                                                                    <UserOutlined />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <div className={style.btn}>
                                                            {role == 1 &&
                                                                <Link href={'/listOrder'}>
                                                                    <span>List Order</span>
                                                                    <span className={style.logOut} >
                                                                        <AlertOutlined />
                                                                    </span>
                                                                </Link>
                                                            }
                                                        </div>
                                                        <div className={style.btn} onClick={logOut}>
                                                            <a>
                                                                <span>Logout</span>
                                                                <span className={style.logOut} >
                                                                    <LogoutOutlined />
                                                                </span>
                                                            </a>
                                                        </div>

                                                    </div>
                                                }
                                            </Col>
                                        </Row>

                                    </div>}

                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </div >
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
                        <Link href={'/food'} style={{ fontSize: '22px', fontWeight: '600', color: '#000' }}>
                            Food
                        </Link>
                    </li>
                    <li style={{ padding: '13px 5px', borderBottom: '1px solid #d8d8d8' }}>
                        <Link href={'/voucher'} style={{ fontSize: '22px', fontWeight: '600', color: '#000' }}>
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
                    {!role &&
                        <li style={{ padding: '13px 5px', marginTop: '25px' }}>
                            <Link href={'/user/register'} style={{ padding: '13px 40px', background: '#000', color: '#fff', fontSize: '17px', fontWeight: '600', borderRadius: '5px' }}>
                                Sign up
                            </Link>
                        </li>
                    }
                    {!role &&
                        <li style={{ padding: '13px 5px', marginTop: '25px' }}>
                            <Link href={'/user/login'} style={{ padding: '13px 40px', background: '#e9e9e9', color: '#000', fontSize: '17px', fontWeight: '600', borderRadius: '5px' }}>
                                Log in
                            </Link>
                        </li>
                    }
                </ul>
            </Drawer>
        </>


    )
}

export default Header