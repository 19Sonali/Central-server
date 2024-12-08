// src/components/ModelMetadata.js

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const ModelMetadata = () => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMetadata = async () => {
    try {
      const response = await axios.get("http://localhost:5000/model_metadata");
      setMetadata(response.data);
    } catch (error) {
      console.error("Error fetching model metadata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetadata();
    // Optionally, set an interval to refresh metadata
    const interval = setInterval(fetchMetadata, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Model Metadata
        </Typography>
        {metadata ? (
          <>
            <Typography variant="body1">
              <strong>Last Updated:</strong> {metadata.last_updated}
            </Typography>
            <Typography variant="body1">
              <strong>Model Size:</strong> {metadata.model_size_MB} MB
            </Typography>
            <Typography variant="body1">
              <strong>Updates Received:</strong> {metadata.updates_received}
            </Typography>
          </>
        ) : (
          <Typography variant="body2">No metadata available.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelMetadata;
