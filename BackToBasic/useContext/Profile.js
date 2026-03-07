import React, { useContext } from "react";
import { UserContext } from "./App";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h1>User: {user}</h1>
      <button onClick={() => setUser("Guest")}>Logout</button>
    </div>
  );
};

export default Profile;
