import styles from "./Header.module.css";
import AddressModal from "./AddressModal";
import RootDiv from "../UI/RootDiv";
import ProfileIcon from "./ProfileIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//bootstrap imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
//firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { MdLocationPin, MdArrowDropDown } from "react-icons/md";
import { auth } from "../../Data/firebase";
import CartBtn from "../Cart/CartBtn";

const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  const [user] = useAuthState(auth);
  const userAddress = useSelector((state) => state.user.user.address[0]);
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <header className={styles.header}>
      <RootDiv>
        <Navbar className="pb-0 pb-md-2" bg="transparent">
          <Container fluid className="my-1 my-md-2 p-0">
            <Link to="/" className={`${styles.logo}`}>
              <Navbar.Brand className="d-flex">
                <h5 className="text-white fs-1 fs-bold fst-italic ">FK</h5>
              </Navbar.Brand>
            </Link>
            <Nav className="ms-auto align-items-center">
              <div className={`me-5 d-none d-md-block`}>
                <Button
                  className={`d-flex align-items-center px-3 py-2 rounded-pill ${styles.addressbtn} `}
                  onClick={() => setModalShow(true)}
                >
                  <MdLocationPin className={styles.locationIcon} />
                  <h5 className={`mx-3`}>
                    {userAddress.address === ""
                      ? "Enter Your Address"
                      : userAddress.address}
                  </h5>
                  <MdArrowDropDown className={styles.dropDownIcon} />
                </Button>
                <AddressModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  index={0}
                />
              </div>
              <CartBtn totalCartItems={cartItems.length} clickAllow={true} />
              <div>
                {user ? (
                  <ProfileIcon />
                ) : (
                  <Link to="/login">
                    <Button className="ms-3 ms-sm-5">Register / Sign in</Button>
                  </Link>
                )}
              </div>
            </Nav>
          </Container>
        </Navbar>
        <div className={`d-block d-md-none pb-2 ${styles.smallAdressBtn}`}>
          <Button
            className={`d-flex align-items-center px-1 py-1 ${styles.addressbtn}`}
            onClick={() => setModalShow(true)}
          >
            <MdLocationPin className={styles.locationIcon} />
            <h5 className={`mx-1`}>
              {userAddress.address === ""
                ? "Enter Your Address"
                : userAddress.address}
            </h5>
            <MdArrowDropDown className={styles.dropDownIcon} />
          </Button>
        </div>
      </RootDiv>
    </header>
  );
};
export default Header;
