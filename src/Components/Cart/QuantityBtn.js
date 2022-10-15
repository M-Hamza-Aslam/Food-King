import styles from "./QuantityBtn.module.css";
import {
  MdIndeterminateCheckBox,
  MdDeleteForever,
  MdAddBox,
} from "react-icons/md";
import { Button } from "react-bootstrap";

const QuantityBtn = (props) => {
  return (
    <div className={styles.quantity}>
      <Button onClick={props.decreaseQuantity} className={styles.icon}>
        {props.quantity === 1 ? (
          <MdDeleteForever />
        ) : (
          <MdIndeterminateCheckBox />
        )}
      </Button>
      <p>{props.quantity}</p>
      <Button onClick={props.increaseQuantity} className={styles.icon}>
        <MdAddBox />
      </Button>
    </div>
  );
};
export default QuantityBtn;
