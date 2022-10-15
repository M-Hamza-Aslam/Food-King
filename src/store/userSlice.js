import { createSlice } from "@reduxjs/toolkit";
const userInitialState = {
  user: {
    uid: "",
    authProvider: "",
    name: "",
    number: "",
    address: [{ address: "", location: "Home" }],
    gender: "Unknown",
    DOB: new Date().toISOString().split("T")[0],
    favorites: [],
    specialInstructions: "",
    orders: [],
  },
};
const userSlice = createSlice({
  name: "userSlice",
  initialState: userInitialState,
  reducers: {
    getUserData(state, actions) {
      state.user = { ...state.user, ...actions.payload };
    },
    clearUserData(state) {
      state.user = userInitialState.user;
    },
    updateFavorites(state, actions) {
      state.user.favorites = actions.payload.newFavArray;
    },
    updateAddress(state, actions) {
      state.user.address = actions.payload.addressArr;
    },
    updatePersonalInfo(state, actions) {
      state.user.DOB = actions.payload.DOB;
      state.user.gender = actions.payload.gender;
    },
    updateSpecialInstructions(state, actions) {
      state.user.specialInstructions = actions.payload.specialInstructions;
    },
    updatePhoneNumber(state, actions) {
      state.user.number = actions.payload.phoneNumber;
    },
    updateOrders(state, actions) {
      state.user.orders = actions.payload.newOrderArr;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
