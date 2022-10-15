import styles from "./ItemsBucket.module.css";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import RootDiv from "../UI/RootDiv";
import CartGrid from "../Cart/CartGrid";
import InstructionsForm from "./InstructionsForm";
import Subtotal from "./Subtotal";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ItemsBucket = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);
  return (
    <RootDiv>
      <BreadCrumb isactive={false} />
      <div className={styles.main}>
        <div className={styles.ItemsGrid}>
          <CartGrid overflow={false} />
        </div>
        <div className={styles.total}>
          <InstructionsForm />
          <Subtotal />
        </div>
      </div>
    </RootDiv>
  );
};
export default ItemsBucket;
