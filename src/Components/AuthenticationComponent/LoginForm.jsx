import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../API/userData";
import "../../Styles/Authentication/Login.scss";

const LOGIN_URL = "/auth";

function LoginForm() {
  // Hooks
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  // States
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Reset error message on input change
    setErrorMsg("");
  }, [userName, password]);

  const handleLogin = async () => {
    try {
      const response = await axios.POST(LOGIN_URL, {
        email: userName,
        pswd: password,
      });

      const { accessToken, id, roles, fName, lName } = response.data;
      setAuth({ id, roles, userName, fName, lName, accessToken });

      // Clear input fields
      setUserName("");
      setPassword("");

      navigate("/home", { replace: true });
    } catch (error) {
      console.error(error);

      if (!error.response) {
        setErrorMsg("No Server Response");
      } else if (error.response.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (error.response.status === 401) {
        setErrorMsg("Username or Password is incorrect");
      } else {
        setErrorMsg("Login Failed");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form id="login-form" className="login-form flex-column gap--1" onSubmit={handleSubmit}>
      <label htmlFor="email" className="offscreen">
        Email
      </label>
      <input
        id="email"
        type="text"
        placeholder="Email"
        required
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <label htmlFor="password" className="offscreen">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMsg && (
        <p className="error-msg" aria-live="assertive">
          {errorMsg}
        </p>
      )}

      <button type="submit" className="btn btn--primary">
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
