import RootDiv from "../UI/RootDiv";
import styles from "./Contact.module.css";
import StoreLocation from "./StoreLocation";
import { storeInfo } from "../../Data/contact";
import CustomerCare from "./CustomerCare";
import { MdCall, MdEmail } from "react-icons/md";

const Contact = () => {
  const offices = storeInfo.offices;
  const custCare = [
    {
      icon: <MdCall />,
      heading: "Helpline",
      text: storeInfo.helpline,
    },
    {
      icon: <MdEmail />,
      heading: "Complaints Email",
      text: storeInfo.complaintEmail,
    },
  ];
  return (
    <RootDiv>
      <div className={styles.mainDiv}>
        <h1 className={styles.heading}>Store Locations</h1>
        <div className={styles.storeAddress}>
          {offices.map((office) => {
            return <StoreLocation office={office} />;
          })}
        </div>
        <div className={styles.storeContact}>
          <CustomerCare data={custCare[0]} />
          <CustomerCare data={custCare[1]} />
        </div>
      </div>
    </RootDiv>
  );
};
export default Contact;
