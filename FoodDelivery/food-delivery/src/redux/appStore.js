import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cart';

const appStore = configureStore({
    reducer:{
        cart:cartReducer,
    }
});

export default appStore;