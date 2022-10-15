import styles from "./ItemQuantity.module.css";
import { MdIndeterminateCheckBox, MdAddBox } from "react-icons/md";
import { Button } from "react-bootstrap";

const ItemQuantity = (props) => {
  const increaseQuantity = () => {
    props.setQuantity((prevState) => prevState + 1);
  };
  const decreaseQuantity = () => {
    if (props.quantity === 1) {
      return;
    }
    props.setQuantity((prevState) => prevState - 1);
  };
  return (
    <div className={styles.quantity}>
      <Button className={styles.icon}>
        <MdIndeterminateCheckBox onClick={decreaseQuantity} />
      </Button>
      <p>{props.quantity}</p>
      <Button className={styles.icon}>
        <MdAddBox onClick={increaseQuantity} />
      </Button>
    </div>
  );
};
export default ItemQuantity;
