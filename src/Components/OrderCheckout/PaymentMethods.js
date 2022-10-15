import MainDiv from "../UI/MainDiv";
import styles from "./PaymentMethods.module.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/CartSlice";

const PaymentMethods = () => {
  const dispatch = useDispatch();
  // const [paymentMethod, setPaymentMethod] = useState("");
  const onChangeValue = (event) => {
    dispatch(
      cartActions.upadteCartInfo({
        cartInfo: { paymentMethod: event.target.value },
      })
    );
    // setPaymentMethod(event.target.value);
  };
  return (
    <MainDiv>
      <div className={styles.paymentDiv}>
        <h6>Payment Method</h6>
        <div className={styles.radioBtnDiv} onChange={onChangeValue}>
          <div>
            <input type="radio" value="COD" name="payment" />
            <label>
              <h6>COD</h6>
              <p>Cash on delivery</p>
            </label>
          </div>
          <div>
            <input type="radio" value="CCD" name="payment" />
            <label>
              <h6>CCD</h6>
              <p>Card on delivery</p>
            </label>
          </div>

          <div className={styles.disabled}>
            <input type="radio" value="Online" name="payment" disabled />
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-disabled">
                  Debit/Credit Cards are not acceptable for payment yet
                </Tooltip>
              }
            >
              <label>
                <h6>Online</h6>
                <p>Debit/Credit Card</p>
              </label>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </MainDiv>
  );
};
export default PaymentMethods;
