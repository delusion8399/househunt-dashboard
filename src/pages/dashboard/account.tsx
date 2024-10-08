import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { AccountGeneralSettings } from "../../components/dashboard/account/account-general-settings";
import { AccountSecuritySettings } from "../../components/dashboard/account/account-security-settings";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { gtm } from "../../lib/gtm";

const tabs = [
  { label: "General", value: "general" },
  { label: "Security", value: "security" },
];

const Account: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("general");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4">Account</Typography>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === "general" && <AccountGeneralSettings />}

          {currentTab === "security" && <AccountSecuritySettings />}
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Account;
