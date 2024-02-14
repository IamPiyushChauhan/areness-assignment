import React from "react";
import Cookies from "cookies-js";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  // Retrieve JWT token from cookie
  const jwtyoken = Cookies.get("token");

  // Initialize greeting variable
  let greeting;

  // Check if JWT token exists
  if (jwtyoken) {
    // Decode JWT token
    const decodedToken = jwtDecode(jwtyoken);

    // Determine greeting based on decoded role
    if (decodedToken.role === "user") {
      // Display "HELLO USER" greeting
      greeting = (
        <h1 style={{ fontSize: "60px", textAlign: "center" }}>
          HELLO{" "}
          <span style={{ fontSize: "60px", textAlign: "center", color: "red" }}>
            USER
          </span>
        </h1>
      );
    } else if (decodedToken.role === "admin") {
      // Display "HELLO ADMIN" greeting
      greeting = (
        <h1 style={{ fontSize: "60px", textAlign: "center" }}>
          HELLO{" "}
          <span style={{ fontSize: "60px", textAlign: "center", color: "red" }}>
            ADMIN
          </span>
        </h1>
      );
    } else {
      // Display default greeting if role is neither "user" nor "admin"
      greeting = (
        <h1 style={{ fontSize: "60px", textAlign: "center" }}>HELLO</h1>
      ); // Default greeting
    }
  } else {
    // Display default greeting if JWT token not found in cookie
    console.error("Token not found in cookie");
    greeting = <h1 style={{ fontSize: "60px", textAlign: "center" }}>HELLO</h1>; // Default greeting
  }

  return (
    <>
      <div className="" style={{ paddingTop: "100px" }}>
        {greeting}
      </div>
    </>
  );
};

export default Home;
