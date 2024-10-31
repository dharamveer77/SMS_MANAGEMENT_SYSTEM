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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authenticateSignup } from '../services/AuthApi.js';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import register from "../assets/register.png"
import { useTheme } from "@emotion/react";
import { tokens } from "../theme.js";


const signupInitialValues = {
  username: '',
  email: '',
  password: '',
};


const Register = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(signupInitialValues)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    toast.success("SignUp Successfully");
    if (!response) return;
    navigate('/')
  };

  return (
    <Box
      display="grid"
      height="100dvh"
      justifyContent="center"
      alignItems={"center"}
    >
      <Box display="grid" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box>
            <Box textAlign="center">
              <img
                style={{
                  width: "100%",
                }}
                src={register}
                alt="logo"
              />
            </Box>
            <Typography textAlign="center" variant="h3" color={colors.blueAccent[500]}>
              Registration
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircleIcon
                sx={{ color: "action.active", mr: 1, my: 1 }}
              />
              <TextField
                autoComplete="username"
                type="username"
                label="enter Username"
                name="username"
                variant="standard"
                placeholder="virat@77"
                onChange={(e) => onInputChange(e)}
                sx={{
                  m: 1,
                  width: "30ch",
                  "&:active": {
                    color: "blue",
                  },
                }}
              />
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
                  placeholder="test@gmail.com"
                  onChange={(e) => onInputChange(e)}
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
                    autoComplete="current-password"
                    id="standard-adornment-password"
                    name="password"
                    onChange={(e) => onInputChange(e)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility"></IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <Box gridArea="3 / 1 / 4 / 2">
                <Button
                  sx={{
                    width: "100%",
                    background: "#338BA8",
                    "&:hover": {
                      backgroundColor: "#296E85",
                    },
                  }}
                  variant="contained"
                  onClick={() => signupUser()}
                >
                  Signup
                </Button>
                <Typography mt={2}>
                  Already have a Account{" "}
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#338BA8" }}
                  >
                    Please Login
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
