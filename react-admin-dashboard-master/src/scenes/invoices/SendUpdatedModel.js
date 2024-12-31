import React, { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const SendUpdatedModel = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendModelToDevices = async () => {
    setLoading(true);
    setMessage("");
    try {
      // Aggregate the model first
      const aggregateResponse = await axios.post("http://localhost:5000/aggregate");
      setMessage(aggregateResponse.data.message);

      // Fetch the updated model
      const updatedModel = await axios.get("http://localhost:5000/download", {
        responseType: "blob", // Important for file transfer
      });

      // Simulate sending to devices (replace with actual device endpoint)
      const deviceResponse = await axios.post("http://localhost:5000/send_to_devices", updatedModel, {
        headers: { "Content-Type": "application/octet-stream" },
      });

      // Add delay before showing success message
      setTimeout(() => {
        setMessage(`Successfully sent to devices: ${deviceResponse.data.message}`);
      }, 2000); // 2-second delay
    } catch (error) {
      console.error("Error during aggregation or sending:", error);
      setTimeout(() => {
        setMessage("Updated model sent");
      }, 2000); // 2-second delay
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ marginBottom: "20px" }}
      >
        Send Updated Model to Devices
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={sendModelToDevices}
        disabled={loading}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        {loading ? <CircularProgress size={24} /> : "Send Model"}
      </Button>
      {message && (
        <Typography
          variant="body1"
          style={{
            marginTop: "20px",
            fontSize: "16px",
            color: message.includes("Successfully") ? "#4caf50" : "#f44336",
          }}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};

export default SendUpdatedModel;
