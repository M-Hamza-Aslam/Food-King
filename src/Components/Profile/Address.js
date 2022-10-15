import AddressModal from "../Header/AddressModal";
import {
  MdBorderColor,
  MdDeleteForever,
  MdHome,
  MdBusinessCenter,
  MdPeopleAlt,
  MdHomeWork,
} from "react-icons/md";
import styles from "./Address.module.css";
import { useState } from "react";
import { updateAddressInDB } from "../../Data/firebase";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const Address = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const userAddressArr = user.address;
  const userId = user.uid;

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

  const RemoveAddress = () => {
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    let updatedAddressArr = [...userAddressArr];
    console.log(props.addressInfo.addIndex);
    updatedAddressArr.splice(props.addressInfo.addIndex, 1);
    if (updatedAddressArr.length === 0) {
      updatedAddressArr = [{ address: "", location: "Home" }];
    }
    //removing address from db
    updateAddressInDB(userId, updatedAddressArr);
    //removing address from store
    dispatch(userActions.updateAddress({ addressArr: updatedAddressArr }));
  };
  const addressIcon = {
    Home: <MdHome />,
    Office: <MdBusinessCenter />,
    Partner: <MdPeopleAlt />,
    Other: <MdHomeWork />,
  };
  return (
    <div className={styles.mainDiv}>
      <div className={styles.addressDiv}>
        {addressIcon[props.addressInfo.address.location]}
        <div className={styles.addressInfo}>
          <h6>{props.addressInfo.address.location}</h6>
          <p>{props.addressInfo.address.address}</p>
        </div>
      </div>
      <div className={styles.btnDiv}>
        <Button onClick={RemoveAddress}>
          <MdDeleteForever />
          <span>Remove</span>
        </Button>
        <Button onClick={() => setModalShow(true)}>
          <MdBorderColor />
          <span>Edit</span>
        </Button>
      </div>
      {modalShow && (
        <AddressModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          index={props.addressInfo.addIndex}
        />
      )}
    </div>
  );
};
export default Address;
