import { createContext, useState } from "react";
import Profile from "./Profile";

export const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState("Bhavesh");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Profile />
    </UserContext.Provider>
  );
}
