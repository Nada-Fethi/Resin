import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlice"
import authApi from './features/auth/authApi'
import authReducer from "./features/auth/authSlice"
import productsApi from './features/products/productsApi';
import reviewApi from './features/reviews/reviews.Api';
import  adminreducer from './slices/adminslice';
import adminProductSlice from './slices/adminProduct'
import adminOrderSlice from './slices/adminOrderSlice'
import checkoutReducer from "./slices/checkoutSlice"
import orderReducer from "./slices/orderSlice"
// import cartPReducer from "./slices/cartSlice"


export default configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminreducer,
    adminOrder: adminOrderSlice,
    adminProducts: adminProductSlice,
    checkout: checkoutReducer,
    order: orderReducer,
    // cartP: cartPReducer,
    [authApi.reducerPath] : authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath] : productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, reviewApi.middleware),
});