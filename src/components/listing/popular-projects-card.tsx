import { Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { SeverityPill } from "../severity-pill";

const PopularProjectsCard = () => {
  return (
    <Card sx={{ display: "flex", maxWidth: 450 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://mui.com/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ p: 1 }}>
        <Typography sx={{ mb: 1, fontWeight: 600 }}>$22.96 - 45 L</Typography>
        <Typography>Rudra Enclave</Typography>
        <Typography variant="body2">Naini, Allahabad</Typography>
      </Box>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ mx: 1, my: 1 }}
      >
        <SeverityPill color="error">Popular</SeverityPill>
        <Button variant="contained" sx={{ px: 0.5, py: 0.5 }}>
          Intrested
        </Button>
      </Stack>
    </Card>
  );
};

export default PopularProjectsCard;
