import { Box, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import { tokens } from "../../theme";
import GradingIcon from '@mui/icons-material/Grading';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { TitleContext } from "../../context/ContextProvider";

const Item = ({ title, to, icon, selected, setSelected, setTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      onClick={() => {
        setSelected(title);
        setTitle(title);
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        cursor: "pointer",
        color: selected === title ? "#4ae4a4" : colors.grey[100],
        backgroundColor:
          selected === title ? colors.primary[400] : "transparent",
        "&:hover": {
          backgroundColor: colors.primary[300],
          color: "#4ae4a4",
        },
      }}
    >
      {icon}
      <Box
        component={Link}
        to={to}
        sx={{
          textDecoration: 'none',
          color: 'inherit', 
          flex: 1,
          '&:hover': {
            textDecoration: 'none',
          },
        }}
      >
        <Typography sx={{ marginLeft: '10px' }}>{title}</Typography>
      </Box>
    </Box>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setTitle } = useContext(TitleContext);
  const [selected, setSelected] = useState("Dashboard");

  const menuItems = [
    {
      title: "Dashboard",
      to: "/home",
      icon: <GridViewIcon color={colors.grey[100]} />,
    },
    {
      title: "Session Information",
      to: "/session_info",
      icon: <ContactsOutlinedIcon color={colors.grey[100]} />,
    },
    {
      title: "Your Sessions",
      to: "/user_sessions",
      icon: <TaskOutlinedIcon color={colors.grey[100]} />,
    },
    {
      title: "SMS Logs",
      to: "/sms_logs",
      icon: <GradingIcon color={colors.grey[100]} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        zIndex: "3",
        borderRight: "2px solid black",
        backgroundColor: colors.primary[400],
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Typography variant="h5" color={colors.grey[100]} fontWeight={600}>
          SMS MANAGEMENT SYSTEM
        </Typography>
      </Box>
      <Box >
        {menuItems.map((item) => (
          <Item
            key={item.title}
            title={item.title}
            to={item.to}
            icon={item.icon}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={false}
            setTitle={setTitle}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
