import styles from "./DropDown.module.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { useState } from "react";
const DropDown = (props) => {
  const [isDropDown, setIsDropDown] = useState(false);
  return (
    <div className={styles.dropdown}>
      <div
        onClick={() => setIsDropDown((prevState) => !prevState)}
        className={styles.dropdownheading}
      >
        <span>{props.heading}</span>
        {isDropDown ? (
          <MdOutlineKeyboardArrowUp />
        ) : (
          <MdOutlineKeyboardArrowDown />
        )}
      </div>
      {isDropDown && props.children}
    </div>
  );
};
export default DropDown;
