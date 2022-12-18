import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useAuth } from "src/hooks/use-auth";
import { useEntity } from "src/hooks/use-entity";
import { useDebounce } from "use-debounce";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { PropertiesListTable } from "../../../components/dashboard/properties/properties-list-table";
import { Download as DownloadIcon } from "../../../icons/download";
import { Plus as PlusIcon } from "../../../icons/plus";
import { Search as SearchIcon } from "../../../icons/search";
import { Upload as UploadIcon } from "../../../icons/upload";
import { gtm } from "../../../lib/gtm";

const ProductList: NextPage = () => {
  const { find, loading, entities } = useEntity("listing/get");
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const getProperties = async () => {
    try {
      const data: any = await find(
        { user: user._id, page, limit: rowsPerPage, searchQuery: value },
        {}
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(
    () => {
      getProperties();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, rowsPerPage, value]
  );

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Head>
        <title>Properties List</title>
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
                <Typography variant="h4">Properties</Typography>
              </Grid>
              <Grid item>
                <NextLink href="/dashboard/properties/new" passHref>
                  <Button
                    component="a"
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Add
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>

          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                p: 2,
              }}
            >
              <SearchIcon fontSize="small" />
              <Box
                sx={{
                  flexGrow: 1,
                  ml: 3,
                }}
              >
                <Input
                  disableUnderline
                  fullWidth
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by property name"
                  value={search}
                />
              </Box>
            </Box>
            <PropertiesListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page - 1}
              properties={entities?.data?.listings}
              propertiesCount={entities?.data?.total}
              rowsPerPage={rowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

ProductList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ProductList;
