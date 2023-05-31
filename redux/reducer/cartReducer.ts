import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CartService from '@/service/cartService';

const cartService = new CartService();

export const fetchCartCount: any = createAsyncThunk('cart/fetchCartCount', async () => {
    const [data, err] = await cartService.getAllCart();
    if (!err) {
        return data.length;
    } else {
        throw new Error('Cannot fetch cart count');
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartCount: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartCount.fulfilled, (state, action) => {
            state.cartCount = action.payload;
            state.status = 'succeeded';
        });
        builder.addCase(fetchCartCount.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchCartCount.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export const selectCartCount = (state: any) => state.cart.cartCount;
export default cartSlice.reducer;
