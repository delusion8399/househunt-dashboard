import AccessibilityOutlinedIcon from "@mui/icons-material/AccessibilityOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import EscalatorOutlinedIcon from "@mui/icons-material/EscalatorOutlined";
import FenceOutlinedIcon from "@mui/icons-material/FenceOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

function findLabelValue(keyValuePairs, label) {
  for (const pair of keyValuePairs) {
    if (pair.label === label) {
      return pair.value;
    }
  }
  return null;
}

const OverviewCard = ({ listing }) => {
  return (
    <Card>
      <CardHeader title={`${listing?.title} Overview`} />
      <Divider />
      <CardContent>
        <Grid container columns={{ md: 12, sm: 8 }} spacing={3}>
          <Grid item md={3} sm={2}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <OpenInFullOutlinedIcon />
                  <Stack direction="column">
                    <Typography>Property Area</Typography>
                    <Typography variant="body2">
                      {listing?.placeInfo?.area} sq.ft.
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={3} sm={2}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <BedOutlinedIcon />
                  <Stack direction="column">
                    <Typography>Configuration</Typography>
                    <Typography variant="body2">
                      {listing?.placeInfo?.bedrooms}BHK
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={3} sm={2}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessibilityOutlinedIcon />
                  <Stack direction="column">
                    <Typography>Furnishing</Typography>
                    <Typography variant="body2">
                      {findLabelValue(listing?.placeDescription, "Furnishing")}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={3} sm={2}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <FenceOutlinedIcon />
                  <Stack direction="column">
                    <Typography>Possession Status</Typography>
                    <Typography variant="body2">
                      {listing?.placeInfo?.possesion || "Ready to move"}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={3} sm={2}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <QueryBuilderOutlinedIcon />
                  <Stack direction="column">
                    <Typography>Created At</Typography>
                    <Typography variant="body2">
                      {format(new Date(listing?.updatedAt), "dd/MM/yyyy")}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={3} sm={2}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EscalatorOutlinedIcon />
                  <Stack direction="column">
                    <Typography>Lift</Typography>
                    <Typography variant="body2">
                      {findLabelValue(listing?.placeDescription, "Lift")}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={3} sm={2}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocalOfferOutlinedIcon />
                  <Stack direction="column">
                    <Typography>
                      Average{" "}
                      {listing?.billing?.propertyFor === "rent"
                        ? `Rent`
                        : `Price`}
                    </Typography>
                    <Typography variant="body2">
                      {listing?.billing?.propertyFor === "rent"
                        ? `₹${listing?.billing?.rent}/${listing?.billing?.rentPeriod}`
                        : `₹${listing?.billing?.rate}/${listing?.billing?.per}`}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={3} sm={2}>
            <Box>
              <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccountBoxOutlinedIcon />
                  <Stack direction="column">
                    <Typography>
                      {listing?.billing?.propertyFor === "rent"
                        ? `Tenant`
                        : `Buyer`}{" "}
                      Preference
                    </Typography>
                    <Typography variant="body2">
                      {listing?.placeInfo?.idealTenants}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
