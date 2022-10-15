import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";
const CategoryCard = (props) => {
  const className =
    props.name === props.id
      ? styles.card + " " + styles.activeCard
      : styles.card + " " + styles.nonActiveCard;
  const isHide = props.hide && styles.hide;

  return (
    <Link className={styles.link} to={`/category/${props.link}`}>
      <div className={` mx-2 mx-xl-3 mx-xxl-3 ${className} ${isHide}`}>
        <img src={props.img} alt="category1" />
        <h6>{props.name}</h6>
      </div>
    </Link>
  );
};
export default CategoryCard;
