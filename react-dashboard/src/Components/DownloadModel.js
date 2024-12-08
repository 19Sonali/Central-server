// src/components/DownloadModel.js

import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

const DownloadModel = () => {
  const downloadModel = () => {
    window.location.href = "http://localhost:5000/download";
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Download Global Model
        </Typography>
        <Button variant="contained" color="secondary" onClick={downloadModel}>
          Download Model
        </Button>
      </CardContent>
    </Card>
  );
};

export default DownloadModel;
