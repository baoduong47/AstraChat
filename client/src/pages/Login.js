import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";

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
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      {authError && <p className="text-red-500">{authError.message}</p>}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome back!</h2>
        <h3 className="text-l">
          Don't have an account yet?{" "}
          <a href="/signup" className="text-highlightColor">
            Sign up now
          </a>
        </h3>
      </div>
      <div className="w-full max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            size="small"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            variant="outlined"
            label="Email"
            required
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
          ></TextField>
          <TextField
            size="small"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="password"
            value={formData.password}
            variant="outlined"
            label="Password"
            required
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
          ></TextField>
          <div className="flex items-center justify-between pl-2 pr-2">
            <FormControlLabel
              control={<Checkbox size="small" defaultChecked />}
              label={
                <Typography
                  variant="body2"
                  sx={{ fontSize: "12px", color: "#666565" }}
                >
                  Remember me
                </Typography>
              }
            />
            <a href="#" className="no-underline">
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", color: "#666565" }}
              >
                Forgot password?
              </Typography>
            </a>
          </div>
          <div className="flex justify-center pt-4">
            <Button
              size="small"
              variant="contained"
              type="submit"
              className="w-1/2"
              sx={{
                borderColor: "gray",
                color: "white",
                padding: "10px 16px",
                fontSize: "11px",
                backgroundColor: "#536f50",
                "&:hover": {
                  backgroundColor: "#435d40",
                },
              }}
            >
              Log In
            </Button>
          </div>
          <div className="flex items-center py-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="text-center ">
            <Button type="button" size="small">
              Log in with Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
