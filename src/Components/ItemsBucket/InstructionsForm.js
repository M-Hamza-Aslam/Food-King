import { Button, Form } from "react-bootstrap";
import styles from "./InstructionsForm.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Data/firebase";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { updateInstructionsInDB } from "../../Data/firebase";
import { MdCheck } from "react-icons/md";
import { toast } from "react-toastify";
const InstructionsForm = () => {
  const [user] = useAuthState(auth);
  const userInstructions = useSelector(
    (state) => state.user.user.specialInstructions
  );
  const [instructionInputValue, setInstructionInputValue] =
    useState(userInstructions);
  const [isDone, setIsDone] = useState(false);
  const saveForFutureRef = useRef();

  const navigate = useNavigate();
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

  const checkoutHandler = () => {
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    user ? navigate("/checkout") : navigate("/login#backtobucket");
  };
  const instructionHandler = (e) => {
    setIsDone(false);
    setInstructionInputValue(e.target.value);
  };
  const formHandler = (e) => {
    e.preventDefault();
    setIsDone(true);
    const instruction = instructionInputValue;
    const isChecked = saveForFutureRef.current.checked;
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    //update in redux store
    dispatch(
      userActions.updateSpecialInstructions({
        specialInstructions: instruction,
      })
    );
    //update in database
    if (isChecked) {
      if (!user) {
        navigate("/login");
        return;
      } else updateInstructionsInDB(user.uid, instruction);
    }
    //success notification
    notify("success", "Instructions has been saved successfully");
  };
  return (
    <div className={styles.formDiv}>
      <Form onSubmit={formHandler} className={styles.instructionform}>
        <textarea
          rows="3"
          type="text"
          className="form-control"
          placeholder="Special Instructions (optional)"
          maxLength="20"
          value={instructionInputValue}
          onChange={instructionHandler}
        />
        <div className={styles.checkDiv}>
          <Form.Check
            className={styles.checkbox}
            type="checkbox"
            id="default-checkbox"
            label="Save for future"
            ref={saveForFutureRef}
          />
          {isDone ? (
            <div className={styles.doneMsg}>
              <MdCheck />
              <span>Done</span>
            </div>
          ) : (
            <p>{instructionInputValue.length}/20</p>
          )}
        </div>
        <Button type="submit" className={styles.doneBtn}>
          Done
        </Button>
        <Button type="button" onClick={checkoutHandler}>
          Proceed to Checkout
        </Button>
      </Form>
    </div>
  );
};
export default InstructionsForm;
