import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { useRouter } from "next/router";

export const RentCard = ({ listing }) => {
  const router = useRouter();
  console.log(listing);
  return (
    <Card sx={{ maxWidth: "100%", minWidth: 345, height: 400 }}>
      <CardMedia
        component="img"
        height="140"
        image={`${
          listing?.images?.length > 0
            ? `http://${listing?.images[0]?.url}`
            : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
        }`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`/listing/${listing?.slug}`)}
        >
          {listing?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          In {listing?.address?.city}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          ₹{listing?.billing?.rent} {""}
          <span style={{ fontSize: 20 }}>{listing?.billing?.rentPeriod}</span>
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1}>
            <BedIcon /> <Typography>{listing?.placeInfo?.bedrooms}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <OpenInFullIcon />{" "}
            <Typography>{listing?.placeInfo?.area} sqft.</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <BathtubIcon />
            <Typography>{listing?.placeInfo?.bathrooms}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};
