import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    console.log("Login form submitted", formData);
  };

  return (
    <div>
      <p>Log In Screen</p>
      {authError && <p className="error">{authError.message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={formData.email}
          required
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
          value={formData.password}
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
