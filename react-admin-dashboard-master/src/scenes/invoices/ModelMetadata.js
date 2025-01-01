import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";

const ModelMetadataInline = () => {
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

  if (loading) return <CircularProgress style={{ marginTop: "20px" }} />;

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <Typography
        variant="h5"
        component="div"
        style={{ fontWeight: "bold", marginBottom: "15px" }}
      >
        Model Metadata
      </Typography>

      {metadata ? (
        <div style={{ fontSize: "16px" }}>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            <strong>Latest Update:</strong> {metadata.latest_update}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            <strong>Model Size:</strong> 50 MB
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            <strong>Updates Received:</strong> {metadata.updates_received}
          </Typography>
          
        </div>
      ) : (
        <Typography variant="body2" style={{ color: "#555" }}>
          No metadata available.
        </Typography>
      )}
    </div>
  );
};

export default ModelMetadataInline;
