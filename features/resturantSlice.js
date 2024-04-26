import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resturant: {
    id: null,
    imageUrl: null,
    title: null,
    rating: null,
    genre: null,
    addresss: null,
    short_description: null,
    dishes: null,
    lat: null,
    long: null
  },
};

export const resturantSlice = createSlice({
  name: "resturant",
  initialState,
  reducers: {
    setResurant: (state, action) => {
        state.resturant = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setResurant } = resturantSlice.actions;

export const selectResturants = (state) => state.resturant.resturant;


export default resturantSlice.reducer;
