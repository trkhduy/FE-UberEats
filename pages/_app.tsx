import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import LayoutDriver from '@/components/layoutDriver'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <Layout>
      <Component {...pageProps} />
      {router.route.includes('/driver') && <LayoutDriver />}
    </Layout>
  )

}
