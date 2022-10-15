import styles from "./CartBtn.module.css";
import { Fragment, useState } from "react";
import CartOffCanvas from "./CartOffCanvas";
const CartBtn = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (props.clickAllow) {
      setShow(true);
    }
  };
  return (
    <Fragment>
      <div>
        <button className={`${styles.cartbtn}`} onClick={handleShow}>
          <h5 className="text-white">{props.totalCartItems}</h5>
        </button>
      </div>
      <CartOffCanvas show={show} handleClose={handleClose} />
    </Fragment>
  );
};
export default CartBtn;
