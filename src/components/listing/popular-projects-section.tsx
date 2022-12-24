import { Stack, Grid } from "@mui/material";
import { Box } from "@mui/system";
import PopularProjectsCard from "./popular-projects-card";

const PopularProjectsSection = ({ listings }) => {
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      justifyContent="center"
      spacing={2}
      sx={{ my: 2 }}
      flexWrap="wrap"
    >
      {listings?.map((listing) => {
        return (
          <Box>
            <PopularProjectsCard listing={listing} />
          </Box>
        );
      })}
    </Stack>
  );
};

export default PopularProjectsSection;
