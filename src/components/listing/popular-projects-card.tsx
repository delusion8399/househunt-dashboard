import { Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";
import { formatter } from "src/utils/currency-formatter";
import { SeverityPill } from "../severity-pill";

const PopularProjectsCard = ({ listing }) => {
  const router = useRouter();
  return (
    <Card sx={{ display: "flex", maxWidth: 400 }}>
      <CardMedia
        component="img"
        sx={{ width: 151, height: 150 }}
        image={
          listing?.images?.length > 0 ? `http://${listing?.images[0]?.url}` : ""
        }
        alt="Property Pic"
      />
      <Box sx={{ p: 1 }}>
        <Typography>{listing?.title}</Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {formatter.format(listing?.billing?.rate * listing?.placeInfo?.area)}
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {listing?.address?.building}
        </Typography>
      </Box>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ mx: 1, my: 1 }}
      >
        <SeverityPill color="error">Popular</SeverityPill>
        <Button
          variant="contained"
          sx={{ px: 0.5, py: 0.5 }}
          onClick={() => router.push(`/listing/${listing?.slug}`)}
        >
          Intrested
        </Button>
      </Stack>
    </Card>
  );
};

export default PopularProjectsCard;
