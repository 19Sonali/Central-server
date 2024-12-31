import React from "react";
import { Button, Typography } from "@mui/material";

const DownloadModel = () => {
  const downloadModel = () => {
    window.location.href = "http://localhost:5000/download";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <Typography
        variant="h5"
        component="div"
        style={{ fontWeight: "bold", marginBottom: "15px" }}
      >
        Download Global Model
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={downloadModel}
        style={{
          padding: "15px 30px",
          fontWeight: "bold",
          
        }}
      >
        Download Model
      </Button>
    </div>
  );
};

export default DownloadModel;
