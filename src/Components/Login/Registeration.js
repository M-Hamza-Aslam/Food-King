import LoginForm from "./LoginForm";
import OTPForm from "./OTPForm";
import styles from "./Registeration.module.css";
import RootDiv from "../UI/RootDiv";
import { useState } from "react";

const loginGif = require("../../images/login.gif");

const Registeration = () => {
  const [isSendOTP, setIsSendOTP] = useState(false);
  const onSendOTP = (bool) => {
    setIsSendOTP(bool);
  };
  return (
    <RootDiv>
      <div className={styles.login}>
        <div>
          <img width="100%" src={loginGif} alt="login gif" />
        </div>
        <div>
          {!isSendOTP ? (
            <LoginForm sendOTP={onSendOTP} />
          ) : (
            <OTPForm sendOTP={onSendOTP} />
          )}
        </div>
      </div>
    </RootDiv>
  );
};
export default Registeration;
