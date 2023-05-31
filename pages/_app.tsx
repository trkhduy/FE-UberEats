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


export default function App({ Component, pageProps }: AppProps) {
  // const { store } = wrapper.useWrappedStore(pageProps);
  const router = useRouter()

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
        <Component {...pageProps} />
        {router.route.includes('/driver') && <LayoutDriver />}
      </Layout>
    </Provider>



  )

}
