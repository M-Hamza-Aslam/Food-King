import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./AddressModal.module.css";
import { MdDriveFileRenameOutline, MdCheck } from "react-icons/md";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../Hooks/useInput";
import { userActions } from "../../store/userSlice";
import { updateAddressInDB, auth } from "../../Data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const AddressModal = (props) => {
  const userAddressArr = useSelector((state) => state.user.user.address);
  let userAddress;
  if (props.index === -1) {
    userAddress = { address: "", location: "Home" };
  } else {
    userAddress = userAddressArr[props.index];
  }
  const [tagLocationBtn, setTagLocationBtn] = useState(userAddress.location);
  const [isChange, setIsChange] = useState(
    userAddress.address === "" ? true : false
  );
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const homeBtnClass =
    tagLocationBtn === "Home" ? styles.btnActive : styles.btnNonActive;
  const officeBtnClass =
    tagLocationBtn === "Office" ? styles.btnActive : styles.btnNonActive;

  const partnerBtnClass =
    tagLocationBtn === "Partner" ? styles.btnActive : styles.btnNonActive;

  const otherBtnClass =
    tagLocationBtn === "Other" ? styles.btnActive : styles.btnNonActive;

  const tagLocationBtnClickHandler = (event) => {
    setTagLocationBtn(event.target.id);
  };
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
  const HideModalHandler = () => {
    if (userAddress.address !== "") {
      setIsChange(false);
    }
    addressReset();
    setTagLocationBtn(userAddress.location);
    props.onHide();
  };
  // input Authentication
  const {
    value: addressValue,
    isValid: addressIsValid,
    isError: addressIsError,
    inputKeyStrockHandler: addressInputKeyStrockHandler,
    inputBlurHandler: addressInputBlurHandler,
    reset: addressReset,
  } = useInput((addressValue) => {
    return addressValue.trim().length !== 0;
  });
  const addressInputClasses = addressIsError
    ? `${styles.locationInput} ${styles.inputInvalid}`
    : styles.locationInput;
  let formIsValid = false;
  if (addressIsValid) {
    formIsValid = true;
  }
  const addressFormHandler = (event) => {
    event.preventDefault();
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    if (!formIsValid) {
      return;
    }

    //saveing address in database
    const addressObj = { address: addressValue, location: tagLocationBtn };
    const updatedAddressArray = [...userAddressArr];
    if (props.index === -1) {
      updatedAddressArray.unshift(addressObj);
    } else {
      updatedAddressArray[props.index] = addressObj;
    }
    if (user) {
      updateAddressInDB(user.uid, updatedAddressArray);
    }
    //saving address in redux store
    dispatch(userActions.updateAddress({ addressArr: updatedAddressArray }));
    //reset input value
    addressReset();
    setIsChange(false);
    props.onHide();
  };
  return (
    <Modal
      show={props.show}
      onHide={HideModalHandler}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.modal}
      fullscreen="sm-down"
    >
      <form onSubmit={addressFormHandler}>
        <Modal.Header closeButton className="text-center border-0">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className={`fw-bold ${styles.modalTitle}`}
          >
            Complete your address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className={`form-control ${addressInputClasses}`}
              disabled={!isChange}
              placeholder={
                userAddress.address === ""
                  ? "Enter your address"
                  : userAddress.address
              }
              value={addressValue}
              onChange={addressInputKeyStrockHandler}
              onBlur={addressInputBlurHandler}
            />

            {!isChange && (
              <Button
                variant="outline"
                className="bg-transparent text-white d-flex align-items-center px-2 py-0 ms-3"
                onClick={() => setIsChange(true)}
              >
                <div className="d-flex align-items-center">
                  <MdDriveFileRenameOutline className={styles.pencilIcon} />
                  <h5 className="ms-2 fs-6">CHANGE</h5>
                </div>
              </Button>
            )}
          </div>
          {addressIsError && (
            <p className={styles.invalidtext}>
              Please fill the required informaiton!
            </p>
          )}
          {isChange && (
            <div className={` ${styles.tagLocation}`}>
              <p className="mb-0 text-align-center text-white fw-bold">
                Tag location:
              </p>
              <div className={styles.tagBtnDiv}>
                <Button
                  id="Home"
                  className={homeBtnClass}
                  onClick={tagLocationBtnClickHandler}
                >
                  <MdCheck id="Home" />
                  <h5 id="Home" className=" my-1 ">
                    Home
                  </h5>
                </Button>
                <Button
                  id="Office"
                  onClick={tagLocationBtnClickHandler}
                  className={officeBtnClass}
                >
                  <MdCheck id="Office" />
                  <h5 id="Office" className=" my-1 ">
                    Office
                  </h5>
                </Button>
                <Button
                  id="Partner"
                  onClick={tagLocationBtnClickHandler}
                  className={partnerBtnClass}
                >
                  <MdCheck id="Partner" />
                  <h5 id="Partner" className=" my-1">
                    Partner
                  </h5>
                </Button>
                <Button
                  id="Other"
                  onClick={tagLocationBtnClickHandler}
                  className={otherBtnClass}
                >
                  <MdCheck id="Other" />
                  <h5 id="Other" className=" my-1">
                    Other
                  </h5>
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          {isChange && (
            <Button
              type="submit"
              className="w-100 fw-bold"
              disabled={!formIsValid}
            >
              Confirm Address
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddressModal;
