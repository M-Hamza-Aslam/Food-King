import styles from "./BreadCrumb.module.css";
import Circle from "./Circle";
import { MdCheck } from "react-icons/md";
const BreadCrumb = (props) => {
  const hrClasses = props.isactive
    ? `${styles.activehr}`
    : `${styles.activehr} ${styles.nonactive}`;
  const contentClasses = props.isactive
    ? `${styles.content}`
    : `${styles.content} ${styles.nonactivecontent}`;
  return (
    <div className={styles.breadCrumb}>
      <Circle label="Menu" isactive={true}>
        <MdCheck className={styles.content} />
      </Circle>
      <div className={styles.activehr}></div>
      <Circle label="Bucket" isactive={true}>
        {props.isactive ? (
          <MdCheck className={styles.content} />
        ) : (
          <p className={styles.content}>2</p>
        )}
      </Circle>
      <div className={hrClasses}></div>
      <Circle label="Checkout" isactive={props.isactive}>
        <p className={contentClasses}>3</p>
      </Circle>
    </div>
  );
};
export default BreadCrumb;
