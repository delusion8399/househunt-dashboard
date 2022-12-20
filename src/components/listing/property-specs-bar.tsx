import { Divider, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const PropertySpecsBar = ({ listing }) => {
  return (
    <>
      <Box
        sx={{
          minHeight: 100,
          minWidth: 100,
          flex: 1,
          textAlign: "center",
        }}
      >
        <Typography>2BHK Apartment</Typography>
        <Typography variant="body2">Configuration</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        sx={{
          minHeight: 100,
          minWidth: 100,
          flex: 1,
          textAlign: "center",
        }}
      >
        <Typography>Average Price</Typography>

        <Typography>
          ₹{listing?.billing?.rate}/{listing?.billing?.per}
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        sx={{
          minHeight: 100,
          minWidth: 100,
          flex: 1,
          textAlign: "center",
        }}
      >
        <Typography>Ready To Move</Typography>
        <Typography variant="body2">Possesion Status</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box
        sx={{
          minHeight: 100,
          minWidth: 100,
          flex: 1,
          textAlign: "center",
        }}
      >
        <Typography>{listing?.placeInfo?.area} sq.ft.</Typography>
        <Typography variant="body2">(Saleable Area)</Typography>
        <Typography variant="body2">
          Sizes
          <Tooltip
            title={
              <Box>
                <Typography>Carpet Area</Typography>
                <Typography variant="caption">
                  Includes wall to wall area, balcony and closets, not buildings
                  common spaces
                </Typography>
                <Typography>Builtup Area</Typography>
                <Typography variant="caption">
                  Generally 10% more than the carpet area. Property taxes in
                  many states are calculated on the basis of built-up area.
                </Typography>
                <Typography>Super Builtup Area</Typography>
                <Typography variant="caption">
                  Built-up area plus a portion of the building’s common areas,
                  such as the lobby, gallery, staircases and elevators excluding
                  terrace, garden, parking
                </Typography>
              </Box>
            }
          >
            <InfoOutlinedIcon sx={{ fontSize: 12, cursor: "pointer" }} />
          </Tooltip>
        </Typography>
      </Box>
    </>
  );
};

export default PropertySpecsBar;
