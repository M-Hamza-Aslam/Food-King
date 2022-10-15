import styles from "./RootDiv.module.css";
const RootDiv = (props) => {
  return <div className={styles.rootdiv}>{props.children}</div>;
};
export default RootDiv;
