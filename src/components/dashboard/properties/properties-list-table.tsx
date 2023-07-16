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
import { listingType } from "./properties-create-form";
import environments from "src/environments";
import { useRouter } from "next/router";
import Chip from "@mui/material/Chip";
import { SeverityPill } from "src/components/severity-pill";

interface PropertiesListTableProps {
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  properties: Property[];
  propertiesCount: number;
  rowsPerPage: number;
}

export const PropertiesListTable: FC<PropertiesListTableProps> = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    properties,
    propertiesCount,
    rowsPerPage,
    ...other
  } = props;
  const [openProperty, setOpenProperty] = useState<string>(null);
  const { deleteEntity, updateEntity, findOne, entity } = useEntity("listing");
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleOpenProperty = (propertyId: string): void => {
    setOpenProperty((prevValue) =>
      prevValue === propertyId ? null : propertyId
    );
  };

  const handleCancelEdit = (): void => {
    setOpenProperty(null);
  };

  const handleDeleteProperty = async (id: string): Promise<any> => {
    await deleteEntity(id);
    queryClient.invalidateQueries("find-listing/get");
    toast.success("Property deleted");
  };

  const { setValues, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      title: "",
      listingType: "apartment",
      bedrooms: "",
      bathrooms: "",
      area: "",
      advance: "",
      rentPeriod: "month",
      rent: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Email is required"),
      listingType: Yup.string().required("Listing Type is required"),
      bedrooms: Yup.number().required("Required"),
      bathrooms: Yup.number().required("Required"),
      area: Yup.number().required("Required"),
      advance: Yup.string().required("Required"),
      rent: Yup.number().required("Required"),
      rentPeriod: Yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request

        console.log(openProperty);

        await updateEntity(openProperty, {
          title: values.title,
          listingType: values.listingType,
          placeInfo: {
            area: values.area,
            bedrooms: values.bedrooms,
            bathrooms: values.bathrooms,
          },
          billing: {
            rent: values.rent,
            rentPeriod: values.rentPeriod,
            advance: values.advance,
          },
          placeDescription: [
            {
              label: "Bedrooms",
              value: values.bedrooms,
            },
            {
              label: "Bathrooms",
              value: values.bathrooms,
            },
            {
              label: "Area (sqft)",
              value: values.area,
            },
          ],
        });
        toast.success("Property updated!");
        queryClient.invalidateQueries("find-listing/get");

        setOpenProperty(null);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (openProperty) {
      findOne(openProperty);

      setValues({
        title: entity?.data?.title,
        listingType: entity?.data?.listingType,
        bedrooms: entity?.data?.placeInfo?.bedrooms,
        bathrooms: entity?.data?.placeInfo?.bathrooms,
        area: entity?.data?.placeInfo?.area,
        advance: entity?.data?.billing?.advance,
        rent: entity?.data?.billing?.rent,
        rentPeriod: entity?.data?.billing?.rentPeriod,
      });
    }
  }, [openProperty, entity]);

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="25%">Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Property For</TableCell>
              <TableCell>Rent/Price</TableCell>
              <TableCell>Bed/Bath</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propertiesCount === 0 && (
              <TableRow>
                <TableCell colSpan={6}>No properties found</TableCell>
              </TableRow>
            )}
            {properties?.map((property) => {
              const open = property._id === openProperty;

              return (
                <Fragment key={property._id}>
                  <TableRow hover key={property._id}>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(open && {
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
                        }),
                      }}
                      width="25%"
                    >
                      <IconButton
                        onClick={() => handleOpenProperty(property._id)}
                      >
                        {open ? (
                          <ChevronDownIcon fontSize="small" />
                        ) : (
                          <ChevronRightIcon fontSize="small" />
                        )}
                      </IconButton>
                    </TableCell>
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
                      >
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                              <Typography variant="h6">
                                Basic details
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    value={values.title}
                                    fullWidth
                                    label="Title"
                                    name="title"
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    value={values.rent}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Rent"
                                    name="rent"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    value={values.advance}
                                    fullWidth
                                    label="Advance"
                                    name="advance"
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Rent Period"
                                    select
                                    name="rentPeriod"
                                    value={values.rentPeriod}
                                    onChange={handleChange}
                                  >
                                    {[
                                      { label: "day", value: "day" },
                                      { label: "month", value: "month" },
                                      { label: "year", value: "year" },
                                    ].map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Typography variant="h6">
                                Space Division
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Bedrooms"
                                    name="bedrooms"
                                    value={values.bedrooms}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Bathrooms"
                                    name="bathrooms"
                                    value={values.bathrooms}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Area"
                                    name="area"
                                    value={values.area}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    value={values.listingType}
                                    fullWidth
                                    label="Listing Type"
                                    onChange={handleChange}
                                    name="listingType"
                                    select
                                  >
                                    {listingType.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            px: 2,
                            py: 1,
                          }}
                        >
                          <Button
                            onClick={() => handleSubmit()}
                            sx={{ m: 1 }}
                            variant="contained"
                          >
                            Update
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            sx={{ m: 1 }}
                            variant="outlined"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleDeleteProperty(property._id)}
                            color="error"
                            sx={{
                              m: 1,
                              ml: "auto",
                            }}
                          >
                            Delete property
                          </Button>
                        </Box>
                      </TableCell>
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
        count={propertiesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

PropertiesListTable.propTypes = {
  properties: PropTypes.array.isRequired,
  propertiesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
