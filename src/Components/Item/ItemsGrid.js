// import { items } from "../../Data/Data";
import RootDiv from "../UI/RootDiv";
import ItemCard from "./ItemCard";
import styles from "./ItemsGrid.module.css";

const ItemsGrid = (props) => {
  const classes = props.isFav ? styles.favitemsgrid : styles.itemsgrid;
  return (
    <RootDiv>
      <div className={classes}>
        {props.items.map((item, index) => {
          return (
            <ItemCard
              isFav={props.isFav}
              key={index}
              img={item.img}
              title={item.title}
              description={item.description}
              price={item.price}
            />
          );
        })}
      </div>
    </RootDiv>
  );
};
export default ItemsGrid;
