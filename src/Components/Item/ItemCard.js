import Button from "react-bootstrap/Button";
import styles from "./ItemCard.module.css";
import FavoriteIcon from "./FavoriteIcon";
import ItemQuantity from "./ItemQuantity";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/CartSlice";

const ItemCard = (props) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [addedText, setAddedText] = useState(false);
  const cardClass = props.isFav
    ? `${styles.itemcard} ${styles.favitemcard}`
    : `${styles.itemcard}`;
  const addCartItem = () => {
    setAddedText(true);
    setTimeout(() => {
      setAddedText(false);
    }, 2000);

    const cartItem = {
      title: props.title,
      img: props.img,
      price: props.price,
      quantity,
    };
    dispatch(cartActions.addCartItem({ cartItem }));
    setQuantity(1);
  };
  return (
    <div className={cardClass}>
      <FavoriteIcon title={props.title} />
      <img src={props.img} alt={props.title} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <div>
        <h6>{`RS ${props.price}`}</h6>
        {props.isFav ? (
          <Button onClick={addCartItem} disabled={addedText}>
            {!addedText && <MdAddCircle />}
            {addedText ? "Added!" : "Add"}
          </Button>
        ) : (
          <ItemQuantity quantity={quantity} setQuantity={setQuantity} />
        )}
      </div>
      {!props.isFav && (
        <Button onClick={addCartItem} disabled={addedText}>
          {addedText ? "Added!" : "Add to Bucket"}
        </Button>
      )}
    </div>
  );
};
export default ItemCard;
