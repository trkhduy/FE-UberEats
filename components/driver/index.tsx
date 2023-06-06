import { useRouter } from 'next/router';
import { useEffect, useRef, useState, useMemo, useContext } from 'react';
import { Alert, Button, Col, Collapse, Divider, Popconfirm, Row, Space, Spin, message } from 'antd';
import { EnvironmentOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { useLoadScript, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import GetMarker from '../marker/marker';

import Head from 'next/head';
import style from './style/home.module.scss';
import RestaurentService from '@/service/restaurantService';
import { WebsocketContext } from '@/context/WebsocketContext';
import ProductService from '@/service/productService';
import { updateOrder } from '../restaurant_owner/listOrder';

function DriverPage() {
    const { Panel } = Collapse;
    const [acpOrder, setAcpOrder] = useState(null);

    const socket = useContext(WebsocketContext);
    const productService = new ProductService();
    const [listOrder, setListOrder]: any = useState([]);
    const router = useRouter();

    useEffect(() => {
        getOrderDriver();
        socket.on('connect', () => {
            console.log('connection..');
        })
        socket.on('test', (data) => {
            console.log('connection..', data);
        })
        socket.on('GetOrderDriver', (listOrder) => {
            console.log('driver', listOrder);
            listOrder && setListOrder(listOrder);
        })
        return () => {
            console.log('Unregistering Events...');
            socket.off('connect');
            socket.off('GetOrderDriver');
        };
    }, [])
    useEffect(() => {
        if (acpOrder) {
            socket.off('GetOrderDriver');
            getDetail();
            // socket.on('getDetailOrderFindDriver', () => { })
        } else {
            socket.on('GetOrderDriver', () => {

            });
        }
        return () => {
            socket.off('connect');
            socket.off('GetOrderDriver');
        }
    }, [acpOrder]);

    const getOrderDriver = async () => {
        let [data, err] = await productService.getOrderDriver();
        if (!err) {
            console.log('dsadas', data);
            setListOrder(data);
        }
        return data;
    }

    const confirm = (e: any) => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e: any) => {
        // console.log(e);
        // message.error('Click on No');
    };
    const getDetail = async () => {
        let [data, err] = await productService.getDetailOrderDriver();
        if (!err) {
            setListOrder(data);
        }
    }


    //Google map
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const center: any = { lat: lat, lng: lng };
    Geocode.setApiKey(process.env.GOOGLE_MAPS_API_KEY || '')
    useEffect(() => {
        const getLocation = async () => {
            try {
                // Lấy vị trí hiện tại từ trình duyệt
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const { latitude, longitude }: { latitude: any, longitude: any } = position.coords;

                        // Gọi hàm reverse geocoding để lấy thông tin địa chỉ từ tọa độ
                        const response = await Geocode.fromLatLng(latitude, longitude);
                        const address = response.results[0].formatted_address;
                        setLat(latitude);
                        setLng(longitude);
                        console.log('Current address:', address);
                        console.log('Current latitude:', latitude);
                        console.log('Current longitude:', longitude);
                        // Thực hiện các xử lý khác với thông tin vị trí tại đây
                    });
                } else {
                    console.error('Geolocation is not supported by this browser.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getLocation();
    }, []);

    const [map, setMap]: any = useState(/** @type google.maps.Map */ null);

    /** @type  React.MutableRefObject<HTMLInputElement> */
    const originRef: any = useRef();
    /** @type  React.MutableRefObject<HTMLInputElement> */
    const destinationRef: any = useRef();

    const libraries = useMemo(() => ['places'], []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as any,
    });


    if (!isLoaded) {
        return <p>Loading...</p>;
    }
    // end map


    const Header = (code: any, price: any) => (
        <Row align={"middle"} justify={"space-between"} style={{ width: "100%" }}>
            <Col><h3 style={{ margin: "0" }}>{code}</h3></Col>
            <Col><h3 style={{ margin: "0", color: "#59CE8F" }}>${price}</h3></Col>
        </Row>
    )
    const InforOrderer = (data: any) => {
        return (
            <>
                <div className={style.info}>
                    <h3><EnvironmentOutlined />{data.name_address}</h3>
                    <p>Name: <span>{data.name}</span></p>
                    <p>Phone: <span>{data.phone}</span></p>
                    <p>Note: <span>{data.note}</span></p>
                </div>
            </>
        )
    }
    const InforRestaurant = (data: any) => {
        return (
            <>
                <div className={style.info} style={{ backgroundColor: "#e9e9e9" }}>
                    <h3><EnvironmentOutlined />{data.address}</h3>
                    <p>Name: <span>{data.name}</span></p>
                    <p>Phone: <span>{data.phone}</span></p>
                    <p>Note: <span>....</span></p>
                </div>
            </>
        )
    }
    const handleAccept = async (dataO: any) => {
        const dataUpdate = {
            clientid: dataO.user.id,
            restaurantid: dataO.restaurant.id,
            // driverid: dataO.restaurant.id,
            statusid: 4
        }
        let [data, err] = await productService.updateOrder(dataUpdate, dataO.id);
        if (!err) {
            router.push('/driver/shipping');
            message.success("Accept Done~!");
        }
    }
    const getPrice = (data: any) => {

        let subPrice = data.order_detail.reduce((total: number, item: any) => {

            return total + item.product.sale_price ? (item.product.sale_price * item.quantity) : (item.product.price * item.quantity);
        }, 0)
        if (data.voucher) {
            subPrice = subPrice * ((100 - data.voucher.discount) / 100);
        }
        return subPrice.toFixed(2);
    }

    return (
        <>
            <Head>
                <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />
            </Head>
            <div className={style.driver}>
                <Row justify={"center"}>
                    <Col md={12} sm={24} span={24}>
                        <div className={style.map} style={{ width: "100%", maxWidth: "1440px", aspectRatio: acpOrder && (window.innerWidth <= 768) ? '9/16' : '16/9' }} >
                            <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}
                                options={{
                                    zoomControl: false,
                                    streetViewControl: false,
                                    fullscreenControl: false
                                }}
                                onLoad={(map: any) => setMap(map)}
                            >
                                {listOrder && listOrder.map((e: any, i: number) => (
                                    <GetMarker address={e.restaurant.restaurant.address} center={center} key={i} />
                                ))}
                            </GoogleMap>
                            <span onClick={() => map.panTo(center)} className={style.backTo}>
                                <img src="https://cdn-icons-png.flaticon.com/512/1161/1161225.png" alt="" />
                            </span>
                        </div>
                        {acpOrder && < div >
                            <Button style={{ width: "100%", margin: "10px 0", backgroundColor: false ? "greenyellow" : 'none', color: "#000" }} type='primary' disabled={true} >Order Successfuly</Button>
                        </div>}
                        <div style={{ display: 'none' }}>
                            <Autocomplete>
                                <input type="text" placeholder='origin' value={'sài đồng'} ref={originRef} />
                            </Autocomplete>
                            <Autocomplete>
                                <input type="text" placeholder='destination' value={'hoàn kiếm'} ref={destinationRef} />
                            </Autocomplete>
                        </div>
                    </Col>
                    <Col md={!acpOrder ? 12 : 24} sm={24} span={24} >
                        <div className={style.listOrder}>
                            {!acpOrder && <h2>List Order</h2>}
                            <div className={style.list}>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    {listOrder.map((item: any) => (
                                        <Collapse className={style.coll} collapsible="header" style={{ width: "100%" }}  >
                                            <Panel header={Header('#' + item.id, getPrice(item))} key={item.id}  >
                                                <div className={style.item}>
                                                    <Divider orientation="left">Orderer</Divider>
                                                    {InforOrderer(item.user_address)}
                                                    <Divider style={{ marginTop: '40px' }} orientation="left">Restaurant</Divider>
                                                    {InforRestaurant({ name: item.restaurant.name, address: item.restaurant.restaurant.address, phone: item.restaurant.phone })}
                                                    {item.order_detail.map((listProduct: any) => (
                                                        <div className={style.item}>
                                                            <Divider />

                                                            <Row>
                                                                <Col flex={'auto'}>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <div className={style.img}>
                                                                            <img src={listProduct.product.images} alt="coca" width={100} />
                                                                        </div>
                                                                        <div>
                                                                            <div className={style.name}>{listProduct.product.name}</div>
                                                                            {listProduct.product.sale_price ? (
                                                                                <div className={style.price}>
                                                                                    <span className={style.sale}>${listProduct.product.price}</span>
                                                                                    ${listProduct.product.sale_price}
                                                                                </div>
                                                                            ) : (
                                                                                <div className={style.price} style={{ color: "yellowgreen" }}>
                                                                                    ${listProduct.product.price}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    ))}
                                                    <Divider />
                                                </div>
                                                <div className={style.btn}>
                                                    {!acpOrder && <Button type="primary" style={{ backgroundColor: "#ABC270", marginLeft: "12px" }} onClick={() => handleAccept(item)} >Accept</Button>}
                                                </div>
                                            </Panel>
                                        </Collapse>
                                    ))}
                                </Space>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default DriverPage;

