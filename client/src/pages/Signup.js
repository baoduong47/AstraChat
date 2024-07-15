import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/authActions";

const Signup = () => {
  const [formData, setFormData] = useState({
    fistname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.eror);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    console.log("Form submitted", formData);
  };

  return (
    <div>
      <p>Sign Up</p>
      {authError && <p className="error">{authError.message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="firstname"
          id="firstname"
          name="firstname"
          placeholder="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        ></input>
        <input
          type="lastname"
          id="lastname"
          name="lastname"
          placeholder="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        ></input>
        <input
          type="username"
          id="username"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
        ></input>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
