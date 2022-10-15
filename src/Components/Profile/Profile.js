import styles from "./Profile.module.css";
import RootDiv from "../UI/RootDiv";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import PastOrders from "./PastOrders/PastOrders";
import Favorites from "./Favorites";
import { useSelector } from "react-redux";
import AddressGrid from "./AddressGrid";

const Profile = () => {
  const userData = useSelector((state) => state.user.user);
  const userName = userData.name;
  return (
    <RootDiv>
      <div className={styles.profile}>
        <h1 className={styles.profileHeading}>{`Hello ${userName}!`}</h1>
        <PersonalInfo />
        <AddressGrid />
        <PastOrders />
        <Favorites />
      </div>
    </RootDiv>
  );
};
export default Profile;
