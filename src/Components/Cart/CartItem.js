import styles from "./CartItem.module.css";
import QuantityBtn from "./QuantityBtn";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/CartSlice";
import { MdDeleteForever } from "react-icons/md";
const CartItem = (props) => {
  const dispatch = useDispatch();
  const onIncreaseQuantity = () => {
    dispatch(
      cartActions.addCartItem({
        cartItem: { ...props.cartItemInfo, quantity: 1 },
      })
    );
  };
  const onDecreaseQuantity = () => {
    dispatch(cartActions.removeCartItem({ cartItem: props.cartItemInfo }));
  };
  const onRemoveItem = () => {
    dispatch(cartActions.deleteForever({ cartItem: props.cartItemInfo }));
  };
  return (
    <div className={styles.rootDiv}>
      <img src={props.cartItemInfo.img} alt="Item" />
      <div className={styles.infoDiv}>
        <div className={styles.titleDiv}>
          <h6>{props.cartItemInfo.title}</h6>
          <QuantityBtn
            decreaseQuantity={onDecreaseQuantity}
            increaseQuantity={onIncreaseQuantity}
            quantity={props.cartItemInfo.quantity}
          />
        </div>
        <div className={styles.totalDiv}>
          <h6>{`Rs ${
            props.cartItemInfo.price * props.cartItemInfo.quantity
          }`}</h6>
          <MdDeleteForever
            className={styles.deleteIcon}
            onClick={onRemoveItem}
          />
        </div>
      </div>
    </div>
  );
};
export default CartItem;
