import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: 0,
  goal: 10000,
};

export const stepCounterSlice = createSlice({
  name: "stepCounter",
  initialState,
  reducers: {
    setPoints: (state, action) => {
      state.points += action.payload;
    },
    increamentGoal: (state, action) => {
      state.goal += action.payload;
    },
    decrementGoal: (state, action) => {
      state.goal <= 0 ? state.goal = 0 : state.goal -= action.payload ;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPoints,increamentGoal,decrementGoal } = stepCounterSlice.actions;

export default stepCounterSlice.reducer;
