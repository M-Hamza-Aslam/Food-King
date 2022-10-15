import { Fragment } from "react";
import CartGrid from "../Cart/CartGrid";
import styles from "./OrderSummary.module.css";
import { useSelector } from "react-redux";
import MainDiv from "../UI/MainDiv";
const OrderSummary = () => {
  const userInstructions = useSelector(
    (state) => state.user.user.specialInstructions
  );
  return (
    <Fragment>
      <MainDiv className="p-0 m-0">
        <div className={styles.summary}>
          <h6>Order Summary</h6>
          <div className={styles.cartGrid}>
            <CartGrid overflow={false} />
          </div>
        </div>
      </MainDiv>
      <MainDiv>
        <div className={styles.instructions}>
          <h6>Special Instructions</h6>
          <p>{userInstructions}</p>
        </div>
      </MainDiv>
    </Fragment>
  );
};
export default OrderSummary;
