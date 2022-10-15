import MainDiv from "../UI/MainDiv";
import styles from "./CustomerCare.module.css";

const CustomerCare = (props) => {
  const { icon, heading, text } = { ...props.data };

  return (
    <MainDiv className={styles.custCareMainDIv}>
      <div className={styles.custCareDiv}>
        <div>
          {icon}
          <span>{heading}</span>
        </div>
        <p>{text}</p>
      </div>
    </MainDiv>
  );
};
export default CustomerCare;
