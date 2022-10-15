import styles from "./OrdersGrid.module.css";
import Order from "./Order";
import { useSelector } from "react-redux";

const OrdersGrid = () => {
  const orders = useSelector((state) => state.user.user.orders);
  return (
    <div className={styles.orderGrid}>
      {orders.map((order, index) => {
        return <Order orderDetails={order} key={index} />;
      })}
    </div>
  );
};
export default OrdersGrid;
