import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/logs");
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Update Logs
      </Typography>
      {logs.length > 0 ? (
        <Box sx={{ maxHeight: 400, overflowY: "scroll", marginTop: 2 }}>
          {logs.map((log, index) => (
            <Box key={index} sx={{ marginBottom: 2, padding: 1, border: "1px solid #ccc", borderRadius: 1 }}>
              <Typography variant="body2">
                <strong>Timestamp:</strong> {new Date(log.timestamp * 1000).toLocaleString()}
              </Typography>
              {log.client_id && (
                <>
                  <Typography variant="body2">
                    <strong>Client ID:</strong> {log.client_id}
                  </Typography>
                  <Typography variant="body2">
                    <strong>File Path:</strong> {log.file_path}
                  </Typography>
                </>
              )}
              {log.event === "aggregation" && (
                <>
                  <Typography variant="body2">
                    <strong>Event:</strong> Aggregation
                  </Typography>
                  <Typography variant="body2">
                    <strong>Model Files:</strong> {log.model_files.join(", ")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Global Model Path:</strong> {log.global_model_path}
                  </Typography>
                </>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2">No logs available.</Typography>
      )}
    </div>
  );
};

export default Logs;
