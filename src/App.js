import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Messages, Communities, Explore, Home } from "./pages";
import { Layout } from "antd";
import "antd/dist/antd.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import { useAuthListener } from "./utils/hooks";

import NavBar from "./components/Header";

const { Content } = Layout;

function App() {
  const { loggedIn, user } = useAuthListener();
  const [showOpenMessageAlert, setShowOpenMessageAlert] = useState(true);

  return (
    <Router>
      <Layout>
        <NavBar loggedIn={loggedIn} user={user} />
        <Content
          className="site-layout"
          style={{
            marginTop: 64,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Switch>
            <ProtectedRoute path="/messages">
              <Messages
                showOpenMessageAlert={showOpenMessageAlert}
                setShowOpenMessageAlert={setShowOpenMessageAlert}
              />
            </ProtectedRoute>
            <ProtectedRoute path="/explore">
              <Explore />
            </ProtectedRoute>
            <ProtectedRoute path="/communities">
              <Communities
                showOpenMessageAlert={showOpenMessageAlert}
                setShowOpenMessageAlert={setShowOpenMessageAlert}
              />
            </ProtectedRoute>
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute path="/">
              <Home setShowOpenMessageAlert={setShowOpenMessageAlert} />
            </ProtectedRoute>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
