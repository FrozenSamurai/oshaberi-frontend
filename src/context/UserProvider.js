import { useState } from "react";
import { UserContext } from "./UserContext";
const { Provider } = UserContext;

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  return <Provider value={{ user, setUser }}>{props.children}</Provider>;
};
