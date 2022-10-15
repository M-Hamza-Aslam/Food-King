import { Fragment } from "react";
import MainCarousel from "../Components/Carousel/MainCarousel";
import AllCategories from "../Components/Category/AllCategories";
import ItemsGrid from "../Components/Item/ItemsGrid";
import { TopSelling } from "../Data/Data";
import HorizontalBar from "../Components/UI/HorizontalBar";
const Home = () => {
  const title = TopSelling.title;
  const itemsInfo = TopSelling.itemsInfo;
  return (
    <Fragment>
      <MainCarousel />
      <HorizontalBar text="Browse Categories" />
      <AllCategories hide={false} />
      <HorizontalBar text={title} />
      <ItemsGrid items={itemsInfo} />
    </Fragment>
  );
};
export default Home;
