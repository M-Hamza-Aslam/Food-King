import styles from "./OtherSavedAddress.module.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { useState } from "react";
import CheckoutAddress from "../CheckoutAddress";
const OtherSavedAddress = (props) => {
  const [isDropDown, setIsDropDown] = useState(false);
  //   const addressGridArr = props.addressArr;
  //   addressGridArr.splice(0, 3);
  return (
    <div className={styles.dropdown}>
      <div
        onClick={() => setIsDropDown((prevState) => !prevState)}
        className={styles.dropdownheading}
      >
        <span>Other Saved Address</span>
        <div>
          <span>View All</span>
          {isDropDown ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </div>
      </div>
      <div className={styles.firstTwoSavedAddress}>
        {props.addressArr[1] && (
          <CheckoutAddress
            addressInfo={{ address: props.addressArr[1], addIndex: 1 }}
          />
        )}
        {props.addressArr[2] && (
          <CheckoutAddress
            addressInfo={{ address: props.addressArr[2], addIndex: 2 }}
          />
        )}
      </div>
      {isDropDown && (
        <div className={styles.addressGrid}>
          {props.addressArr.map((address, index) => {
            if (index > 2) {
              return (
                <CheckoutAddress
                  key={index}
                  addressInfo={{ address, addIndex: index }}
                />
              );
            }
            return "";
          })}
        </div>
      )}
    </div>
  );
};
export default OtherSavedAddress;
