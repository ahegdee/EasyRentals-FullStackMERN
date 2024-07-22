import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }
  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }

  if (!ready) {
    return "Loading....";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"}></Navigate>;
  }

  const { subpage } = useParams();

  return (
    <div>
      <AccountNav></AccountNav>
      {subpage === undefined && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.username} ({user.email})<br></br>
          <button onClick={logout} className="primary max-w-md mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage></PlacesPage>}
    </div>
  );
};

export default ProfilePage;
