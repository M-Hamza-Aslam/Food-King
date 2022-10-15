import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import Button from "react-bootstrap/Button";
import styles from "./CheckoutAddress.module.css";
import { MdBorderColor } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userActions } from "../../store/userSlice";
import { updateAddressInDB } from "../../Data/firebase";
import { Fragment } from "react";
import AddressModal from "../Header/AddressModal";

const CheckoutAddress = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector((state) => state.user.user);
  const userAddressArr = user.address;
  const UID = user.uid;
  const index = props.addressInfo.addIndex;
  const address = props.addressInfo.address;
  const dispatch = useDispatch();
  const makePrimeAddress = () => {
    //swapping
    const updatedAddressArr = [...userAddressArr];
    const temp = updatedAddressArr[0];
    updatedAddressArr[0] = updatedAddressArr[index];
    updatedAddressArr[index] = temp;
    //updating address in redux store;
    dispatch(userActions.updateAddress({ addressArr: updatedAddressArr }));
    //updating addtess in database
    updateAddressInDB(UID, updatedAddressArr);
  };

  const mainDivClasses =
    index === 0 ? `${styles.mainDiv} ${styles.firstAddress}` : styles.mainDiv;
  const icon =
    index === 0 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />;
  return (
    <Fragment>
      <div className={mainDivClasses}>
        <Button onClick={makePrimeAddress}>{icon}</Button>
        <div className={styles.addressInfoDiv}>
          <div className={styles.addressTitle}>
            <h6>{address.location}</h6>
            <Button onClick={() => setModalShow(true)}>
              <MdBorderColor />
              <span>Edit</span>
            </Button>
          </div>
          <p className={styles.addressPara}>{address.address}</p>
        </div>
      </div>
      {modalShow && (
        <AddressModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          index={index}
        />
      )}
    </Fragment>
  );
};
export default CheckoutAddress;
