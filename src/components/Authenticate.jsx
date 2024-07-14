import React from "react";
import { useState } from "react";

export default function Authenticate({ token }, { setToken }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    // if (!token) {
    //   return <div>Sorry, Please enter a username and password first.</div>;
    // }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonResponse = await response.json();
      const { message, data } = jsonResponse;
      setSuccessMessage(`${data.username} You Have Been ${message}`);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
