import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  id: 0,
  email: "",
  nick: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.nick = action.payload.nick;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
