import { useState, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import { Avatar, Box, Chip, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { CustomerEditForm } from "../../../../components/dashboard/customer/customer-edit-form";
import { gtm } from "../../../../lib/gtm";
import type { Customer } from "../../../../types/customer";
import { getInitials } from "../../../../utils/get-initials";
import { useRouter } from "next/router";
import { useEntity } from "src/hooks/use-entity";

const CustomerEdit: NextPage = () => {
  const { findOne, entity } = useEntity("user");

  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    findOne(router.query.customerId);
  }, []);

  useEffect(() => {
    if (entity) setCustomer(entity.data);
  }, [entity]);

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: User Edit</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
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
          <Box
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
              <Typography noWrap variant="h4">
                {customer.email}
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="subtitle2">user_id:</Typography>
                <Chip label={customer._id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <CustomerEditForm customer={customer} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomerEdit;
