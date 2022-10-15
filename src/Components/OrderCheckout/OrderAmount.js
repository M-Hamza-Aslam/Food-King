import styles from "./OrderAmount.module.css";
import { Fragment, useRef, useState, useEffect } from "react";
import MainDiv from "../UI/MainDiv";
import Button from "react-bootstrap/Button";
import { verifyCouponCode } from "../../Data/firebase";
import { useSelector } from "react-redux";
import { MdSell, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/CartSlice";

const OrderAmount = () => {
  const couponInputRef = useRef();
  const [couponIsError, setCouponIsError] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const initialDiscount = {
    code: "",
    value: 0,
  };
  const [discount, setDiscount] = useState(initialDiscount);
  const dispatch = useDispatch();
  //calculating total
  const cartItems = useSelector((state) => state.cart.cartItems);
  const deliveryCharges = 50;
  let subtotal = 0;
  cartItems.forEach((item) => [
    (subtotal = subtotal + item.price * item.quantity),
  ]);
  const total = subtotal + deliveryCharges - discount.value;
  useEffect(() => {
    const cartInfo = {
      subtotal,
      discount,
      deliveryCharges,
      total,
    };
    dispatch(cartActions.upadteCartInfo({ cartInfo }));
  }, [discount, subtotal, total, dispatch]);

  const couponInputClasses = couponIsError
    ? `${styles.input} ${styles.inputInvalid}`
    : styles.input;
  const Notify = (action, msg) => {
    toast[action](msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const CouponHandler = async () => {
    if (!navigator.onLine) {
      Notify("error", "You have no internet connection");
      return;
    }
    setShowSpinner(true);
    // verify user provided coupon code
    const code = couponInputRef.current.value.toLowerCase();
    const appliedDiscount = await verifyCouponCode(code);
    if (appliedDiscount === -1) {
      // show error if incorrect coupon code
      setCouponIsError(true);
      Notify("error", "Coupon code is invalid");
    } else {
      // add discount on cart ammount if correct coupon code
      setCouponIsError(false);
      setDiscount({ code, value: appliedDiscount });
      Notify("success", "Coupon applied successfully");
    }
    setShowSpinner(false);
  };

  return (
    <Fragment>
      <MainDiv>
        <div className={styles.amountDiv}>
          <p>Delivery</p>
          <p>{`Rs ${deliveryCharges}`}</p>
        </div>
        <div className={styles.amountDiv}>
          <p>Discount</p>
          <p>{`Rs ${discount.value}`}</p>
        </div>
        <div className={styles.amountDiv}>
          <p>Sub Total</p>
          <p>{`Rs ${subtotal}`}</p>
        </div>
        {discount.value === 0 ? (
          <div>
            <div className="mt-4">
              {/* <label htmlFor="coupon" className="text-white mb-2">
                Coupon
              </label> */}
              <input
                id="coupon"
                type="text"
                className={`form-control text-white ${couponInputClasses}`}
                placeholder="Coupon"
                ref={couponInputRef}
              />
              {couponIsError && (
                <p className={styles.invalidtext}>Invalid coupon code!</p>
              )}
            </div>
            <Button
              className={styles.applyBtn}
              onClick={CouponHandler}
              disabled={showSpinner}
            >
              {showSpinner ? (
                <div>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  ></Spinner>
                  <span className={styles.spinnerMsg}>Applying Coupon</span>
                </div>
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        ) : (
          <div className={styles.appliedCoupon}>
            <MdSell />
            <p>{discount.code}</p>
            <MdClose
              className={styles.closeBtn}
              onClick={() =>
                setDiscount({
                  code: "",
                  value: 0,
                })
              }
            />
          </div>
        )}
      </MainDiv>
      <MainDiv>
        <div className={styles.total}>
          <p>Total</p>
          <h6>{`Rs ${total}`}</h6>
        </div>
      </MainDiv>
    </Fragment>
  );
};
export default OrderAmount;
