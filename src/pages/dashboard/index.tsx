import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { getHours } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { Briefcase as BriefcaseIcon } from "../../icons/briefcase";
import { Download as DownloadIcon } from "../../icons/download";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "../../icons/information-circle-outlined";
import { Users as UsersIcon } from "../../icons/users";
import { gtm } from "../../lib/gtm";

const Overview: NextPage = () => {
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
            <Grid item md={6} xs={12}></Grid>
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
