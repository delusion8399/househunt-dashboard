import { Grid } from "@mui/material";
import React from "react";
import { SellCard } from "./sell-card";

const SellProperties = ({ listings }) => {
  return (
    <div>
      <Grid container spacing={6}>
        {listings?.map((op) => {
          return (
            <Grid item md={4} xs={8} key={op}>
              <SellCard listing={op} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default SellProperties;
