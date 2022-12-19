import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { RentCard } from "src/components/index/rent-card";
import RentProperties from "src/components/index/rent-properties";
import { SellCard } from "src/components/index/sell-card";
import SellProperties from "src/components/index/sell-properties";
import { Scrollbar } from "src/components/scrollbar";
import { useEntity } from "src/hooks/use-entity";
import { MainLayout } from "../components/main-layout";
import { gtm } from "../lib/gtm";

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);
  const { find: findRent, entities: rent } = useEntity("listing");
  const { find: findSell, entities: sell } = useEntity("listing");

  useEffect(() => {
    findRent({ propertyFor: "rent" }, {});
    findSell({ propertyFor: "sell" }, {});
  }, []);

  return (
    <>
      <Head>
        <title>Househunt</title>
      </Head>
      <main>
        <Container maxWidth="lg">
          <Card sx={{ p: 4, mt: 5, mb: 5 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h2">Luxury Apartments Downtown</Typography>
              <Box sx={{ display: "flex", mt: 2 }}>
                {["Buy", "Rent"]?.map((op) => {
                  return (
                    <Box
                      key={op}
                      onClick={() => setActiveTab(op)}
                      sx={{
                        mr: 2,
                        px: 3,
                        py: 2,
                        backgroundColor:
                          activeTab === op ? "#5148E4" : "#EDEDED",
                        color: activeTab === op ? "#EDEDED" : "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                        cursor: "pointer",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                        {op}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{ width: "100%", mt: 2 }}>
                <TextField
                  placeholder="Search"
                  autoFocus
                  sx={{ width: "100%", borderColor: "#fff" }}
                ></TextField>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    component="a"
                    href="https://material-ui.com/store/items/devias-kit-pro"
                    size="large"
                    sx={{ mt: 2 }}
                    target="_blank"
                    variant="contained"
                  >
                    Search
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>
        </Container>
        <Container maxWidth="lg">
          <SellProperties listings={sell?.data?.listings} />
          <Scrollbar>
            <RentProperties listings={rent?.data?.listings} />
          </Scrollbar>
        </Container>
        <Container maxWidth="xl">
          <Card sx={{ p: 5, my: 4 }}>
            <Typography variant="h6">Your next dream home.</Typography>
            <Typography variant="h3">
              We Help People and Homes Find Each Other
            </Typography>
          </Card>
        </Container>
      </main>
    </>
  );
};
Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Home;
