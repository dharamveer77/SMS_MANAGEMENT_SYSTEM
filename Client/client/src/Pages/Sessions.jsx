import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Header from "./global/Header";
import { useContext, useEffect } from "react";
import { sessionDestroy, sessionDetails } from "../services/AuthApi";
import { TitleContext } from "../context/ContextProvider";

const Sessions = () => {
  const { session, setSession } = useContext(TitleContext)

  useEffect(() => {
    const fetchSessionDetails = async () => {
      const response = await sessionDetails();
      setSession(response.data);
    };
    fetchSessionDetails();
  }, [setSession]);

  const handleStatus = async (sessionId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"; 
    const data = {
      session_id: sessionId,
      status: newStatus,
    };
    
    try {
      const response = await sessionDestroy(data);
      if (response) {
        setSession((prevSessions) =>
          prevSessions.map((s) =>
            s._id === sessionId ? { ...s, status: newStatus } : s
          )
        );
      }
    } catch (error) {
      console.error("Error updating session status:", error);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "session_id",
      headerName: "Session Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "sender",
      headerName: "Sender's Number",
      type: "number",
      headerAlign: "left",
      flex: 1,
      align: "left",
    },
    {
      field: "reciever",
      headerName: "Receiver's Number",
      flex: 1,
    },
    {
      field: "recieverOperator",
      headerName: "Receiver's Operator",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => {
        const { status, _id } = row; // Destructure the row to get status and id
        return (
          <Box
            width="100%"
            mt="4px"
            p="2px"
            alignItems={"center"}
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "active"
                ? colors.greenAccent[600]
                : colors.redAccent[700]
            }
          >
            {status === "active" && <ToggleOnIcon />}
            {status === "inactive" && <ToggleOffIcon />}
            <Button
              color={colors.grey[100]}
              sx={{ ml: "5px", fontWeight: 600, fontSize: "15px" }}
              onClick={() => handleStatus(_id, status)}
            >
              {status}
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box ml={32} mt={9} mr={1}>
      <Header title="Your Sessions" subtitle="Managing Your Sessions" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={session}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Sessions;
