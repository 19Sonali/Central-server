import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
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
    const interval = setInterval(fetchMetadata, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" component="div" gutterBottom>
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
    </div>
  );
};

export default ModelMetadata;
