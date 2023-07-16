import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { formatter } from "src/utils/currency-formatter";

const PropertyHeader = ({ listing }) => {
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
            By {listing?.builder}
          </Typography>
          <Typography variant="body2" sx={{ color: "#ededed" }}>
            {listing?.address?.building}
          </Typography>
        </Box>
        <Stack direction="column" alignItems="flex-end">
          <Stack direction="row" alignItems="center">
            {listing?.billing?.propertyFor === "rent" ? (
              <>
                <Typography variant="h5">
                  {formatter.format(listing?.billing?.rent)}/
                </Typography>
                <Typography variant="body2">
                  {listing?.billing?.rentPeriod}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h5">
                  {formatter.format(
                    listing?.billing?.rate * listing?.placeInfo?.area
                  )}
                  |
                </Typography>
                <Typography variant="body2">
                  ₹{listing?.billing?.rate}/{listing?.billing?.per}
                </Typography>
              </>
            )}
          </Stack>
          <Typography>
            {listing?.billing?.propertyFor === "rent" ? (
              <></>
            ) : (
              <>EMI facility available</>
            )}
          </Typography>
          <Typography variant="body2">
            {listing?.billing?.propertyFor === "rent" ? "Rent " : "Price "}
            excludes maintainace, floor rise cost etc.
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<LocalPhoneOutlinedIcon />}
          onClick={() => window.open(`tel:${listing?.contact}`)}
        >
          Call{" "}
          {listing?.billing?.propertyFor === "rent" ? "Owner" : "Developer"}
        </Button>
      </Stack>
    </Box>
  );
};

export default PropertyHeader;
