import styles from "./Subtotal.module.css";
import RootDiv from "../UI/RootDiv";
import { useSelector } from "react-redux";

const Subtotal = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  //calculating total value of Cart
  let cartValue = 0;
  cartItems.forEach((item) => [
    (cartValue = cartValue + item.price * item.quantity),
  ]);
  return (
    <RootDiv>
      <div className={styles.subtotalDiv}>
        <h6>Subtotal</h6>
        <h6>{`Rs ${cartValue}`}</h6>
      </div>
    </RootDiv>
  );
};
export default Subtotal;
