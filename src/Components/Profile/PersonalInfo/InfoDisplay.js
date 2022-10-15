import styles from "./InfoDisplay.module.css";
import { MdBorderColor } from "react-icons/md";
import { useSelector } from "react-redux";
const InfoDisplay = (props) => {
  const userState = useSelector((state) => state.user.user);
  return (
    <div className={styles.info}>
      <div className={styles.infoleftdiv}>
        <h1>Gender</h1>
        <p>{userState.gender}</p>
        <h1>Date of Birth</h1>
        <p>{userState.DOB}</p>
      </div>
      <div
        className={styles.inforightdiv}
        onClick={() => props.updateIsEdit(true)}
      >
        <MdBorderColor />
        <span>Edit</span>
      </div>
    </div>
  );
};
export default InfoDisplay;
