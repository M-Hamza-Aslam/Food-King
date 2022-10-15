import styles from "./PhoneNumberInput.module.css";
import { MdReport } from "react-icons/md";
import MainDiv from "../UI/MainDiv";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import useInput from "../../Hooks/useInput";

const PhoneNumberInput = (props) => {
  const userInfo = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  let pNumber = userInfo.number;
  pNumber = pNumber.slice(1);
  const {
    value: numberValue,
    isValid: numberIsValid,
    isError: numberIsError,
    inputKeyStrockHandler: numberInputKeyStrockHandler,
    inputBlurHandler: numberInputBlurHandler,
    // reset: numberReset,
  } = useInput((numberValue) => {
    return numberValue.trim().length === 12 && numberValue.slice(0, 2) === "92";
  }, pNumber);

  const numberInputClasses = numberIsError
    ? `${styles.input} ${styles.inputInvalid}`
    : styles.input;

  const blurHandler = () => {
    numberInputBlurHandler();
    if (numberIsValid) {
      //updating in redux store
      dispatch(
        userActions.updatePhoneNumber({ phoneNumber: `+${numberValue}` })
      );
    }
  };
  const focusHandler = () => {
    dispatch(userActions.updatePhoneNumber({ phoneNumber: "" }));
  };

  return (
    <MainDiv>
      <label htmlFor="number" className={styles.inputLabel}>
        Phone Number
      </label>
      <input
        id="number"
        type="number"
        className={`form-control text-white ${numberInputClasses}`}
        placeholder="92XXXXXXXXXX (12 digits)"
        value={numberValue}
        onChange={numberInputKeyStrockHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
      />
      {numberIsError && (
        <p className={styles.invalidtext}>Invalid phone number!</p>
      )}
      <div className={styles.notice}>
        <MdReport />
        <span>
          Phone number is required for users logged in through their Google
          accounts
        </span>
      </div>
    </MainDiv>
  );
};
export default PhoneNumberInput;
