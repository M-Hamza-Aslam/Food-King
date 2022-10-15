import DropDown from "../../UI/DropDown";
// import styles from "./PersonalInfo.module.css";

import { useState } from "react";
import InfoForm from "./InfoForm";
import InfoDisplay from "./InfoDisplay";
const PersonalInfo = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <DropDown heading="Personal Info">
      {isEdit ? (
        <InfoForm updateIsEdit={setIsEdit} />
      ) : (
        <InfoDisplay updateIsEdit={setIsEdit} />
      )}
    </DropDown>
  );
};
export default PersonalInfo;
