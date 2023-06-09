import ProductService from '@/service/productService'
import { Button, Space, Table, notification } from 'antd'
import Column from 'antd/es/table/Column'
import React, { useEffect, useState } from 'react'
import style from './style/order.module.scss'
import clsx from 'clsx'
import ProcessOrder from '@/components/restaurant_owner/listProcess'
import { AreaChartOutlined } from '@ant-design/icons'
import { io } from 'socket.io-client'

const Index = () => {
    const productService = new ProductService

    const [order, setOrder] = useState([])
    const getOrderByClient = async () => {
        const [result, err] = await productService.getOrderClient();
        if (result) {
            setOrder(result);
            console.log(result);

        }
        if (err) {
            console.log(err);
        }
    }
    const [token, setToken]: any = useState(null)
    const getCookie = (name: string) => {
        const cookieValue = document.cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)') || null;
        return cookieValue ? cookieValue.pop() : null;
    }

    useEffect(() => {
        setToken(getCookie('refresh_token') as string)
    }, [])
    useEffect(() => {
        if (token) {
            const socket = io('http://localhost:3333', {
                extraHeaders: {
                    authorization: `Bearer ${(token)}`
                }
            })
            console.log('socket', socket);
            socket.on('connect', () => {
                console.log('connection..');
            })
            socket.on('GetOrder', (listOrder: any) => {
                // console.log('order', listOrder);
                getOrderByClient()
            })
            socket.on('GetMessage', (message: any) => {
                notification.open({
                    message: message,

                    icon: <AreaChartOutlined style={{ color: '#8BC34A' }} />,
                });
            })
            return () => {
                console.log('Unregistering Events...');
                socket.off('connect');
                socket.off('GetOrder');
            };
        }
    }, [token])

    useEffect(() => {
        getOrderByClient()
    }, [])
    return (
        <>
            <div style={{ marginTop: "100px", padding: " 0 60px" }}>
                <ProcessOrder data={order} title={'Your Order'} />
            </div>
        </>
    )
}

export default Index