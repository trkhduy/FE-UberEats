import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducer/cartReducer';


const reducer = {
    cart: cartReducer,
    // Các reducer khác ở đây nếu cần
}

const store = configureStore({
    reducer,
    devTools: true,
})

export default store;

