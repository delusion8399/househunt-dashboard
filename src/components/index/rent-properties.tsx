import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { RentCard } from "./rent-card";

const RentProperties = ({ listings }) => {
  return (
    <>
      <Box sx={{ mb: 5, mt: 8 }}>
        <Typography variant="h6">Handpicked for Rent</Typography>
        <Typography sx={{ color: "#5048E5" }} variant="h2">
          Featured Properties
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        {listings?.map((op) => {
          return (
            <Box sx={{ mr: 3 }} key={op}>
              <RentCard listing={op} />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default RentProperties;
