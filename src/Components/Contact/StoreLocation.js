import styles from "./StoreLocation.module.css";
import MainDiv from "../UI/MainDiv";
import { MdCall, MdLocationPin } from "react-icons/md";
const StoreLocation = (props) => {
  const heading = props.office.heading;
  const number = props.office.number;
  const address = props.office.address;
  return (
    <MainDiv>
      <div className={styles.storeInfo}>
        <h6>{heading}</h6>
        <div className={styles.numberDiv}>
          <div>
            <MdCall />
            <span>Phone Number</span>
          </div>
          <p>{number}</p>
        </div>
        <div className={styles.addressDiv}>
          <div>
            <MdLocationPin />
            <span>Location</span>
          </div>
          <p>{address}</p>
        </div>
      </div>
    </MainDiv>
  );
};
export default StoreLocation;
