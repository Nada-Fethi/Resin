// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { clearCart } from "../features/cart/cartSlice";
// import { build } from "vite";


// const loadCartFromStorage = () =>{
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) :{products:[]};

// };


// const saveCartToStorage = (cart) =>{
//     localStorage.setItem("cart",JSON.stringify(cart));
// }




// export const fetchCart = createAsyncThunk("cart/fetchCart", async({userId, guestId}, {rejectWithValue}) =>{
//     try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
//             params: {userId, guestId},
//         });

//         return response.data;
//     } catch (error) {
//         console.error(error);
//         return rejectWithValue(error.response.data);
//     }
// });


// export const addToCart = createAsyncThunk("cart/addToCart", async({productId,category,quantity,color,userId,guestId}, {rejectWithValue}) =>{
//     try {
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
//            productId,category,quantity,color,userId,guestId,
//         });

//         return response.data;
//     } catch (error) {
//         console.error(error);
//         return rejectWithValue(error.response.data);
//     }
// });




// export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async({productId,category,quantity,color,userId,guestId}, {rejectWithValue}) =>{
//     try {
//         const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
//            productId,category,quantity,color,userId,guestId,
//         });

//         return response.data;
//     } catch (error) {
//         console.error(error);
//         return rejectWithValue(error.response.data);
//     }
// });








// export const removeFromCart = createAsyncThunk("cart/removeFromCart", async({productId,category,quantity,color,userId,guestId}, {rejectWithValue}) =>{
//     try {
//         const response = await axios({method:"DELETE",

//             url:`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//             data:{
//            productId,category,quantity,color,userId,guestId,}
//         });

//         return response.data;
//     } catch (error) {
//         console.error(error);
//         return rejectWithValue(error.response.data);
//     }
// });




// export const mergeCart = createAsyncThunk("cart/mergeCart", async({user, guestId}, {rejectWithValue}) =>{
//     try {
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{
//         user, guestId,
//         }
//     ,{

//         headers:{
            
//             Authorization:`Bearer ${localStorage.getItem("user")}`



//         }
//     }
    
    
//     );

//         return response.data;
//     } catch (error) {
//         console.error(error);
//         return rejectWithValue(error.response.data);
//     }
// });


// const cartSlice = createSlice({
//   name: "cart",
//   initialState:{
//     cart: loadCartFromStorage(),
//     loading:false,
//     error:null,
//   },
// reducers:{
//     clearCart:(state) =>{
//         state.cart = {products:[]};
//         localStorage.removeItem("cart");
//     },
// },
// extraReducers: (builder) =>{

// builder.addCase(fetchCart.pending, (state) => {
//     state.loading = true;
//     state.error=null;
// }).addCase(fetchCart.fulfilled, (state,action) => {
//     state.loading = false;
//     state.cart=action.payload;
//     saveCartToStorage(action.payload)
// }).addCase(fetchCart.rejected, (state,action) => {
//     state.loading = false;
//     state.error=action.error.message || "Failed to fetch cart";
// })


// .addCase(addToCart.pending, (state) => {
//     state.loading = true;
//     state.error=null;
// }).addCase(addToCart.fulfilled, (state,action) => {
//     state.loading = false;
//     state.cart=action.payload;
//     saveCartToStorage(action.payload)
// }).addCase(addToCart.rejected, (state,action) => {
//     state.loading = false;
//     state.error=action.payload?.message || "Failed to add to cart";
// })





// .addCase(updateCartItemQuantity.pending, (state) => {
//     state.loading = true;
//     state.error=null;
// }).addCase(updateCartItemQuantity.fulfilled, (state,action) => {
//     state.loading = false;
//     state.cart=action.payload;
//     saveCartToStorage(action.payload)
// }).addCase(updateCartItemQuantity.rejected, (state,action) => {
//     state.loading = false;
//     state.error=action.payload?.message || "Failed to update Item Quantity";
// })




// .addCase(removeFromCart.pending, (state) => {
//     state.loading = true;
//     state.error=null;
// }).addCase(removeFromCart.fulfilled, (state,action) => {
//     state.loading = false;
//     state.cart=action.payload;
//     saveCartToStorage(action.payload)
// }).addCase(removeFromCart.rejected, (state,action) => {
//     state.loading = false;
//     state.error=action.payload?.message || "Failed to remove Item ";
// })









// .addCase(mergeCart.pending, (state) => {
//     state.loading = true;
//     state.error=null;
// }).addCase(mergeCart.fulfilled, (state,action) => {
//     state.loading = false;
//     state.cart=action.payload;
//     saveCartToStorage(action.payload)
// }).addCase(mergeCart.rejected, (state,action) => {
//     state.loading = false;
//     state.error=action.payload?.message || "Failed to merge Cart ";
// });
// }

// });



// export const {clearCart} = cartSlice.actions;
// export default cartSlice.reducer;