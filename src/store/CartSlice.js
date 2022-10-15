import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  cartInfo: {
    subtotal: 0,
    discount: { code: "", value: 0 },
    deliveryCharges: 0,
    total: 0,
    paymentMethod: "",
  },
};

const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addCartItem(state, actions) {
      let isUpdate = false;
      const updatedCartItemsArr = state.cartItems.map((item) => {
        if (item.title === actions.payload.cartItem.title) {
          isUpdate = true;
          const updatedCartItem = {
            ...item,
            quantity: item.quantity + actions.payload.cartItem.quantity,
          };
          return updatedCartItem;
        }
        return item;
      });
      const newCartItems = isUpdate
        ? [...updatedCartItemsArr]
        : [...updatedCartItemsArr, actions.payload.cartItem];
      //adding cart item in local storage
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      state.cartItems = newCartItems;
    },
    reorder(state, actions) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(actions.payload.cartItemsArr)
      );
      state.cartItems = actions.payload.cartItemsArr;
    },
    fetchCartItem(state, actions) {
      state.cartItems = actions.payload.cartItems;
    },
    removeCartItem(state, actions) {
      let updatedCartItemsArr = state.cartItems;
      const ItemIndex = state.cartItems.findIndex((item) => {
        return item.title === actions.payload.cartItem.title;
      });

      if (actions.payload.cartItem.quantity === 1) {
        updatedCartItemsArr.splice(ItemIndex, 1);
      } else {
        updatedCartItemsArr[ItemIndex].quantity--;
      }
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItemsArr));
      state.cartItems = updatedCartItemsArr;
    },
    deleteForever(state, actions) {
      let updatedCartItemsArr = state.cartItems;
      const ItemIndex = state.cartItems.findIndex((item) => {
        return item.title === actions.payload.cartItem.title;
      });
      updatedCartItemsArr.splice(ItemIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItemsArr));
      state.cartItems = updatedCartItemsArr;
    },
    upadteCartInfo(state, actions) {
      state.cartInfo = { ...state.cartInfo, ...actions.payload.cartInfo };
    },
    clearCart(state) {
      localStorage.removeItem("cartItems");
      state.cartItems = initialState.cartItems;
      state.cartInfo = initialState.cartInfo;
    },
  },
});
export const cartActions = CartSlice.actions;
export default CartSlice.reducer;
