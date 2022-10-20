import React, { useState } from "react";
import { getAuth } from "@firebase/auth";
import { firebaseApp } from "../firebase/init";

const useAuthListener = () => {
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
      }
    }, console.error);

    return () => {
      unsubscribe();
    };
  }, []);

  return { loggedIn, user };
};

export { useAuthListener };
