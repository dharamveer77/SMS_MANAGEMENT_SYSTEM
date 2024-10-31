import { Box, IconButton, useTheme, Typography, Badge } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import toast from "react-hot-toast";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { TitleContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { authenticateLogout } from "../../services/AuthApi";

const Topbar = ({ setToken }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { title } = useContext(TitleContext);
  const { session } = useContext(TitleContext);

  const handleChange = () => {
    navigate("/sms_logs")
  }

  const handleLogout = async () => {
    try {
      let response = await authenticateLogout();
      if (response) {
        toast.success("Logout Successfully");
        sessionStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      position={"fixed"}
      width="100%"
      zIndex={2}
      marginLeft={31}
      p={2}
      backgroundColor={colors.primary[400]}
    >
      {/* Title */}
      
      <Box display="flex" alignItems="center" >
        <Typography variant="h5" color={colors.grey[100]}>
          {title || "Dashboard"}
        </Typography>
      </Box>

      {/* ICONS */}
      <Box display="flex" marginRight={30}>
         <IconButton onClick={handleChange}>
         <Badge badgeContent={session?.length} color="secondary">
          <NotificationsNoneOutlinedIcon/>
          </Badge>
         </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <AccountCircleOutlinedIcon onClick={handleLogout} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
