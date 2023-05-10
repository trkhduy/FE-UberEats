import React, { ReactNode } from 'react'
import Header from '@/modules/header'
import Footer from '@/modules/footer'
interface LayoutProps {
    children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout