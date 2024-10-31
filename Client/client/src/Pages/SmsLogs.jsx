import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "./global/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getSmsData } from "../services/AuthApi";

const SmsLogs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [smsLogData, setSmsLogData] = useState();
  console.log(smsLogData);

  useEffect(() => {
    const fetchSmsStaus = async () => {
      const response = await getSmsData();
      console.log(response.data);
      setSmsLogData(response.data);
    };
    fetchSmsStaus();
  }, []);

  const columns = [
    {
      field: "timestamp",
      headerName: "Time",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone_number",
      headerName: "Sender's Number",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "action",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => {
        const { action } = row; // Destructure the row to get status and id
        return (
          <Box
            width="30%"
            borderRadius={1}
            mt="4px"
            p="2px"
            alignItems={"center"}
            display="flex"
            justifyContent="center"
            backgroundColor={
              action === "sent"
                ? colors.greenAccent[600]
                : colors.redAccent[700]
            }
          >
            <Button
              color={colors.grey[100]}
              sx={{ ml: "5px", fontWeight: 600, fontSize: "15px" }}
            >
              {action}
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box ml={32} mt={9} mr={1}>
      <Header
        title="SMS LOGS"
        subtitle="List of SMS sending to Sender's Number"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={smsLogData}
          columns={columns}
          getRowId={(row) => row.timestamp}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default SmsLogs;
