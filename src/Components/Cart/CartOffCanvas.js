import styles from "./CartOffCanvas.module.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import CartBtn from "./CartBtn";
import CartGrid from "./CartGrid";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment } from "react";
const CartOffCanvas = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isCartEmpty = cartItems.length === 0;
  //calculating total value of Cart
  let cartValue = 0;
  cartItems.forEach((item) => [
    (cartValue = cartValue + item.price * item.quantity),
  ]);
  return (
    <Offcanvas
      className={styles.offcanvas}
      show={props.show}
      onHide={props.handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className={styles.title}>
          <div className={styles.leftDiv}>
            <CartBtn clickAllow={false} totalCartItems={cartItems.length} />
            <h3>Your Bucket</h3>
          </div>
          <div className={styles.rightDiv}>
            <h3>{`Rs ${cartValue}`}</h3>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body
        className={`${styles.body} ${isCartEmpty && "justify-content-center"}`}
      >
        {isCartEmpty ? (
          <div className={styles.emptyCart}>
            <MdShoppingCart />
            <p>You haven’t added any items in bucket yet</p>
          </div>
        ) : (
          <Fragment>
            <CartGrid overflow={true} />
            <div className={styles.footer}>
              <Link to="/bucket">
                <Button onClick={() => props.handleClose()}>View Bucket</Button>
              </Link>
            </div>
          </Fragment>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default CartOffCanvas;
