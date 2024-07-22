import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5007/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login successful.");

      setRedirect(true);
    } catch (e) {
      alert("Login failed. please try again later");
    }
  }

  if (redirect) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="primary" type="submit">
            Login
          </button>

          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
