import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import LayoutDriver from '@/components/layoutDriver'
import 'bootstrap/dist/css/bootstrap.min.css';
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { message } from 'antd'


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [role, setRole]: any = useState(-1)

  const screenRole = {
    1: ['/driver', '/restaurantowner'], //sẽ bắt loại trừ 2 trường hợp này
    2: ['/driver'],
    3: ['/restaurantowner']
  }

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

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Unauthorize !!',
    });
  };

  useEffect(() => {
    const getCookie = (name: string) => {
      const cookieValue = document.cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)') || null;
      if (!cookieValue) {
        return !router.route.includes('/user/login') && router.push('/user/login')
      } else {
        const { role }: any = jwtDecode(cookieValue.pop() as string)
        setRole(role)
        if (!checkRole(role)) {
          router.push('/user/login')
          error()
        }
      }
    }
    getCookie(('access_token'))

  }, [router])

  return (
    // checkRole(role) && (
    <Layout>
      {contextHolder}
      <Component {...pageProps} />
      {router.route.includes('/driver') && <LayoutDriver />}
    </Layout>
    // )

  )

}
