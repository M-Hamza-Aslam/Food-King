import styles from "./Circle.module.css";

const Circle = (props) => {
  return (
    <div className={styles.contentDiv}>
      <div
        className={`${styles.circle} ${
          !props.isactive && styles.nonactivecircle
        } `}
      >
        {props.children}
      </div>
      <h6
        className={`${styles.label} ${
          !props.isactive && styles.nonactivelabel
        }`}
      >
        {props.label}
      </h6>
    </div>
  );
};
export default Circle;
