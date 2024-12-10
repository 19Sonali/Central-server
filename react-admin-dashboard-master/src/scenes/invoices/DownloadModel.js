import React from "react";
import { Button, Typography } from "@mui/material";

const DownloadModel = () => {
  const downloadModel = () => {
    window.location.href = "http://localhost:5000/download";
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Download Global Model
      </Typography>
      <Button variant="contained" color="secondary" onClick={downloadModel}>
        Download Model
      </Button>
    </div>
  );
};

export default DownloadModel;
