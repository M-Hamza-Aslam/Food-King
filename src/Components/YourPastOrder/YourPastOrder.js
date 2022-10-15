import styles from "./YourPastOrder.module.css";
const YourPastOrder = () => {
  return (
    <div className={styles.rootdiv}>
      <div className={styles.orders}>
        <h1>Order History</h1>
        <div>
          <p>You have no orders in your history right now.</p>
        </div>
      </div>
    </div>
  );
};
export default YourPastOrder;
