import BreadCrumb from "../BreadCrumb/BreadCrumb";
import RootDiv from "../UI/RootDiv";
import DeliveryDetails from "./DeliveryDetails/DeliveryDetails";
import OrderSummary from "./OrderSummary";
import styles from "./OrderCheckout.module.css";
import PhoneNumberInput from "./PhoneNumberInput";
import { updatePhoneNumberInDB, saveNewOrderInDB } from "../../Data/firebase";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentMethods from "./PaymentMethods";
import OrderAmount from "./OrderAmount";
import { userActions } from "../../store/userSlice";
import { cartActions } from "../../store/CartSlice";
import { useEffect } from "react";

const OrderCheckout = () => {
  const userInfo = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart);
  const { cartItems, cartInfo } = cart;
  const userId = userInfo.uid;
  const authProvider = userInfo.authProvider;
  const address = userInfo.address[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  const notify = (action, msg) => {
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

  const OrderConfirmationHandler = () => {
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    //check if all checkout info has been provided
    if (
      address.address === "" ||
      userInfo.number === "" ||
      cartInfo.paymentMethod === ""
    ) {
      address.address === "" && notify("error", "Please Enter Address");
      userInfo.number === "" && notify("error", "Please Enter Phone number");
      cartInfo.paymentMethod === "" &&
        notify("error", "Please select payment method");
      return;
    }
    //saveNumber if auth provider is google
    if (authProvider === "google") {
      const phoneNumber = userInfo.number;
      //updaing in database
      updatePhoneNumberInDB(userId, phoneNumber);
    }
    //save Order
    const newOrderObj = {
      status: "Active",
      items: cartItems,
      subtotal: cartInfo.subtotal,
      discount: cartInfo.discount,
      deliveryCharges: cartInfo.deliveryCharges,
      total: cartInfo.total,
      paymentMethod: cartInfo.paymentMethod,
      CustomerAddress: address,
      phoneNumber: userInfo.number,
      instructions: userInfo.specialInstructions,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const newOrderArr = [newOrderObj, ...userInfo.orders];
    // update orders in database
    saveNewOrderInDB(userId, newOrderArr);
    //update orders in redux
    dispatch(userActions.updateOrders({ newOrderArr }));
    //clear cart
    dispatch(cartActions.clearCart());
    //seccessful order noti
    notify("success", "Order has been placed successfully!");
    // navigate to home page
    navigate("/");
  };

  return (
    <RootDiv>
      <BreadCrumb isactive={true} />
      <div className={styles.mainDiv}>
        <div className={styles.leftDiv}>
          <DeliveryDetails />
          {authProvider === "google" && <PhoneNumberInput />}
          <PaymentMethods />
        </div>
        <div className={styles.rightDiv}>
          <OrderSummary />
          <OrderAmount />
        </div>
      </div>
      <div className={styles.btnDiv}>
        <Button className={styles.closeBtn} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button onClick={OrderConfirmationHandler}>Confirm Order</Button>
      </div>
    </RootDiv>
  );
};
export default OrderCheckout;
