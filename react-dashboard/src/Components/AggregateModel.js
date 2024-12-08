// src/components/AggregateModel.js

import React, { useState } from "react";
import { Button, Card, CardContent, Typography, CircularProgress } from "@mui/material";
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
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
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
      </CardContent>
    </Card>
  );
};

export default AggregateModel;
