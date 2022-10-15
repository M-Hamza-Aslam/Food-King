import styles from "./HorizontalBar.module.css";
import RootDiv from "./RootDiv";
const HorizontalBar = (props) => {
  return (
    <RootDiv>
      <div className={` my-4 my-md-5 ${styles.hrbar}`}>
        <h1>{props.text}</h1>
      </div>
    </RootDiv>
  );
};
export default HorizontalBar;
