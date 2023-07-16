import { Box, Container, Grid, Typography } from "@mui/material";
import { getHours } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Chart1 } from "src/components/widgets/charts/chart-1";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { gtm } from "../../lib/gtm";
import { HotPropertiesChart } from "src/components/dashboard/hot-properties-chart";
import { useEntity } from "src/hooks/use-entity";
import { useAuth } from "src/hooks/use-auth";

const Overview: NextPage = () => {
  const { user } = useAuth();
  const { find, entities } = useEntity("listing/get-hot-properties");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  function greeting() {
    const hour = getHours(new Date());

    if (hour > 16) {
      return "Good evening";
    }

    if (hour > 11) {
      return "Good afternoon";
    }

    return "Good morning";
  }

  useEffect(() => {
    find({ ...(user.type === "user" ? { user: user._id } : {}) }, {});
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{greeting()}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              {console.log(entities)}
              <HotPropertiesChart data={entities.data ?? []} />
            </Grid>
            <Grid item md={6} xs={12}></Grid>
            <Grid item md={8} xs={12}></Grid>
            <Grid item md={4} xs={12}></Grid>
            <Grid item md={8} xs={12}></Grid>
            <Grid item md={4} xs={12}></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Overview;
