import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [token, setToken] = useState("");
  const userIds = [754, 758]; // Hardcoded user IDs

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const user = {
      email: email.value,
      password: password.value,
    };
    try {
      const response = await axios.post(
        "https://api.playgroundtech.io/v1/login",
        user
      );
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token); // save token to localStorage
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`; // add token to request header

      // Get user data for hardcoded IDs
      const users = await Promise.all(
        userIds.map((id) =>
          axios.get(`https://api.playgroundtech.io/v1/users/${id}`)
        )
      );
      console.log(users.map((response) => response.data)); // Print user data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Log In</button>
      {token && <p>Your token is: {token}</p>}
    </form>
  );
};

export default Login;
