import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react'

const useToken = () => {
    const getCookie = (name: string) => {
        const cookieValue: any = document.cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)') || null;
        if (!cookieValue) {
            return null
        }
        const { role }: any = jwtDecode(cookieValue.pop() as string)
        return role
    }
    return getCookie(('access_token'))
}

export default useToken