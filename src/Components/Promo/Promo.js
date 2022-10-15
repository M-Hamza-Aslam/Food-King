import styles from "./Promo.module.css";
import RootDiv from "../UI/RootDiv";
const Promo = () => {
  return (
    <RootDiv>
      <div className={styles.rootdiv}>
        <div className={styles.promo}>
          <h1>Promos</h1>
          <div>
            <p>
              There are currently no active promos offered. Check back later
            </p>
          </div>
        </div>
      </div>
    </RootDiv>
  );
};
export default Promo;
