import { FC } from "react";
import style from "./style/processOrder.module.scss"
import { Button, Col, Collapse, Divider, Popconfirm, Rate, Row, Space, message } from "antd";
import clsx from "clsx";
import { EnvironmentOutlined } from "@ant-design/icons";
const ProcessOrder: FC<any> = ({ title }) => {
    const { Panel } = Collapse;

    // Btn Delete
    const confirm = (e: any): void => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e: any): void => {
        console.log(e);
        message.error('Click on No');
    };
    const Header = (code: string, status: string, price: number) => (
        <Row align={"middle"} justify={"space-between"} style={{ width: "100%" }}>
            <Col><h3 style={{ margin: "0" }}>{code}</h3></Col>
            <Col>
                {/* <h3 style={{ margin: "0", fontWeight: "600", color: '#4C3D3D', padding: "2px 8px", borderRadius: "10px", backgroundColor: "#FFF7D4" }}> */}
                <Button style={{ width: "100%", backgroundColor: false ? "greenyellow" : 'none' }} type='primary' disabled={true} >Order Successfuly</Button>
                {/* </h3> */}
            </Col>
            <Col><h3 style={{ margin: "0", color: "#59CE8F" }}>${price}</h3></Col>
        </Row>
    )

    const InforOrderer = (data: { name: string, address: string, note: string, phone: string }) => {
        return (
            <>
                <div className={style.info}>
                    <h3><EnvironmentOutlined /> Main Boulevard, , Lahore, Punjab, Pakistan - 54000</h3>
                    <p>Name: <span>Sơn</span></p>
                    <p>Phone: <span>0987654321</span></p>
                    <p>Note: <span>cô lô nhuê</span></p>
                </div>
            </>
        )
    }
    const InforDriver = (data: { name: string, star: number, phone: string }) => {
        return (
            <>
                <div style={{ backgroundColor: "#f9f9f9" }} className={style.info}>
                    <h3>✔ Driver</h3>
                    <p>Name: <span>{data.name}</span></p>
                    <p>Phone: <span>{data.phone}</span></p>
                    <div style={{ verticalAlign: "middle" }}>Star: <span><Rate style={{ fontSize: "12px" }} disabled defaultValue={data.star} /></span></div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className={style.menu}>
                <h2>{title}</h2>
                <div >
                    <span style={{ display: "inline-block", width: "40px", height: "2px", backgroundColor: "#FFD95A" }} ></span>
                    <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                    <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                    <span style={{ display: "inline-block", width: "2px", height: "2px", backgroundColor: "#FFD95A", marginLeft: '3px' }} ></span>
                </div>
                <div className={style.list}>
                    <Space direction="vertical" style={{ width: '100%' }}>

                        <Collapse className={style.coll} collapsible="header" style={{ width: "100%" }}  >
                            <Panel header={Header('#1234', 'Finding driver', 1234,)} key="1"  >
                                {InforOrderer({ name: 'Thằng Sơn', address: "Hoài Đức", note: "nhà to nhất", phone: "0987654321" })}
                                {InforDriver({ name: 'Thằng Sơn', phone: "0987654321", star: 0 })}
                                <div className={style.item}>
                                    <Divider />

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

                                </div>
                                <div className={style.item}>
                                    <Divider />

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

                                </div>
                                <div className={style.item}>
                                    <Divider />

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

                                </div>
                                <div className={style.item}>
                                    <Divider />

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

                                </div>
                                <Divider />


                            </Panel>

                        </Collapse>
                        <Collapse className={style.coll} collapsible="header" style={{ width: "100%" }}  >
                            <Panel header={Header('#1234', 'Driving', 1234)} key="1"  >
                                <div className={style.item}>
                                    {InforOrderer({ name: 'Thằng Sơn', address: "Hoài Đức", note: "nhà to nhất", phone: "0987654321" })}
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

                            </Panel>

                        </Collapse>

                    </Space>


                </div>
            </div>
        </>
    );
}

export default ProcessOrder;