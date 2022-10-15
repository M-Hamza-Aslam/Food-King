import { Fragment } from "react";
import HorizontalBar from "../Components/UI/HorizontalBar";
import ItemsGrid from "../Components/Item/ItemsGrid";
import { items } from "../Data/Data";
import { useParams } from "react-router-dom";
import AllCategories from "../Components/Category/AllCategories";

const Category = () => {
  const params = useParams();
  const category = params.categoryId;
  const title = items[category].title;
  const itemsInfo = items[category].itemsInfo;
  return (
    <Fragment>
      <AllCategories hide={true} categoryName={title} />
      <HorizontalBar text={title} />
      <ItemsGrid items={itemsInfo} />
    </Fragment>
  );
};
export default Category;
