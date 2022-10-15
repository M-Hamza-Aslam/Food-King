import { Fragment } from "react";
import styles from "./FavoriteIcon.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { updateFavItem, auth } from "../../Data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { toast } from "react-toastify";

const FavoriteIcon = (props) => {
  const userState = useSelector((state) => state.user.user);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const notify = (action, msg) => {
    toast[action](msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const addFavItem = () => {
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    //add in Redux store
    const newFavArray = [...userState.favorites, props.title];
    updateFavItem(user.uid, newFavArray);
    //add in firestore database
    dispatch(userActions.updateFavorites({ newFavArray }));
  };
  const removeFavItem = () => {
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    //remove from Redux store
    const newFavArray = userState.favorites.filter(
      (favItem) => favItem !== props.title
    );
    updateFavItem(user.uid, newFavArray);
    //remove from firestore database
    dispatch(userActions.updateFavorites({ newFavArray }));
  };
  let isFav;
  isFav = userState.favorites.find((favItem) => favItem === props.title);

  return (
    <Fragment>
      {isFav && user && (
        <MdFavorite className={styles.favIcon} onClick={removeFavItem} />
      )}
      {!isFav && user && (
        <MdFavoriteBorder className={styles.favIcon} onClick={addFavItem} />
      )}
    </Fragment>
  );
};
export default FavoriteIcon;
