import RootDiv from "../UI/RootDiv";
import styles from "./Footer.module.css";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const googlebtn = require("../../images/google-play-badge.png");
const applebtn = require("../../images/applebtn.png");

const logo = require("../../images/FoodKingLogo.png");
const Footer = () => {
  const userId = useSelector((state) => state.user.user.uid);
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
  const routerHandler = (id) => {
    if (userId === "") {
      notify("error", "You have to login first");
      return;
    }
    navigate(`/${id}`);
  };
  return (
    <footer>
      <div className={styles.footer}>
        <RootDiv>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <div className={styles.verticalbar}></div>
            <div className={styles.social}>
              <p>Find us on</p>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF style={{ color: "blue" }} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube style={{ color: "red" }} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram style={{ color: "black" }} />
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <h6>Information</h6>
              <button onClick={() => routerHandler("my-fk")}>
                Personal Info
              </button>
              <button onClick={() => routerHandler("my-fk")}>
                Past Orders
              </button>
              <button onClick={() => routerHandler("my-fk")}>Favourites</button>
              <button onClick={() => routerHandler("promos")}>Promos</button>
            </div>
            <div>
              <h6>Locations</h6>
              <Link to="contact-us">
                <button>Contact Us</button>
              </Link>
            </div>
            <div>
              <h6>Get in Touch</h6>
              <Link to="terms-conditions">
                <button>Terms & Conditions</button>
              </Link>
            </div>
            <div className={styles.buttonDiv}>
              <img width="133px" src={googlebtn} alt="get it on google store" />
              <img width="133px" src={applebtn} alt="get it on apple store" />
            </div>
          </div>
        </RootDiv>
      </div>
    </footer>
  );
};
export default Footer;
