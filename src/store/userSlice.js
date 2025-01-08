import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchUserDetails, fetchAllUsers } from "../services/userService";

import { handleMultipleAsyncThunks } from "../utils/reduxUtils";

const initialState = {};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async ({ sendRequest, userId }, thunkAPI) => {
    try {
      const response = await fetchUserDetails(sendRequest, userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (sendRequest, thunkAPI) => {
    try {
      const response = await fetchAllUsers(sendRequest);
      return response.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    cleanUpUserDetails(state) {
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    handleMultipleAsyncThunks(builder, [
      {
        thunk: fetchUserData,
        config: { name: "fetchUserData", dataKey: "userDetails" },
      },
      { thunk: fetchUsers, config: { name: "fetchUsers", dataKey: "users" } },
    ]);
  },
});

export const { cleanUpUserDetails } = userSlice.actions;
export default userSlice.reducer;
