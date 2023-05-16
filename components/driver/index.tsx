
import Head from 'next/head';
import style from './style/home.module.scss';
import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEffect, useRef, useState } from 'react';
import { Button, Col, Collapse, Divider, Popconfirm, Row, Space, message } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';


function DriverPage() {
    const { Panel } = Collapse;
    const mapContainer: any = useRef(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const confirm = (e: any): void => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e: any): void => {
        console.log(e);
        message.error('Click on No');
    };
    useEffect(() => {
        // if (map.current) return; // initialize map only once
        // map.current = new mapboxgl.Map({
        //     container: mapContainer.current,
        //     style: 'mapbox://styles/mapbox/streets-v12',
        //     center: [lng, lat],
        //     zoom: zoom
        // });
    });
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
                    <p>Note: <span>cô lô nhuê</span></p>
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
                <Row>

                    <Col md={12} span={24}>
                        <div className={style.map} style={{ width: "100%", maxWidth: "1440px", aspectRatio: '13/9' }} >
                            <Map
                                mapboxAccessToken="pk.eyJ1IjoidHJpZGMiLCJhIjoiY2xobm4xdXh3MW16azNnbHJvcHRwYmRodiJ9.WK8ZUq8s5DqkBdqzj20a6Q"
                                initialViewState={{
                                    longitude: -100,
                                    latitude: 40,
                                    zoom: 3.5,
                                }}
                                mapStyle="mapbox://styles/tridc/clhnnergm01p401pr3eulbcaa"
                            >
                                <GeolocateControl
                                    positionOptions={{ enableHighAccuracy: true }}
                                    trackUserLocation={true}
                                />
                            </Map>
                        </div>
                    </Col>
                    <Col md={12} span={24} >
                        <div className={style.listOrder}>
                            <h2>List Order</h2>
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
                                            <div className={style.btn}>
                                                {/* <Popconfirm
                                            title="Delete the task"
                                            description="Are you sure to delete this task?"
                                            onConfirm={confirm}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button type="primary" danger>Deny</Button>
                                        </Popconfirm> */}
                                                <Button type="primary" style={{ backgroundColor: "#ABC270", color: "#Fff", marginLeft: "12px" }} >Accept</Button>

                                            </div>
                                        </Panel>

                                    </Collapse>

                                </Space>


                            </div>
                        </div>
                    </Col>
                </Row>



            </div>
        </>
    );
}

export default DriverPage;