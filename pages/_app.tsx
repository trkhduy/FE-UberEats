import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const checkAuthorzite = () => {
    
  }
  return (

    <Layout>
      <Component {...pageProps} />
    </Layout>
  )

}
