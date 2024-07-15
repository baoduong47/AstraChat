import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fistname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Preserve the other fields
      [name]: value, // Update the specific field that changed
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div>
      <p>This is the Signup Screen</p>
      <form onSubmit={handleSubmit}>
        <input
          type="firstname"
          id="firstname"
          name="firstname"
          placeholder="firstname"
          value={formData.firstname}
          onChange={handleChange}
        ></input>
        <input
          type="lastname"
          id="lastname"
          name="lastname"
          placeholder="lastname"
          value={formData.lastname}
          onChange={handleChange}
        ></input>
        <input
          type="username"
          id="username"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
