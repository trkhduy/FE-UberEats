import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';



export const socket = (token?: string) => {
    const option = {
        extraHeaders: {
            authorization: `Bearer ${(token)}`
        }
    }
    if (token) {
        return io('http://localhost:3333', option)
    }
    return io('http://localhost:3333')
}
export const WebsocketContext = createContext<Socket>(socket());
export const WebsocketProvider = WebsocketContext.Provider;