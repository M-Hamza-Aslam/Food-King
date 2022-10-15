import { toast } from "react-toastify";

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBzOWAZR12dBe0jiT13IOiwTvX7-NVaPOY",
  authDomain: "food-king-624d1.firebaseapp.com",
  projectId: "food-king-624d1",
  storageBucket: "food-king-624d1.appspot.com",
  messagingSenderId: "122535847643",
  appId: "1:122535847643:web:70b72467258868b8bdcefe",
};
//error notifier
// const defaultMsg = `An error occured ${String.fromCodePoint(
//   0x1f61e
// )} try again after a minute`;
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//google authentication
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (error) {
    console.error(error);
    notify("error", error.message);
  }
};
//phone authentication
auth.useDeviceLanguage();

const phoneAuthentication = async (phoneNumber) => {
  try {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   onSignInSubmit();
        },
      },
      auth
    );
    const result = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );
    window.result = result;
    return true;
  } catch (error) {
    console.log(error);
    notify("error", error.message);
    return false;
  }
};
const OTPAuthentication = async (OTP, userName) => {
  try {
    const result = window.result;
    const response = await result.confirm(OTP);
    const user = response.user;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        uid: user.uid,
        name: userName,
        authProvider: "phone",
        number: user.phoneNumber,
      });
    }
  } catch (error) {
    console.log(error);
    notify("error", error.message);
  }
};

const logout = async () => {
  await signOut(auth);
};

const fetchUserData = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (error) {
    console.log(error);
    notify("error", error.message);
  }
};

const updateFavItem = async (uid, newFavArray) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      favorites: newFavArray,
    });
  } catch (error) {
    console.log(error);
    notify("error", error.message);
  }
};
const updateAddressInDB = async (uid, userAddressArr) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      address: userAddressArr,
    });
  } catch (error) {
    console.log(error);
    notify("error", error.message);
  }
};
const updatePersonalInfoInDB = async (uid, userInfo) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      DOB: userInfo.DOB,
      gender: userInfo.gender,
    });
  } catch (error) {
    console.log(error);
    notify("error", error.message);
  }
};
const updateInstructionsInDB = async (uid, instructions) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      specialInstructions: instructions,
    });
  } catch (error) {
    console.log("errr", error);
    notify("error", error.message);
  }
};
const updatePhoneNumberInDB = async (uid, phoneNumber) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      number: phoneNumber,
    });
  } catch (error) {
    console.log(error);
    notify("error", error.message);
  }
};
const verifyCouponCode = async (userCouponCode) => {
  try {
    //fetch coupon array from database
    const docRef = doc(db, "coupon", "coupon");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    //check user provided coupon code
    const discountCouponObj = data.code.find((couponObj) => {
      return couponObj.code === userCouponCode;
    });
    //return amount
    if (discountCouponObj) {
      return discountCouponObj.value;
    } else {
      return -1;
    }
  } catch (error) {
    console.log(error);
    notify("error", error.message);
  }
};
const saveNewOrderInDB = async (uid, NewOrderArr) => {
  try {
    //updating by adding new order
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      orders: NewOrderArr,
    });
  } catch (error) {
    console.log(error);
    notify("error", error.message);
  }
};
export {
  auth,
  db,
  signInWithGoogle,
  phoneAuthentication,
  OTPAuthentication,
  logout,
  fetchUserData,
  updateFavItem,
  updateAddressInDB,
  updatePersonalInfoInDB,
  updateInstructionsInDB,
  updatePhoneNumberInDB,
  verifyCouponCode,
  saveNewOrderInDB,
};
