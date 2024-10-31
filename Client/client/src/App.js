import Login from "../src/Pages/login";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Register from "../src/Pages/Register";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import Sidebar from "./Pages/global/Sidebar";

import Topbar from "./Pages/global/Topbar";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import ContextProvider from "./context/ContextProvider";
import SessionInfo from "./Pages/SessionInfo"
import SmsLogs from "./Pages/SmsLogs"
import Sessions from "./Pages/Sessions";

function App() {
  const [theme, colorMode] = useMode();
  const [token, setToken] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setToken(foundUser);
    }
  }, []);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
          {token ? (
            <ContextProvider>
              <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Box display={"flex"}>
                    <Sidebar />
                    <Box width={"100%"}>
                      <Topbar token={token} setToken={setToken} />
                      <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/session_info" element={<SessionInfo />} />
                        <Route path="/sms_logs" element={<SmsLogs />} />
                        <Route path="/user_sessions" element={<Sessions />} />
                      </Routes>
                    </Box>
                  </Box>
                </ThemeProvider>
              </ColorModeContext.Provider>
            </ContextProvider>
          ) : (
            "Token not Generated"
          )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
