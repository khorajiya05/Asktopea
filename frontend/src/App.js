import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Asktopea from "./components/Asktopea";
import ViewQuestion from "./components/ViewQuestion";
import Question from "./components/Add-Question/Question";
import Auth from "./components/Auth";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import {useEffect} from "react";
import ResetPassword from "./components/Auth/ResetPassword";
import Profile from "./components/Profile";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  //----------------------Private router for 'LOGIN SESSION'-----------------------
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ 
              pathname: "/auth",
              state: { 
                from: props.location 
              },
           }}
          />
        )
      }
    />
  );

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path={user ? "/" : "/auth"}
            component={user ? Asktopea : Auth}
          />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path={"/profile"} component={Profile} />
          <PrivateRoute exact path="/" component={Asktopea} />
          <PrivateRoute exact path="/question" component={ViewQuestion} />
          <PrivateRoute exact path="/add-question" component={Question} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
