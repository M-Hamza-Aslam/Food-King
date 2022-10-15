import styles from "./PastOrders.module.css";
// import { Link } from "react-router-dom";
import { Fragment } from "react";
import OrdersGrid from "./OrdersGrid";
const PastOrders = () => {
  return (
    <Fragment>
      <div className={styles.PastOrders}>
        <h1>Past Orders</h1>
        {/* <Link to="/order-history">
          <p>View All</p>
        </Link> */}
      </div>
      <OrdersGrid />
    </Fragment>
  );
};
export default PastOrders;
