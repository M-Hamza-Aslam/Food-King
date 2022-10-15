import styles from "./Favorites.module.css";
import { items } from "../../Data/Data";
import ItemsGrid from "../Item/ItemsGrid";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Favorites = () => {
  const [favItems, setFavItems] = useState([]);
  const favItemsTitles = useSelector((state) => state.user.user.favorites);
  //making favorites items array
  useEffect(() => {
    const favItemsArrays = Object.keys(items).map((category) => {
      const singleCategoryItems = items[category].itemsInfo.filter((item) => {
        return favItemsTitles.includes(item.title);
      });
      return singleCategoryItems;
    });
    let favItemsArr = [];
    for (let arr of favItemsArrays) {
      favItemsArr = [...favItemsArr, ...arr];
    }
    setFavItems(favItemsArr);
  }, [favItemsTitles]);
  return (
    <div className={styles.maindiv}>
      <h1>Favourites</h1>
      <ItemsGrid isFav={true} items={favItems} />
    </div>
  );
};
export default Favorites;
