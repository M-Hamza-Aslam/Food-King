import Spinner from "react-bootstrap/Spinner";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    // <div className={styles.spinDiv}>
    //   <Spinner animation="border" role="status" variant="warning">
    //     <span className="visually-hidden">Loading...</span>
    //   </Spinner>
    //   <div></div>
    // </div>
    <div className={styles.backdrop} id="backdrop">
      <div className={`${styles.textCenter} ${styles.loading}`}>
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};
export default LoadingSpinner;
