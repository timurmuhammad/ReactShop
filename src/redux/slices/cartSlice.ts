import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../components/types/productType'
import { getLocalStorage } from '../../utils/getLocalStorage'

type typeAction = {
    payload: Product
}

type typeInitialState = {
    goods: Array<{ product: Product, amountProduct: number }>
    repeat: boolean
}

const initialState: typeInitialState = {
    goods: getLocalStorage('items') || [],
    repeat: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart(state: typeInitialState, action: typeAction) {
            state.goods.forEach(el => {
                if (el.product.id === action.payload.id) {
                    state.repeat = true
                }
                })
                if (!state.repeat) {
                    state.goods.push({ 
                        product: action.payload,  
                        amountProduct: 1,
                    });
                }
                state.repeat = false
        },
        removeToCart(state, action) {
            state.goods = state.goods.filter(order => order.product.id !== action.payload)
        },
        increment(state, action) {
            state.goods.forEach(el => {
                if (el.product.id === action.payload) {
                    el.amountProduct ++
                }
            })
        },
        decrement(state, action) {
            state.goods.forEach(el => {
                if (el.product.id === action.payload && el.amountProduct > 1) {
                    el.amountProduct --
                }
            })
        }
    }
})

export const { addToCart, removeToCart, increment, decrement } = cartSlice.actions

export default cartSlice.reducer