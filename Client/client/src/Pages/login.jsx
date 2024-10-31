import {
  Box,
  FormControl,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Input,
  InputLabel,
  IconButton,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from '@mui/icons-material/Visibility';
import toast from "react-hot-toast";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from "../assets/profile.png";
import { useEffect, useState } from "react";
import { authenticateLogin } from "../services/AuthApi";

const loginInitialValues = {
  email: "",
  password: "",
};

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(loginInitialValues);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Function to handle input change
  const onInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // Function to log in the user
  const loginUser = async () => {
    try {
      const response = await authenticateLogin(login);
      toast.success("Login Successfully");
      if (response && response.data.success) {
        const token = response.data.token; // Access the token from the response
        if (token) {
          localStorage.setItem("user", JSON.stringify({ token })); // Store user details
          setToken(token);
          navigate("/home"); // Navigate to home on successful login
        } else {
          console.error("Login failed: Token is missing."); // Handle missing token
        }
      } else {
        console.error("Login failed: ", response); // Handle unsuccessful login
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  // Check local storage for existing user
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser.token) {
        setToken(foundUser.token); // Set token if user exists
        navigate("/home");
      }
    }
  }, [setToken, navigate]);

  return (
    <Box
      display="grid"
      height="100vh"
      justifyContent="center"
      alignItems={"center"}
    >
      <Box display="grid" gridTemplateRows="repeat(2, 1fr)" alignItems="center">
        <Box display="grid" justifyContent="center" alignItems="center">
          <Box textAlign="center">
            <img
              style={{
                width: "40%",
                height: "40%",
                borderRadius: "50%",
                backgroundColor: colors.grey[100],
              }}
              src={logo}
              alt="logo"
            />
          </Box>
          <Typography
            textAlign="center"
            variant="h3"
            color={colors.blueAccent[500]}
          >
            Welcome
          </Typography>
        </Box>
        <Box
          display="grid"
          gridTemplateRows="repeat(3, 1fr)"
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 1 }} />
            <TextField
              autoComplete="email"
              type="email"
              label="Email Address"
              name="email"
              variant="standard"
              onChange={onInputChange}
              placeholder="test@gmail.com"
              sx={{
                m: 1,
                width: "30ch",
                "&:active": {
                  color: "blue",
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 1 }} />
            <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                  onChange={onInputChange}
                  autoComplete='current-password'
                  id="standard-adornment-password"
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
            </FormControl>
          </Box>
          <Box>
            <Button
              sx={{
                width: "100%",
                background: "#338BA8",
                "&:hover": {
                  backgroundColor: "#296E85",
                },
              }}
              variant="contained"
              onClick={loginUser}
            >
              Login
            </Button>
            <Typography mt={2}>
              Don't have an Account{" "}
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#338BA8" }}
              >
                Please Signup
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
