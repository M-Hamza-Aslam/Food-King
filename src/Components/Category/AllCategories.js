import CategoryCard from "./CategoryCard";
import styles from "./AllCategories.module.css";
import { Categories } from "../../Data/Data";
import RootDiv from "../UI/RootDiv";

const AllCategories = (props) => {
  const isHide = props.hide && styles.onHide;
  return (
    <RootDiv>
      <div
        className={`d-flex overflow-auto mb-5 ${styles.categories} ${isHide}`}
      >
        {Categories.map((category, index) => {
          return (
            <CategoryCard
              link={category.link}
              img={category.img}
              name={category.name}
              key={index}
              id={props.categoryName}
              hide={props.hide}
            />
          );
        })}
      </div>
    </RootDiv>
  );
};
export default AllCategories;
