import { HomeOutlined, LineChartOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useRouter } from "next/router";

function LayoutDriver() {
    const router = useRouter()
    return (
        <>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ right: 24 }}
                icon={<MenuOutlined />}
            >
                <FloatButton icon={<UserOutlined />} onClick={() => router.push('/driver/profile')} />
                <FloatButton icon={<LineChartOutlined />} onClick={() => router.push('/driver/statistics')} />
                <FloatButton icon={<HomeOutlined />} onClick={() => router.push('/driver')} />
            </FloatButton.Group>
        </>
    );
}

export default LayoutDriver;