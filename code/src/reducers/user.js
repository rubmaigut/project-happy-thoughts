import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    username: null,
    existUser: false,
  },
  reducers: {},

});
export default user;
