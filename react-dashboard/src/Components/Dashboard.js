// src/components/Dashboard.js

import React from "react";
import { Container, Typography } from "@mui/material";
import ModelMetadata from "./ModelMetadata";
import AggregateModel from "./AggregateModel";
import DownloadModel from "./DownloadModel";
import Logs from "./Logs";

const Dashboard = () => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Central Server Dashboard
      </Typography>
      <ModelMetadata />
      <AggregateModel />
      <DownloadModel />
      <Logs />
    </Container>
  );
};

export default Dashboard;
