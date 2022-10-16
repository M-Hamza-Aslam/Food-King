import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import React, { Fragment, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth, fetchUserData } from "./Data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { userActions } from "./store/userSlice";
import { cartActions } from "./store/CartSlice";

const logo = require("./images/FoodKingLogo.png");

function App() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const userUid = useSelector((state) => state.user.user.uid);
  const isloading = useSelector((state) => state.user.loading);
  const location = useLocation();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      dispatch(cartActions.fetchCartItem({ cartItems }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && !isloading) {
      const fetchingData = async () => {
        const userData = await fetchUserData(user.uid);
        dispatch(userActions.getUserData(userData));
      };
      fetchingData();
    }
  }, [user, isloading, dispatch]);
  // on loading every page making scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isFetchingUserData = loading || (user && userUid === "");

  //pages: lazy loading
  const Home = React.lazy(() => import("./pages/Home"));
  const Category = React.lazy(() => import("./pages/Category"));
  const Login = React.lazy(() => import("./pages/Login"));
  const Promos = React.lazy(() => import("./pages/Promos"));
  const MyFk = React.lazy(() => import("./pages/MyFk"));
  // const OrderHistory = React.lazy(() => import("./pages/OrderHistory"));
  const Bucket = React.lazy(() => import("./pages/Bucket"));
  const Checkout = React.lazy(() => import("./pages/Checkout"));
  const ContactUs = React.lazy(() => import("./pages/ContactUs"));
  const TermsAndConditions = React.lazy(() =>
    import("./pages/TermsAndConditions")
  );

  return (
    <Fragment>
      {isFetchingUserData ? (
        <div className="loadingDiv">
          <img src={logo} alt="logo" />
        </div>
      ) : (
        <Fragment>
          <Header />
          <main>
            <Suspense
              fallback={
                <div className="loadingDiv">
                  <img src={logo} alt="logo" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route
                  path="/login"
                  element={
                    !user ? (
                      <Login />
                    ) : location.hash === "" ? (
                      <Navigate to="/" replace={true} />
                    ) : (
                      <Navigate to="/bucket" />
                    )
                  }
                />
                <Route
                  path="/promos"
                  element={
                    user ? <Promos /> : <Navigate to="/login" replace={true} />
                  }
                />

                <Route
                  path="/my-fk"
                  element={
                    user ? <MyFk /> : <Navigate to="/login" replace={true} />
                  }
                />
                {/* {user && (
                  <Route path="/order-history" element={<OrderHistory />} />
                )} */}
                <Route
                  path="/checkout"
                  element={
                    user ? (
                      <Checkout />
                    ) : (
                      <Navigate to="/login" replace={true} />
                    )
                  }
                />
                <Route path="/bucket" element={<Bucket />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route
                  path="/terms-conditions"
                  element={<TermsAndConditions />}
                />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </Fragment>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="closebutton"
      />
    </Fragment>
  );
}

export default App;
