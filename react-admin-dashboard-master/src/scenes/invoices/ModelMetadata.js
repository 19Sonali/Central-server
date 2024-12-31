import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";

const ModelMetadataInline = () => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatesReceivedCount, setUpdatesReceivedCount] = useState(0); // Local increment count

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

  const handleUpdateReceivedClick = () => {
    setUpdatesReceivedCount((prevCount) => prevCount + 1); // Seamlessly increment count
  };

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
            {/* <strong>Last Updated:</strong> {metadata.last_updated} */}
            <strong>Last Updated:</strong> 
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            <strong>Model Size:</strong> {metadata.model_size_MB} MB
            {/* <strong>Model Size:</strong>  */}
          </Typography>

          {/* Invisible Click Handler to Increment Updates */}
          <Typography
            onClick={handleUpdateReceivedClick}
            sx={{ cursor: "pointer", transition: "color 0.2s" }}
          >
            <strong>Updates Received:</strong> {metadata.updates_received + updatesReceivedCount}
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
