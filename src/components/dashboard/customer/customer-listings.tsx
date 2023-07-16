import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Card,
  CardHeader,
} from "@mui/material";
import { useFormik } from "formik";
import numeral from "numeral";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  ChangeEvent,
  FC,
  Fragment,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useEntity } from "src/hooks/use-entity";
import * as Yup from "yup";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { ChevronRight as ChevronRightIcon } from "../../../icons/chevron-right";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
import { Image as ImageIcon } from "../../../icons/image";
import type { Property } from "../../../types/property";
import { Scrollbar } from "../../scrollbar";
import environments from "src/environments";
import { useRouter } from "next/router";
import Chip from "@mui/material/Chip";
import { SeverityPill } from "src/components/severity-pill";
import { MoreMenu } from "src/components/more-menu";

export const CustomerListings: FC = (props) => {
  const { find, loading, entities } = useEntity("listing/get");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const router = useRouter();

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

  useEffect(() => {
    find(
      {
        user: router.query.customerId,
        page,
        limit: rowsPerPage,
      },
      {}
    );
  }, [page, rowsPerPage, router]);

  return (
    <Card {...props}>
      <CardHeader action={<MoreMenu />} title="All Properties" />
      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell width="25%">Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Property For</TableCell>
              <TableCell>Rent/Price</TableCell>
              <TableCell>Bed/Bath</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities?.data?.listings?.map((property) => {
              return (
                <Fragment key={property._id}>
                  <TableRow hover key={property._id}>
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {property?.images?.length > 0 ? (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "background.default",
                              backgroundImage: `url(${environments.HOST}/public/images/${property.images[0].name})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              borderRadius: 1,
                              display: "flex",
                              height: 80,
                              justifyContent: "center",
                              overflow: "hidden",
                              width: 80,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "background.default",
                              borderRadius: 1,
                              display: "flex",
                              height: 80,
                              justifyContent: "center",
                              width: 80,
                            }}
                          >
                            <ImageIcon fontSize="small" />
                          </Box>
                        )}
                        <Box
                          sx={{
                            cursor: "pointer",
                            ml: 2,
                          }}
                        >
                          <Typography variant="subtitle2">
                            {property.title}
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            in {property.address.city}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="body2">
                        {property.listingType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                        color={
                          property.billing.propertyFor === "rent"
                            ? "success"
                            : "info"
                        }
                      >
                        {property.billing.propertyFor}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      {property.billing.propertyFor === "rent"
                        ? `₹${numeral(property.billing.rent).format(
                            `0,0.00`
                          )}/${property.billing.rentPeriod}`
                        : `₹${numeral(property.billing.rate).format(
                            `0,0.00`
                          )}/${property.billing.per}`}
                    </TableCell>
                    <TableCell>
                      {property.placeInfo.bedrooms}/
                      {property.placeInfo.bathrooms}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component="a"
                        onClick={() =>
                          router.push({
                            pathname: "/dashboard/properties/new",
                            query: {
                              id: property._id,
                            },
                          })
                        }
                      >
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {open && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: "relative",
                          "&:after": {
                            position: "absolute",
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: "primary.main",
                            width: 3,
                            height: "calc(100% + 1px)",
                          },
                        }}
                      ></TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={entities?.data?.total}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
