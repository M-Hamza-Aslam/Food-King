import styles from "./ProfileIcon.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { logout } from "../../Data/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  MdPersonOutline,
  MdOutlineFastfood,
  MdExitToApp,
} from "react-icons/md";
import { userActions } from "../../store/userSlice";

const ProfileIcon = () => {
  const userData = useSelector((state) => state.user.user);
  const userName = userData.name;
  const dispatch = useDispatch();

  //extracting first letters of name
  const namearr = userName.split(" ");
  let nameLetters = namearr[0][0];
  if (namearr[1]) {
    nameLetters += namearr[1][0];
  }
  nameLetters = nameLetters.toUpperCase();

  const navigate = useNavigate();
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
  const logoutHandler = async () => {
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    await logout();
    dispatch(userActions.clearUserData());
    navigate("/login");
    //noti
    notify("success", '"Signed out successfully!"');
  };
  return (
    <div className="ms-5">
      <Dropdown as={ButtonGroup} className={styles.profile}>
        <Dropdown.Toggle id="dropdown-custom-1">{nameLetters}</Dropdown.Toggle>
        <Dropdown.Menu align="end" className={styles.menu}>
          <Link to="/my-fk">
            <Dropdown.Item as={Button}>
              <MdPersonOutline />
              <span>My FK</span>
            </Dropdown.Item>
          </Link>
          <Link to="/promos">
            <Dropdown.Item as={Button}>
              <MdOutlineFastfood />
              <span>Promos</span>
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item as={Button} onClick={logoutHandler}>
            <MdExitToApp />
            <span>Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export default ProfileIcon;
