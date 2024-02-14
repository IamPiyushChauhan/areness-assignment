import { useState } from "react";
import { validateEmail } from "./Utils";
import "../Styles/Registration.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "cookies-js";
const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function Singin() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [personType, setPersonType] = useState("role");
  const [padblure, setPadblure] = useState(false);
  const getIsFormValid = () => {
    return (
      validateEmail(email) &&
      encryptedPassword.length >= 8 &&
      personType !== "role"
    );
  };

  const clearForm = () => {
    setEmail("");
    setEncryptedPassword("");
    setPersonType("role");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/singin",
        { email, encryptedPassword, personType },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        Cookies.set("token", response.data.token, {
          expires: expirationDate,
          path: "/"
        });

        toast("Sign-in successful!", {
          position: "top-center",
          autoClose: 3000
        });

        setTimeout(() => {
          Navigate("/"); // Redirect to home page after successful sign-in
        }, 3000);
      } else {
        toast.error(" Invalid password", {
          position: "top-center",
          autoClose: 3000
        });
      }
    } catch (error) {
      toast.error("Invalid User", {
        position: "top-center",
        autoClose: 3000
      });
    }
    setPadblure(false);
    clearForm();
  };
  return (
    <div className="App-main">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign In</h2>

          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
            />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              value={encryptedPassword}
              type="password"
              onChange={(e) => {
                setEncryptedPassword(e.target.value);
              }}
              onBlur={() => {
                setPadblure(true);
              }}
              placeholder="Password"
            />
            {padblure && encryptedPassword.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </div>

          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select
              value={personType}
              onChange={(e) => setPersonType(e.target.value)}
            >
              <option value="">Select Below</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <button type="submit" disabled={!getIsFormValid()}>
                Sing In
              </button>
            </div>
            <div>
              <Link
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textDecoration: "none"
                }}
                to="/singup"
              >
                Log Up
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Singin;
