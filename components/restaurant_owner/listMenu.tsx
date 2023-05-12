import { FC, useState } from "react";
import style from "./style/listMenu.module.scss"
import { Button, Col, Divider, Popconfirm, Row, message } from "antd";
import clsx from "clsx";
import CreateProductModal from "./modelProduct";
const Menu: FC<any> = ({ title }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [productToEdit, setProductToEdit]: any = useState(null);
    const handleCreate = (values: any, onSuccess: any) => {
        // Gửi request tạo sản phẩm đến API
        console.log("Form values", values);

        setTimeout(() => {
            // Giả sử request thành công và đóng modal
            onSuccess();
            setModalVisible(false);
        }, 2000);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

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
                <Row justify={'space-between'} align={"middle"}>
                    <Col><h2>{title}</h2></Col>
                    <Col>
                        <Button type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D" }} onClick={() => setModalVisible(true)}>
                            Create Product
                        </Button>
                    </Col>
                </Row>

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
                                    <Button type="primary" style={{ marginRight: "12px" }} className={clsx(true && style.activeOrder)} >{false ? 'Stop' : 'Start'} Order</Button>
                                    <Button onClick={() => {
                                        setModalVisible(true)
                                        setProductToEdit({ name: "aaa", price: 123, desc: "123" })
                                    }} type="primary" style={{ backgroundColor: "#FFD95A", color: "#4C3D3D", marginRight: "12px" }} >Edit</Button>
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
            <CreateProductModal
                visible={modalVisible}
                onCreate={handleCreate}
                onCancel={handleCancel}
                product={productToEdit}
            />
        </>
    );
}

export default Menu;