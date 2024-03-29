import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/navigation/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import EventList from "./components/events/EventList";
import EventDetail from "./components/events/EventDetail";
import { authenticate } from "./store/session";
import { fetchAllEvents } from "./store/events";
import { modalSelector } from "./store/ui";
import { getAllGenres } from "./store/genres";
import Modal from "./components/modals/Modal";
import GenreBar from "./components/events/GenreBar";
import GenreEventList from "./components/events/GenreEventList";
import User from "./components/user/User";
import Profile from "./components/profile/Profile";
import Footer from "./components/Footer";
import "./styles/footer.css"

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const modal = useSelector(modalSelector);

  useEffect(() => {
    if (!loaded) {
      (async () => {
        try {
          await dispatch(fetchAllEvents());
          await dispatch(getAllGenres());
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
              <GenreBar />
              <EventList />
            </Route>

            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>

            <Route path="/signup" exact={true}>
              <SignupPage />
            </Route>

            <Route path="/users/:username" exact={true}>
              <User />
            </Route>

            <Route path="/events/:url" exact={true}>
              <EventDetail />
            </Route>

            <Route path="/genres/:genre" exact={true}>
              <GenreBar />
              <GenreEventList />
            </Route>

            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
          </Switch>
        ) : (
          <div className="fill-screen center-content">Loading...</div>
        )}

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
