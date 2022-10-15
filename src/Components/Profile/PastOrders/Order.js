import MainDiv from "../../UI/MainDiv";
import styles from "./Order.module.css";
import { MdReplay } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/CartSlice";
import { useNavigate } from "react-router-dom";
const Order = (props) => {
  const orderDetails = props.orderDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reorderHandler = () => {
    dispatch(cartActions.reorder({ cartItemsArr: orderDetails.items }));
    navigate("/bucket");
  };
  return (
    <MainDiv className={"mt-0"}>
      <div className={styles.order}>
        <div className={styles.body}>
          <p>{orderDetails.date}</p>
          <hr></hr>
          <div className={styles.orderItemsGrid}>
            {orderDetails.items.map((item, index) => {
              return (
                <div key={index} className={styles.orderItem}>
                  <img src={item.img} alt="item" />
                  <h6>{item.title}</h6>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.footer}>
          <h6>Rs {orderDetails.total}</h6>
          <p onClick={reorderHandler}>
            <MdReplay />
            Reorder
          </p>
        </div>
      </div>
    </MainDiv>
  );
};
export default Order;
