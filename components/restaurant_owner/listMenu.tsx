import { FC } from "react";
import style from "./style/listMenu.module.scss"
import { Button, Col, Divider, Popconfirm, Row, message } from "antd";
const Menu: FC<any> = ({ title }) => {


    // Btn Delete
    const confirm = (e: any): void => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e: any): void => {
        console.log(e);
        message.error('Click on No');
    };
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
                    <div className={style.item}>
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
                            <Col>
                                <div className={style.btn}>
                                    <Button type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D", marginRight: "12px" }} >Edit</Button>
                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete this task?"
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" danger>Delete</Button>
                                    </Popconfirm>

                                </div>
                            </Col>
                        </Row>

                        <Divider />
                    </div>
                    <div className={style.item}>
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
                            <Col>
                                <div className={style.btn}>
                                    <Button type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D", marginRight: "12px" }} >Edit</Button>
                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete this task?"
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" danger>Delete</Button>
                                    </Popconfirm>

                                </div>
                            </Col>
                        </Row>

                        <Divider />
                    </div>
                    <div className={style.item}>
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
                            <Col>
                                <div className={style.btn}>
                                    <Button type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D", marginRight: "12px" }} >Edit</Button>
                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete this task?"
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" danger>Delete</Button>
                                    </Popconfirm>

                                </div>
                            </Col>
                        </Row>

                        <Divider />
                    </div>
                    <div className={style.item}>
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
                            <Col>
                                <div className={style.btn}>
                                    <Button type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D", marginRight: "12px" }} >Edit</Button>
                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete this task?"
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" danger>Delete</Button>
                                    </Popconfirm>

                                </div>
                            </Col>
                        </Row>

                        <Divider />
                    </div>
                    <div className={style.item}>
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
                            <Col>
                                <div className={style.btn}>
                                    <Button type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D", marginRight: "12px" }} >Edit</Button>
                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete this task?"
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" danger>Delete</Button>
                                    </Popconfirm>

                                </div>
                            </Col>
                        </Row>

                        <Divider />
                    </div>

                </div>
            </div>
        </>
    );
}

export default Menu;