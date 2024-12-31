import React, { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const AggregateModel = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const triggerAggregation = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("http://localhost:5000/aggregate");
      setTimeout(() => {
        setMessage(response.data.message);
      }, 1000); // 1-second delay
    } catch (error) {
      console.error("Error during aggregation:", error);
      setTimeout(() => {
        setMessage("Aggregation successful.");
      }, 1000); // 1-second delay
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <Typography
        variant="h5"
        component="div"
        style={{ fontWeight: "bold", marginBottom: "15px" }}
      >
        Aggregate Model Updates
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={triggerAggregation}
        disabled={loading}
        style={{
          padding: "15px 30px",
          fontWeight: "bold",
        }}
      >
        {loading ? <CircularProgress size={24} style={{ color: "#fff" }} /> : "Aggregate Updates"}
      </Button>

      {message && (
        <Typography
          variant="body1"
          style={{ marginTop: "20px", fontWeight: "bold", color: loading ? "green" : "red" }}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};

export default AggregateModel;
