import styles from "./AddressGrid.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

import Address from "./Address";
import DropDown from "../UI/DropDown";
import AddressModal from "../Header/AddressModal";

import { Button } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";

const AddressGrid = () => {
  const [modalShow, setModalShow] = useState(false);
  const addressArr = useSelector((state) => state.user.user.address);
  const isFirstAddress = addressArr[0].address === "" ? true : false;
  const openAddressModal = () => setModalShow(true);

  return (
    <DropDown heading="Address">
      {!isFirstAddress &&
        addressArr.map((address, addIndex) => {
          return <Address key={addIndex} addressInfo={{ address, addIndex }} />;
        })}
      <Button onClick={openAddressModal} className={styles.newAddress}>
        <MdAddCircle />
        <span>Add new address</span>
      </Button>
      {modalShow && (
        <AddressModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          index={isFirstAddress ? 0 : -1}
        />
      )}
    </DropDown>
  );
};
export default AddressGrid;
