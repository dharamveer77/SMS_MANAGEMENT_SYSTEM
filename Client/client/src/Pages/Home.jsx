import { Box, Button, IconButton, Typography } from "@mui/material";
import Header from "./global/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import StatBox from "../Components/StatBox";
import LineChart from "../Components/LineChart";
import BarChart from "../Components/BarChart";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../context/ContextProvider";
import { sessionDetails, statBoxDetails } from "../services/AuthApi";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { session, setSession } = useContext(TitleContext);
  const [data, setData] = useState({});
  console.log(data)

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      const response = await sessionDetails();
      const result = await statBoxDetails();
      setSession(response.data);
      setData(result.data);
    };
    fetchDashboardDetails();
  }, [setSession]);

  return (
    <>
      <Box ml={32} mt={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Dashboard" subtitle="Welcome to Your Dashboard" />
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                marginRight: "10px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={data.totalSmsSent || "Loading..."}
              subtitle="Total SMS Sent"
              progress={data.totalSmsSentProgress || "0.25"}
              increase={data.totalSmsSentIncrease || "+0%"}
              icon={
                <MarkEmailReadIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={data.smsSendingRate || "Loading..."}
              subtitle="SMS Sending Rate"
              progress={data.smsSendingRateProgress || "0.75"}
              increase={data.smsSendingRateIncrease || "+0%"}
              icon={
                <ForwardToInboxIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={data.smsFailureRate || "Loading..."}
              subtitle="SMS Failure Rate"
              progress={data.smsFailureRateProgress || "0.75"}
              increase={data.smsFailureRateIncrease || "+0%"}
              icon={
                <MarkEmailUnreadIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            marginRight="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={data.totalDeliveries || "Loading..."}
              subtitle="Total Deliveries"
              progress={data.totalDeliveriesProgress || "0.75"}
              increase={data.totalDeliveriesIncrease || "+0%"}
              icon={
                <AllInboxIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Active SMS Programs
              </Typography>
            </Box>
            {session.map((sessionID, i) => (
              <Box
                key={`${sessionID._id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {sessionID.session_id}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {sessionID.user}
                  </Typography>
                </Box>
                <Box
                  backgroundColor={
                    sessionID.status === "active"
                      ? colors.greenAccent[600]
                      : colors.redAccent[600]
                  }
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {sessionID.status}
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            gridColumn="span 5"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  SMS Sucess Rate
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            marginRight={1}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              High Priorty Operators
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
