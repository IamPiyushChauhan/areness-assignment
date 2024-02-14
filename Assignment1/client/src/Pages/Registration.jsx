import { useState } from "react";
import { validateEmail } from "./Utils";
import "../Styles/Registration.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

// Component for displaying password error message
const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function Registration() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [encryptedPassword, setEncryptedPassword] = useState(""); // State for encrypted password
  const [personType, setPersonType] = useState("role"); // State for person type (role)

  const [padBlur, setPadBlur] = useState(false); // State to track password input blur

  // Function to check if form is valid
  const getIsFormValid = () => {
    return (
      username &&
      validateEmail(email) &&
      encryptedPassword.length >= 8 &&
      personType !== "role"
    );
  };

  // Function to clear form fields
  const clearForm = () => {
    setUsername("");
    setEmail("");
    setEncryptedPassword("");
    setPersonType("role");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/hello",
        { email, username, encryptedPassword, personType },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        // Display success message
        toast("Registration successful!", {
          position: "top-center",
          autoClose: 3000
        });

        // Redirect to sign-in page after successful registration
        setTimeout(() => {
          navigate("/singin");
        }, 2000);
      } else {
        // Display error message for registration failure
        toast.error("Registration failed:", {
          position: "top-center",
          autoClose: 3000
        });
      }
    } catch (error) {
      // Handle errors
      console.error("Error registering user:", error);
      if (error.response) {
        if (error.response.status === 404) {
          // Display error message if user already exists
          toast(" already exist. Please log in.", {
            position: "top-center",
            autoClose: 3000
          });
        } else {
          // Display generic server error message
          toast.error("Server Error. Please try again later.", {
            position: "top-center",
            autoClose: 3000
          });
        }
      } else {
        // Display error message for network error
        toast.error("Network Error. Please check your internet connection.", {
          position: "top-center",
          autoClose: 3000
        });
      }
    }

    // Reset password input blur state and clear form
    setPadBlur(false);
    clearForm();
  };

  return (
    <div className="App-main">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          {/* Username input */}
          <div className="Field">
            <label>
              User name <sup>*</sup>
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="First name"
            />
          </div>

          {/* Email input */}
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

          {/* Password input */}
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
                setPadBlur(true);
              }}
              placeholder="Password"
            />
            {/* Display password error message if password length is less than 8 */}
            {padBlur && encryptedPassword.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </div>

          {/* Role select */}
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

          {/* Form submission and sign-in link */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {/* Submit button */}
              <button type="submit" disabled={!getIsFormValid()}>
                Create account
              </button>
            </div>
            <div>
              {/* Link to sign-in page */}
              <Link
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textDecoration: "none"
                }}
                to="/singin"
              >
                Sing in
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default Registration;
