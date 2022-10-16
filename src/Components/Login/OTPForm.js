import styles from "./OTPForm.module.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { auth, OTPAuthentication } from "../../Data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import useInput from "../../Hooks/useInput";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { userActions } from "../../store/userSlice";

const OTPForm = (props) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [showSpinner, setShowSpinner] = useState(false);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signInNotify = () => {
    toast.success("Signed in successfully!", {
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
  //Form Handling
  const {
    value: OTPValue,
    isValid: OTPIsValid,
    isError: OTPIsError,
    inputKeyStrockHandler: OTPInputKeyStrockHandler,
    inputBlurHandler: OTPInputBlurHandler,
    reset: OTPReset,
  } = useInput((OTPValue) => {
    return OTPValue.trim().length === 6;
  });

  let formIsValid = false;
  if (OTPIsValid) {
    formIsValid = true;
  }
  const OTPClasses = OTPIsError
    ? `${styles.input} ${styles.inputInvalid}`
    : styles.input;

  const OTPFormHandler = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    if (!formIsValid) {
      return;
    }
    //authenticating and storing data into DataBase
    dispatch(userActions.changeLoadingState({ loading: true }));
    await OTPAuthentication(OTPValue, userState.user.name);
    dispatch(userActions.changeLoadingState({ loading: false }));
    setShowSpinner(false);
    OTPReset();
  };
  const changeNumberHandler = () => {
    props.sendOTP(false);
  };

  useEffect(() => {
    if (loading) {
      //loading spinner
      return;
    }
    if (user) {
      navigate("/");
      signInNotify();
    }
  }, [user, loading, navigate]);
  return (
    <form onSubmit={OTPFormHandler} className="w-100">
      <div>
        <h3 className="text-white">OTP Verification!</h3>
        <div className="mt-4">
          <label htmlFor="OTP" className="text-white mb-2">
            Please enter 6 digit OTP sent to your phone number
          </label>
          <input
            id="OTP"
            type="text"
            className={`form-control text-white ${OTPClasses}`}
            placeholder="XXXXXX"
            maxLength="6"
            onChange={OTPInputKeyStrockHandler}
            onBlur={OTPInputBlurHandler}
            value={OTPValue}
          />
        </div>
        <Button
          disabled={!formIsValid || showSpinner}
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
              <span className={styles.otpMsg}>Verifying</span>
            </div>
          ) : (
            "Verify"
          )}
        </Button>
        <Button
          type="button"
          className="w-100 mt-4 fw-bold"
          onClick={changeNumberHandler}
        >
          Change Phone Number
        </Button>
      </div>
    </form>
  );
};
export default OTPForm;
