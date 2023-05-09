import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [users, setUsers] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = event.target.elements;
    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await axios.post(
        "https://api.playgroundtech.io/v1/users",
        newUser
      );
      setUsers([...users, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
