import CheckoutAddress from "../CheckoutAddress";
import styles from "./DeliveryDetails.module.css";
import Button from "react-bootstrap/Button";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import AddressModal from "../../Header/AddressModal";
import OtherSavedAddress from "./OtherSavedAddress";
import { MdReportProblem } from "react-icons/md";
import MainDiv from "../../UI/MainDiv";

const DeliveryDetails = () => {
  const [modalShow, setModalShow] = useState(false);
  const addressArr = useSelector((state) => state.user.user.address);
  const isFirstAddress = addressArr[0].address === "" ? true : false;
  // const OtherSavedAddressArr = [...addressArr]
  // OtherSavedAddressArr.shift()

  // const firstAdressTag = (
  //   <CheckoutAddress addressInfo={{ address: addressArr[0], addIndex: 0 }} />
  // );
  return (
    <MainDiv className="mt-0">
      <div className={styles.deliveryDiv}>
        <h6>Delivery Details</h6>

        {isFirstAddress ? (
          <div className={styles.warningDiv}>
            <MdReportProblem />
            <p>Complete your address</p>
          </div>
        ) : (
          <Fragment>
            <CheckoutAddress
              addressInfo={{ address: addressArr[0], addIndex: 0 }}
            />{" "}
            {addressArr.length > 1 && (
              <OtherSavedAddress addressArr={addressArr} />
            )}
          </Fragment>
        )}
        <Button
          className={styles.newAddress}
          onClick={() => setModalShow(true)}
        >
          Add New Address
        </Button>
      </div>
      {modalShow && (
        <AddressModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          index={isFirstAddress ? 0 : -1}
        />
      )}
    </MainDiv>
  );
};
export default DeliveryDetails;
