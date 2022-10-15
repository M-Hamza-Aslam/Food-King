import styles from "./CartGrid.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
const CartGrid = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className={props.overflow ? styles.overflow : ""}>
      {cartItems.map((item, index) => {
        return <CartItem cartItemInfo={item} key={index} />;
      })}
    </div>
  );
};
export default CartGrid;
