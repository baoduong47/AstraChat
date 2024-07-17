import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/authActions";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
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
    <div className="flex h-screen bg-customBlue">
      {authError && <p className="text-red-500">{authError.message}</p>}
      <div
        className="w-3/6 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/image.jpg')" }}
      >
        <h1 className="text-white text-4xl font-bold">ChatBox Messaging App</h1>
      </div>
      <div className="w-3/6 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-14">Create Account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <input
                type="firstname"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg"
              ></input>
              <input
                type="lastname"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg"
              ></input>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-lg"
            ></input>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-lg"
            ></input>
            <button
              type="submit"
              className="w-full px-4 py-2.5 border bg-customBlue text-white rounded-lg flex justify-center items-center"
            >
              Create Account
            </button>
            <h4 className="text-xs text-[#666565]">
              Already have an account?{" "}
              <a href="/login" className="text-blue-950">
                Login.
              </a>
            </h4>
            <div className="flex items-center py-6">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="px-4 text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg text-sm text-[#666565]"
              >
                Sign up with Google
              </button>
              <button
                type="button"
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg text-sm text-[#666565]"
              >
                Sign up with Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
