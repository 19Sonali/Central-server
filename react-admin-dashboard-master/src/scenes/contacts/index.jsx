import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
  <Header title="Summary" subtitle="Overview of Key Metrics" />
  <Box m="40px 0" display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px">
    {/* Total Devices Participating */}
    <Box
      p="20px"
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="8px"
    >
      <Typography variant="h5" color={colors.grey[100]}>
        Total Devices
      </Typography>
      <Typography variant="h2" color={colors.greenAccent[300]}>
        2 {/* Replace with dynamic data */}
      </Typography>
    </Box>

    {/* Malware Detection Accuracy */}
    <Box
      p="20px"
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="8px"
    >
      <Typography variant="h5" color={colors.grey[100]}>
        Detection Accuracy
      </Typography>
      <Typography variant="h2" color={colors.greenAccent[300]}>
        97.5% {/* Replace with dynamic data */}
      </Typography>
    </Box>

    {/* Latest Model Version */}
    <Box
      p="20px"
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="8px"
    >
      <Typography variant="h5" color={colors.grey[100]}>
        Latest Model Version
      </Typography>
      <Typography variant="h2" color={colors.greenAccent[300]}>
        v1.1.1 {/* Replace with dynamic data */}
      </Typography>
    </Box>

    {/* Training Progress / Anomaly Alerts */}
    <Box
      p="20px"
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="8px"
    >
      <Typography variant="h5" color={colors.grey[100]}>
        Training Progress
      </Typography>
      <Typography variant="h2" color={colors.greenAccent[300]}>
        85% {/* Replace with dynamic data */}
      </Typography>
      <Typography variant="subtitle1" color={colors.redAccent[300]}>
        1 Anomalies Detected {/* Replace with dynamic data */}
      </Typography>
    </Box>
  </Box>
</Box>

  );
};

export default Contacts;
