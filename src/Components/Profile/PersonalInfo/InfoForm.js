import styles from "./InfoForm.module.css";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { updatePersonalInfoInDB, auth } from "../../../Data/firebase";
import { userActions } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { toast } from "react-toastify";

const InfoForm = (props) => {
  const userState = useSelector((state) => state.user.user);
  const [gender, setGender] = useState(userState.gender);
  const [DOB, setDOB] = useState(userState.DOB);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

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

  const infoFormSubmitHandler = (event) => {
    event.preventDefault();
    if (!navigator.onLine) {
      notify("error", "You have no internet connection");
      return;
    }
    //updating info in DB
    updatePersonalInfoInDB(user.uid, { DOB, gender });
    //updating in redux store
    dispatch(userActions.updatePersonalInfo({ DOB, gender }));
    props.updateIsEdit(false);
  };
  return (
    <div className={styles.rootDiv}>
      <Form onSubmit={infoFormSubmitHandler}>
        <div className={styles.formInputs}>
          <div className={styles.inputComp}>
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value="Male" className={styles.try}>
                Male
              </option>
              <option value="Female">Female</option>
              <option value="Unknown">Unknown</option>
            </Form.Select>
          </div>
          <div className={styles.inputComp}>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="datepic"
              placeholder="DateRange"
              value={DOB}
              onChange={(event) => setDOB(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.formButtons}>
          <Button
            className={styles.cancelButton}
            onClick={() => props.updateIsEdit(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Done</Button>
        </div>
      </Form>
    </div>
  );
};
export default InfoForm;
