import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase/init";
import { Spin } from "antd";

function ProtectedRoute({ children, path }) {
  const [loggedIn, setLoggedIn] = React.useState(null);

  React.useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }, console.error);

    return () => {
      unsubscribe();
    };
  }, []);
  const location = useLocation();

  return loggedIn === null ? (
    <div
      style={{
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin />
    </div>
  ) : loggedIn ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
}

export default ProtectedRoute;
