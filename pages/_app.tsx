import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import LayoutDriver from '@/components/layoutDriver'
import 'bootstrap/dist/css/bootstrap.min.css';
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import useToken from './hook/useToken'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { WebsocketProvider, socket } from '@/context/WebsocketContext'


export default function App({ Component, pageProps }: AppProps) {
  // const { store } = wrapper.useWrappedStore(pageProps);
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (event.key === 'loading') {
        const localStorageLoading = localStorage.getItem('loading');
        console.log('localStorage');

        setLoading(JSON.parse(localStorageLoading as string));
      }
    };

    // Thêm sự kiện lắng nghe storage của trình duyệt
    window.addEventListener('storage', handleStorageChange);

    // Hủy bỏ sự kiện lắng nghe khi component bị unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [])
  // const screenRole = {
  //   1: ['/driver', '/restaurantowner'], //sẽ bắt loại trừ 2 trường hợp này
  //   2: ['/driver'],
  //   3: ['/restaurantowner']
  // }

  const [messageApi, contextHolder] = message.useMessage();
  const checkRole = (role: number) => {
    if (router.route.includes('/user/login') || router.route.includes('/user/register')) {
      return true
    }
    if (role === 1) {
      return !router.route.includes('/driver') && !router.route.includes('/restaurantowner')
    }
    if (role === 2) {
      return router.route.includes('/driver')
    }
    return router.route.includes('/restaurantowner')
  }
  const error = (message = 'Unauthorize') => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };
  useEffect(() => {
    const role = useToken()

    if (!role) {
      if (!router.route.includes('/user/login') && !router.route.includes('/user/register')) {
        router.push('/user/login')
        return error('You need login now')
      }
    } else {
      if (!checkRole(role)) {
        router.push('/user/login')
        error()
      }
    }
  }, [router])

  return (

    <Provider store={store}>
      <Layout>
        {contextHolder}
        <WebsocketProvider value={socket}>
          <Component {...pageProps} />
        </WebsocketProvider>
        {loading && <div style={{ position: 'fixed', zIndex: "100000", backgroundColor: "#cccccc7a", top: "0", left: 0, width: "100%", height: '100vh', display: "flex", alignItems: "center", justifyContent: 'center' }}>
        {router.route.includes('/driver') && <LayoutDriver />}
      </Layout>
    </Provider>
  )

}
