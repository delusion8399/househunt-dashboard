import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

const PropertyHeader = ({ listing }) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "long",
  });
  return (
    <Box sx={{ mt: 5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5">{listing?.title}</Typography>
            <ShareOutlinedIcon />
            <FavoriteBorderIcon />
          </Stack>
          <Typography variant="body2" sx={{ my: 1 }}>
            By Family Property
          </Typography>
          <Typography variant="body2" sx={{ color: "#ededed" }}>
            {listing?.address?.building}
          </Typography>
        </Box>
        <Stack direction="column" alignItems="flex-end">
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">
              {formatter.format(
                listing?.billing?.rate * listing?.placeInfo?.area
              )}
              |
            </Typography>
            <Typography variant="body2">
              ₹{listing?.billing?.rate}/{listing?.billing?.per}
            </Typography>
          </Stack>
          <Typography>EMI facility available</Typography>
          <Typography variant="body2">
            Price excludes maintainace, floor rise cost etc.
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<LocalPhoneOutlinedIcon />}
          onClick={() => window.open(`tel:${listing?.contact}`)}
        >
          Call Developer
        </Button>
      </Stack>
    </Box>
  );
};

export default PropertyHeader;
