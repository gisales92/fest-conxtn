import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/navigation/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import { authenticate } from "./store/session";
import { modalSelector } from "./store/ui";
import Modal from "./components/modals/Modal";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const modal = useSelector(modalSelector);

  useEffect(() => {
    if (!loaded) {
      (async () => {
        try {
          await dispatch(authenticate());
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [dispatch, modal, loaded]);

  return (
    <div>
      {modal && <Modal />}
      <BrowserRouter>
        <NavBar />

        {loaded ? (
          <Switch>
            <Route path="/" exact={true}>
              Home Page Component
            </Route>

            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>

            <Route path="/signup" exact={true}>
              <SignupPage />
            </Route>
          </Switch>
        ) : (
          <div className="fill-screen center-content">
            Loading...
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
