import styles from "./MainDiv.module.css";

const MainDiv = (props) => {
  const classess = styles.mainDiv + " " + props.className;
  return <div className={classess}>{props.children}</div>;
};
export default MainDiv;
