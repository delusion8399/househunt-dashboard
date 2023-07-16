import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useEntity } from "src/hooks/use-entity";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { CustomerBasicDetails } from "../../../../components/dashboard/customer/customer-basic-details";
import { CustomerListings } from "../../../../components/dashboard/customer/customer-listings";
import { CustomerLogs } from "../../../../components/dashboard/customer/customer-logs";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { ChevronDown as ChevronDownIcon } from "../../../../icons/chevron-down";
import { PencilAlt as PencilAltIcon } from "../../../../icons/pencil-alt";
import { gtm } from "../../../../lib/gtm";
import type { Customer } from "../../../../types/customer";
import { getInitials } from "../../../../utils/get-initials";
import { Trash } from "src/icons/trash";
import toast from "react-hot-toast";

const tabs = [
  { label: "Details", value: "details" },
  { label: "Listings", value: "listings" },
  { label: "Logs", value: "logs" },
];

const CustomerDetails: NextPage = () => {
  const { findOne, entity, deleteEntity } = useEntity("user");
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("details");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  useEffect(() => {
    findOne(router.query.customerId);
  }, []);

  useEffect(() => {
    if (entity) setCustomer(entity.data);
  }, [entity]);

  if (!customer) {
    return null;
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteEntity(userId);
      toast.success("User deleted");
      router.push("/dashboard/customers");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard: User Details | Househunt</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink href="/dashboard/customers" passHref>
                <Link
                  color="textPrimary"
                  component="a"
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">Customers</Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid
                item
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                <Avatar
                  src={customer.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                  }}
                >
                  {getInitials(customer.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">{customer.email}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">user_id:</Typography>
                    <Chip label={customer._id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink
                  href={`/dashboard/customers/${customer._id}/edit`}
                  passHref
                >
                  <Button
                    component="a"
                    endIcon={<PencilAltIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </NextLink>
                <Button
                  endIcon={<Trash fontSize="small" />}
                  color="error"
                  variant="outlined"
                  onClick={() => handleDeleteUser(customer._id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === "details" && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomerBasicDetails
                    address1={
                      customer.address1 ||
                      customer?.address?.split(",")[0] ||
                      ""
                    }
                    address2={
                      customer.address1 ||
                      customer?.address?.split(",")[2] ||
                      ""
                    }
                    country={customer.country}
                    email={customer.email}
                    isVerified={customer.isVerified}
                    phone={customer.mobile}
                    state={customer.state}
                  />
                </Grid>
              </Grid>
            )}
            {currentTab === "listings" && <CustomerListings />}
            {currentTab === "logs" && <CustomerLogs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomerDetails;
