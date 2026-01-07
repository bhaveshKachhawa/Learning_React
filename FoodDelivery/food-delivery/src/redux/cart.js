import {createSlice, current} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state, action) =>{
            const index = state.items.findLastIndex((data) => data.id === action.payload.id);
            index != -1?state.items.splice(index+1, 0, action.payload):state.items.push(action.payload);
        },
        removeItem:(state, action) => {
            const index = state.items.findIndex((data) => data.id === action.payload.id);
            state.items.splice(index, 1);
        },
        emptyCart:(state) => {
            state.items.length = 0;
        }
    }
});

export const {addItem, removeItem, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;