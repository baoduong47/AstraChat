import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

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
        style={{ backgroundImage: "url('/images/cute-ff.jpg')" }}
      >
        {/* <h1 className="text-white text-4xl font-bold">ChatBox Messaging App</h1> */}
      </div>
      <div className="w-3/6 bg-signupBackground flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-5xl font-bold mb-16">Create Account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <TextField
                type="firstname"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                size="small"
                label="First Name"
                variant="outlined"
                className="w-1/2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#536f50",
                    },
                    "&:hover fieldset": {
                      borderColor: "#536f50",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#536f50",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#536f50",
                  },
                }}
              />

              <TextField
                type="lastname"
                id="lastname"
                name="lastname"
                size="small"
                value={formData.lastname}
                onChange={handleChange}
                required
                label="Last Name"
                variant="outlined"
                className="w-1/2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#536f50",
                    },
                    "&:hover fieldset": {
                      borderColor: "#536f50",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#536f50",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#536f50",
                  },
                }}
              />
            </div>
            <TextField
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              size="small"
              label="Email"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#536f50",
                  },
                  "&:hover fieldset": {
                    borderColor: "#536f50",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#536f50",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#536f50",
                },
              }}
            />
            <TextField
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              size="small"
              label="Password"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#536f50",
                  },
                  "&:hover fieldset": {
                    borderColor: "#536f50",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#536f50",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#536f50",
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              className="w-full px-4 py-2.5 border text-white rounded-lg flex justify-center items-center"
              sx={{
                backgroundColor: "#536f50",
                "&:hover": {
                  backgroundColor: "#435d40",
                },
              }}
            >
              Create Account
            </Button>
            <h4 className="text-s text-[#666565]">
              Already have an account?{" "}
              <a href="/login" className="text-highlightColor">
                Login.
              </a>
            </h4>
            <div className="flex items-center py-6">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="px-4 text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex space-x-4">
              <Button
                size="small"
                variant="outlined"
                type="button"
                className="w-1/2"
                startIcon={<GoogleIcon sx={{ color: "#008744" }} />}
                sx={{
                  borderColor: "gray",
                  color: "#666565",
                  padding: "10px 16px",
                  fontSize: "11px",
                  "&:hover": {
                    borderColor: "gray",
                    color: "#666565",
                  },
                }}
              >
                Sign up with Google
              </Button>
              <Button
                size="small"
                variant="outlined"
                type="button"
                className="w-1/2"
                startIcon={<FacebookIcon sx={{ color: "#3B5998" }} />}
                sx={{
                  borderColor: "gray",
                  color: "#666565",
                  padding: "10px 16px",
                  fontSize: "11px",
                  "&:hover": {
                    borderColor: "gray",
                    color: "#666565",
                  },
                }}
              >
                Sign up with Facebook
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
