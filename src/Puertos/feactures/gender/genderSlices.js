import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  gender: null,
};

export const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    setGender: (state, action) => {
      state.gender = action.payload;
    },
  },
});

export const { setGender } = genderSlice.actions;

export const selectgender = (state) => state.gender.gender;

export default genderSlice.reducer;
