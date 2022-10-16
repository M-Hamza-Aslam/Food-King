import styles from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import useInput from "../../Hooks/useInput";
import { userActions } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
//firebase authentication
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  signInWithGoogle,
  phoneAuthentication,
} from "../../Data/firebase";
//
const googleIcon = require("../../images/googleicon.png");

const LoginForm = (props) => {
  const [user, loading] = useAuthState(auth);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // form Validation
  const {
    value: nameValue,
    isValid: nameIsValid,
    isError: nameIsError,
    inputKeyStrockHandler: nameInputKeyStrockHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useInput((nameValue) => {
    return nameValue.trim().length !== 0;
  });
  const {
    value: numberValue,
    isValid: numberIsValid,
    isError: numberIsError,
    inputKeyStrockHandler: numberInputKeyStrockHandler,
    inputBlurHandler: numberInputBlurHandler,
    reset: numberReset,
  } = useInput((numberValue) => {
    return numberValue.trim().length === 12 && numberValue.slice(0, 2) === "92";
  });
  let formIsValid = false;
  if (nameIsValid && numberIsValid) {
    formIsValid = true;
  }
  const nameInputClasses = nameIsError
    ? `${styles.input} ${styles.inputInvalid}`
    : styles.input;
  const numberInputClasses = numberIsError
    ? `${styles.input} ${styles.inputInvalid}`
    : styles.input;

  //notification function
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
  const signinHandler = async (event) => {
    event.preventDefault();
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    //show spinner
    setShowSpinner(true);

    if (!formIsValid) {
      return;
    }
    const response = await phoneAuthentication(`+${numberValue}`);
    //storing userName in redux store
    if (response) {
      dispatch(
        userActions.getUserData({
          name: nameValue,
          number: numberValue,
        })
      );
      nameReset();
      numberReset();
      //hide spinner
      setShowSpinner(false);
      props.sendOTP(true);
      notify("info", "OTP has been sent to your Number");
    }
  };
  const googleSignInHandler = async () => {
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    dispatch(userActions.changeLoadingState({ loading: true }));
    await signInWithGoogle();
    dispatch(userActions.changeLoadingState({ loading: false }));
  };

  useEffect(() => {
    if (loading) {
      // loading spinner
      return;
    }
    if (user) {
      console.log("entered to navigate back");
      navigate(-1);
      //notify
      notify("success", "Signed in successfully!");
    }
  }, [user, loading, navigate]);

  return (
    <form onSubmit={signinHandler} className="w-100">
      <div>
        <h3 className="text-white">Welcome!</h3>
        <div className="mt-4">
          <label htmlFor="name" className="text-white mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={`form-control text-white ${nameInputClasses}`}
            placeholder="Name"
            value={nameValue}
            onChange={nameInputKeyStrockHandler}
            onBlur={nameInputBlurHandler}
          />
          {nameIsError && (
            <p className={styles.invalidtext}>
              Please fill the required informaiton!
            </p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="number" className="text-white mb-2">
            Phone Number
          </label>
          <input
            id="number"
            type="number"
            className={`form-control text-white ${numberInputClasses}`}
            placeholder="92XXXXXXXXXX (12 digits)"
            value={numberValue}
            onChange={numberInputKeyStrockHandler}
            onBlur={numberInputBlurHandler}
          />
          {numberIsError && (
            <p className={styles.invalidtext}>Invalid phone number!</p>
          )}
        </div>
        <Button
          disabled={!formIsValid || showSpinner}
          id="sign-in-button"
          type="submit"
          className="w-100 mt-4 fw-bold"
        >
          {showSpinner ? (
            <div>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              ></Spinner>
              <span className={styles.otpMsg}>Sending OTP</span>
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </div>
      <div className="d-flex flex-column mt-4 justify-content-center align-items-center">
        <h3 className={styles.hrline}>
          <span>Or login with</span>
        </h3>
        <img
          src={googleIcon}
          alt="google icon"
          className={`my-2 ${styles.googleicon}`}
          onClick={googleSignInHandler}
        />
      </div>
    </form>
  );
};
export default LoginForm;
