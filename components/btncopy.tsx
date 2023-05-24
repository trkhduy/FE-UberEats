import { CopyFilled } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";

const BtnCopy: FC<any> = ({ value }) => {
    const [check, setCheck] = useState(false)
    const onClickCopy = () => {
        navigator.clipboard.writeText(value)
        setCheck(true)
        const timer = setTimeout(() => {
            setCheck(false)
        }, 2000);
        return () => clearTimeout(timer);
    }

    return (
        <>
            <div onClick={onClickCopy} style={{ textAlign: 'end', cursor: 'pointer', marginTop: '10px' }}>
                <span> {!check ? 'Copy code' : 'Copied!'}</span>
                <CopyFilled style={{ color: '#575252' }} />
            </div>
        </>
    );
}

export default BtnCopy;