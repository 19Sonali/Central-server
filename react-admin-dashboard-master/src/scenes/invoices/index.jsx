import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ModelMetadata from "./ModelMetadata";
import AggregateModel from "./AggregateModel";
import DownloadModel from "./DownloadModel";
import Logs from "./Logs";
import SendUpdatedModel from "./SendUpdatedModel";
import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Model Control Panel"  />
     

      {/* GRID LAYOUT */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 6"
          gridRow="span 1"
          height={"150px"}
          backgroundColor={colors.primary[400]}
        >
          <ModelMetadata />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 1"
          height={"150px"}
          backgroundColor={colors.primary[400]}
        >
          <AggregateModel />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 1"
          height={"160px"}
          backgroundColor={colors.primary[400]}
        >
          <DownloadModel />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 1"
          height={"170px"}
          backgroundColor={colors.primary[400]}
        >
          <SendUpdatedModel/>
          </Box>
        {/* <Box
       marginTop={"20px"}
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Logs />
        </Box> */}
      </Box>
    </Box>
  );
};

export default Invoices;
