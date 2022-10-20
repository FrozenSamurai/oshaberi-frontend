import React, { useContext } from "react";
import { Button, Card, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signInWithGoogle } from "../firebase/authApi";
import { useLocation, useHistory } from "react-router-dom";
import { getAuth } from "@firebase/auth";
import { firebaseApp } from "../firebase/init";
import { UserContext } from "../context/UserContext";

const { Text } = Typography;

function Login() {
  const location = useLocation();
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  React.useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.replace("/");
      }
    }, console.error);

    return () => {
      unsubscribe();
    };
  }, [history, location.state, setUser]);

  const onSignInPress = () => {
    signInWithGoogle(() => {}, console.error);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 64px)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card title="Login" style={{ width: 300 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Use your Google account to sign in.</Text>
          <Button
            type="primary"
            style={{ marginTop: 14 }}
            onClick={onSignInPress}
          >
            <GoogleOutlined />
            Login with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;
