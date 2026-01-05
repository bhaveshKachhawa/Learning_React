import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state, action) =>{
            state.items.push(action.payload);
        },
        removeItem:(state, action) => {
            const index = state.items.indexOf(action.payload);
            state.items.pop(index);
        },
        emptyCart:(state) => {
            state.items.erase();
        }
    }
});

export const {addItem, removeItem, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;