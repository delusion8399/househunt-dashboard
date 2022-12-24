import React, { useEffect, useState } from "react";
import { MainLayout } from "src/components/main-layout";
import {
  Button,
  Card,
  Container,
  Grid,
  CardContent,
  TextField,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEntity } from "src/hooks/use-entity";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material/styles";
import { useDebounce } from "use-debounce";
import { formatter } from "src/utils/currency-formatter";

const SearchPage = () => {
  const { find, entities, loading } = useEntity("listing");
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [propertyFor, setPropertyFor] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const [listingType, setListingType] = useState("");

  useEffect(() => {
    setSearch(router.query.search);
  }, [router.query.search]);

  useEffect(() => {
    find({ search: value, propertyFor, listingType }, {});
  }, [value, propertyFor, listingType]);

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={5}>
              <Box>
                <TextField
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Property Type"
                name="listingType"
                select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
              >
                {[
                  {
                    label: "Apartment",
                    value: "apartment",
                  },
                  { label: "Daily Rent", value: "daily_rent" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Buy/Rent?"
                name="propertyFor"
                select
                value={propertyFor}
                onChange={(e) => setPropertyFor(e.target.value)}
              >
                {[
                  { label: "buy", value: "sell" },
                  { label: "rent", value: "rent" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
        {entities?.data?.listings?.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {entities?.data?.listings?.map((listing, idx) => {
              return (
                <Grid item xs={2} sm={4} md={3} key={idx}>
                  <Card sx={{ maxWidth: 345, height: 420 }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={`${
                        listing?.images?.length > 0
                          ? `http://${listing?.images[0]?.url}`
                          : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
                      }`}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ cursor: "pointer" }}
                        onClick={() => router.push(`/listing/${listing?.slug}`)}
                      >
                        {listing?.title}
                      </Typography>
                      <Typography variant="subtitle2">
                        {listing?.address?.city}
                      </Typography>
                      <Typography variant="subtitle1">
                        {listing?.billing?.propertyFor === "rent" ? (
                          <>
                            ₹{listing?.billing?.rent}/
                            {listing?.billing?.rentPeriod}
                          </>
                        ) : (
                          <>
                            ₹{listing?.billing?.rate}/{listing?.billing?.per}
                          </>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Box
              alt="No results found"
              component="img"
              src={`/static/error/error404_${theme.palette.mode}.svg`}
              sx={{
                height: "auto",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

SearchPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default SearchPage;
