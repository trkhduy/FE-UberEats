
import Head from 'next/head';
import style from './style/home.module.scss';

import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useRef, useState, useMemo } from 'react';
import { Alert, Button, Col, Collapse, Divider, Popconfirm, Row, Space, Spin, message } from 'antd';
import { EnvironmentOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { useLoadScript, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

const center = { lat: 21.0348, lng: 105.9127 };
function DriverPage() {
    const { Panel } = Collapse;
    const [acpOrder, setAcpOrder]: any = useState(null);

    //Google map
    const [map, setMap]: any = useState(/** @type google.maps.Map */ null);
    const [direction, setDirection] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

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
    const calculateRoute = async () => {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }
        const directionService = new google.maps.DirectionsService();
        const results: any = await directionService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirection(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text)
    }
    const clearRoute = async () => {
        setDirection(null);
        setDistance('');
        setDuration('');
        originRef.current.value = '';
        destinationRef.current.value = '';
        calculateRoute()
    }

    const Header = (code: string, price: number) => (
        <Row align={"middle"} justify={"space-between"} style={{ width: "100%" }}>
            <Col><h3 style={{ margin: "0" }}>{code}</h3></Col>
            <Col><h3 style={{ margin: "0", color: "#59CE8F" }}>${price}</h3></Col>
        </Row>
    )
    const InforOrderer = (data: { name: string, address: string, note: string, phone: string }) => {
        return (
            <>
                <div className={style.info}>
                    <h3><EnvironmentOutlined /> {data.address}</h3>
                    <p>Name: <span>{data.name}</span></p>
                    <p>Phone: <span>{data.phone}</span></p>

                </div>
            </>
        )
    }
    const InforRestaurant = (data: { name: string, address: string, phone: string }) => {
        return (
            <>
                <div className={style.info} style={{ backgroundColor: "#e9e9e9" }}>
                    <h3><EnvironmentOutlined /> Main Boulevard, , Lahore, Punjab, Pakistan - 54000</h3>
                    <p>Name: <span>Sơn</span></p>
                    <p>Phone: <span>0987654321</span></p>
                    <p>Note: <span>Hà nội</span></p>
                </div>
            </>
        )
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
                                onLoad={(map) => setMap(map)}
                            >
                                <Marker position={center} />
                                {direction && <DirectionsRenderer directions={direction} />}
                            </GoogleMap>
                            <span onClick={() => map.panTo(center)} className={style.backTo}>
                                <img src="https://cdn-icons-png.flaticon.com/512/1161/1161225.png" alt="" />
                            </span>
                            {direction &&
                                <div className={style.infoRoute}>
                                    <span style={{ marginRight: '10px' }}><b>Distance: </b>{distance}</span>
                                    <span><b>Duration: </b>{duration}</span>
                                </div>
                            }
                        </div>
                        {acpOrder && < div >
                            <Button style={{ width: "100%", margin: "10px 0", backgroundColor: false ? "greenyellow" : 'none' }} type='primary' disabled={true} >Order Successfuly</Button>
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
                                    <Collapse className={style.coll} collapsible="header" style={{ width: "100%" }}  >
                                        <Panel header={Header('#1234', 1234)} key="1"  >
                                            <div className={style.item}>
                                                <Divider orientation="left">Orderer</Divider>
                                                {InforOrderer({ name: 'Thằng Sơn', address: "Hoài Đức", note: "nhà to nhất", phone: "0987654321" })}
                                                <Divider style={{ marginTop: '40px' }} orientation="left">Restaurant</Divider>
                                                {InforRestaurant({ name: 'Thằng Sơn', address: "Hoài Đức", phone: "0987654321" })}

                                                <Row>
                                                    <Col flex={'auto'}>
                                                        <div style={{ display: 'flex' }}>
                                                            <div className={style.img}>
                                                                <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/04/oreo-shake-150x150.jpg" alt="coca" width={100} />
                                                            </div>
                                                            <div>
                                                                <div className={style.name}>Oreo Milk Shake</div>
                                                                <div className={style.price}>
                                                                    <span className={style.sale}>$399.00</span>
                                                                    $290.00
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Divider />
                                            </div>
                                            <div className={style.btn} onClick={calculateRoute}>
                                                {!acpOrder && <Button type="primary" style={{ backgroundColor: "#ABC270", color: "#Fff", marginLeft: "12px" }} onClick={() => { setAcpOrder(true), window.scrollTo({ top: 60, behavior: 'smooth' }) }} >Accept</Button>}
                                            </div>
                                        </Panel>
                                    </Collapse>
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