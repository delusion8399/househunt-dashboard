import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import FenceOutlinedIcon from "@mui/icons-material/FenceOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import AccessibilityOutlinedIcon from "@mui/icons-material/AccessibilityOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

const OverviewCard = ({ listing }) => {
  return (
    <Card>
      <CardHeader title={`${listing?.title} Overview`} />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          spacing={5}
          alignItems="center"
          justifyContent="space-evenly"
        >
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
          <Box>
            <Stack direction="row" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessibilityOutlinedIcon />
                <Stack direction="column">
                  <Typography>Ideal For</Typography>
                  <Typography variant="body2">
                    {listing?.placeInfo?.accmodationFor}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={5}
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ mt: 4 }}
        >
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
          <Box>
            <Stack direction="row" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocalOfferOutlinedIcon />
                <Stack direction="column">
                  <Typography>Average Rate</Typography>
                  <Typography variant="body2">
                    ₹ {listing?.billing?.rate}/{listing?.billing?.per}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Stack direction="row" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccountBoxOutlinedIcon />
                <Stack direction="column">
                  <Typography>Buyer Preference</Typography>
                  <Typography variant="body2">
                    {listing?.placeInfo?.idealTenants}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Stack direction="row" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <FenceOutlinedIcon />
                <Stack direction="column">
                  <Typography>Ideal For</Typography>
                  <Typography variant="body2">
                    {listing?.placeInfo?.accmodationFor}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
