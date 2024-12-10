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
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error during aggregation:", error);
      setMessage("Aggregation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Aggregate Model Updates
      </Typography>
      <Button variant="contained" color="primary" onClick={triggerAggregation} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Aggregate Updates"}
      </Button>
      {message && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}
    </div>
  );
};

export default AggregateModel;
