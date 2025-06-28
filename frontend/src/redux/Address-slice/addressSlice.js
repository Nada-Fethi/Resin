// redux/Address-slice/addressSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllAddress = createAsyncThunk(
  'address/fetchAll',
  async (userId) => {
    const response = await axios.get(`/api/addresses/${userId}`);
    return response.data;
  }
);

export const addNewAddress = createAsyncThunk(
  'address/addNew',
  async (addressData) => {
    const response = await axios.post('/api/addresses/add', addressData);
    return response.data.address;
  }
);

export const deleteAddress = createAsyncThunk(
  'address/delete',
  async ({ userId, addressId }) => {
    await axios.delete(`/api/addresses/${addressId}/${userId}`);
    return addressId;
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload;
      })
      .addCase(fetchAllAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.addressList.push(action.payload);
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addressList = state.addressList.filter(addr => addr._id !== action.payload);
      });
  }
});

export default addressSlice.reducer;
