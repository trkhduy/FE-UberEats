
import style from "./style/processOrder.module.scss"


import { ChartLine } from "./chart";
import { FC } from "react";
import { Divider } from "antd";

const Statictisc: FC<any> = ({ title }) => {
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

                <ChartLine title='Statictisc For Month' />
                <Divider />
                <ChartLine title='Statictisc For Year' week={false} />
            </div>
        </>
    );
}

export default Statictisc;