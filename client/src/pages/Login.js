import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import LoadingScreen from "./LoadingScreen";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const authenticated = useSelector((state) => state.auth.isAuthenticated);

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
  };

  useEffect(() => {
    if (authenticated) {
      setIsLoading(true);
      setTimeout(() => {
        window.location.href = "/home";
      }, 4000);
    } else if (authError) {
      setIsLoading(false);
    }
  }, [authenticated, authError]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen text-white bg-white"
      style={{
        backgroundImage: "url('/images/loading.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {authError && (
        <motion.p
          className="text-red-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {authError.message || "Invalid login credentials"}
        </motion.p>
      )}
      <motion.div
        className="mb-6"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Welcome back!</h2>
        <h3 className="text-l">
          Don't have an account yet?{" "}
          <a href="/signup" className="text-buttonColor">
            Sign up now
          </a>
        </h3>
      </motion.div>
      <motion.div
        className="w-full max-w-sm"
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          {authError?.field === "email" && (
            <p className="text-red-500">{authError.message}</p>
          )}
          <TextField
            size="small"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            variant="filled"
            label="Email"
            fullWidth
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(51, 51, 51, 0.6)",
                "&:hover": {
                  backgroundColor: "rgba(68, 68, 68, 0.6)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(85, 85, 85, 0.6)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#895881",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                fontSize: "13px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FCF8F3",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "#895881",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#895881",
              },
              "& .MuiFilledInput-underline:hover:before": {
                borderBottomColor: "#7A4972",
              },
            }}
          />

          <TextField
            size="small"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            variant="filled"
            label="Password"
            fullWidth
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(51, 51, 51, 0.6)",
                "&:hover": {
                  backgroundColor: "rgba(68, 68, 68, 0.6)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(85, 85, 85, 0.6)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#895881",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                fontSize: "13px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FCF8F3",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "#895881",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#895881",
              },
              "& .MuiFilledInput-underline:hover:before": {
                borderBottomColor: "#7A4972",
              },
            }}
          />
          <div className="flex items-center justify-between pl-2 pr-2">
            <FormControlLabel
              control={<Checkbox size="small" defaultChecked />}
              label={
                <Typography
                  variant="body2"
                  sx={{ fontSize: "12px", color: "white" }}
                >
                  Remember me
                </Typography>
              }
            />
            <a href="#" className="no-underline">
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", color: "white" }}
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
                backgroundColor: "#392840",
                "&:hover": {
                  backgroundColor: "#392840",
                },
              }}
            >
              Log In
            </Button>
          </div>
          <div className="flex items-center py-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="px-4 text-white">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="text-center ">
            <Button sx={{ color: "#C0D7D5" }} type="button" size="small">
              Log in with Google
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
