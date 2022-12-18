import { useState, useEffect } from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FileDropzone } from "../../file-dropzone";
import { QuillEditor } from "../../quill-editor";
import { useEntity } from "src/hooks/use-entity";
import { useAuth } from "src/hooks/use-auth";
import useImageUpload from "src/hooks/use-image-upload";
import { useQueryClient } from "react-query";

export const listingType = [
  { value: "apartment", label: "Apartment" },
  { value: "room_in_apartment", label: "Room in Apartment" },
  { value: "daily_rent", label: "Daily Rent" },
  { value: "hostel", label: "Hostel" },
  { value: "office_space", label: "Office Space" },
  { value: "godown", label: "Godown" },
  { value: "shop", label: "Shop" },
];

const genericAnswers = [
  { value: "YES", label: "YES" },
  { value: "NO", label: "NO" },
  { value: "NA", label: "NA" },
];

export const PropertyCreateForm: FC = (props) => {
  const router = useRouter();
  const edit = router?.query?.id;
  const { user } = useAuth();
  const [files, setFiles] = useState<any[]>([]);
  const { create, loading, findOne, entity, updateEntity, deleteEntity } =
    useEntity("listing");
  const queryClient = useQueryClient();
  const { uploadImages, response } = useImageUpload("/upload/images");
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      listingType: "apartment",
      address: "",
      phone: "",
      street: "",
      district: "",
      floor: "",
      city: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      frontDoorSecurity: "",
      securityCameras: "",
      balcony: "",
      lift: "",
      freeWifi: "",
      furnishing: "",
      rentPeriod: "month",
      rent: "",
      advance: "",
      water: "",
      electricity: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Email is required"),
      description: Yup.string().required("Description is required"),
      listingType: Yup.string().required("Listing Type is required"),
      phone: Yup.number().required("Number is required"),
      address: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
      district: Yup.string().required("Required"),
      floor: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      bedrooms: Yup.number().required("Required"),
      bathrooms: Yup.number().required("Required"),
      area: Yup.number().required("Required"),
      securityCameras: Yup.string().required("Required"),
      frontDoorSecurity: Yup.string().required("Required"),
      balcony: Yup.string().required("Required"),
      lift: Yup.string().required("Required"),
      freeWifi: Yup.string().required("Required"),
      furnishing: Yup.string().required("Required"),
      rent: Yup.number().required("Required"),
      advance: Yup.number().required("Required"),
      rentPeriod: Yup.string().required("Required"),
      water: Yup.string().required("Required"),
      electricity: Yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request

        const payload = {
          title: values.title,
          description: values.description,
          listingType: values.listingType,
          contact: values.phone,
          contacts: [values.phone],
          address: {
            city: values.city,
            road: values.street,
            floor: values.floor,
            building: values.address,
            district: values.district,
          },
          placeInfo: {
            area: values.area,
            bedrooms: values.bedrooms,
            bathrooms: values.bathrooms,
          },
          billing: {
            rent: values.rent,
            rentPeriod: values.rentPeriod,
            advance: values.advance,
            otherCharges: [],
            bills: {
              water: values.water,
              electricity: values.electricity,
            },
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
            {
              label: "Balcony",
              value: values.balcony,
            },
            {
              label: "Front Door Security",
              value: values.frontDoorSecurity,
            },
            {
              label: "Security Cameras",
              value: values.securityCameras,
            },
            {
              label: "Lift",
              value: values.lift,
            },
            {
              label: "Free Wifi",
              value: values.freeWifi,
            },
            {
              label: "Free Tv",
              value: "-",
            },
            {
              label: "Ideal Tenants",
              value: "-",
            },
            {
              label: "Furnishing",
              value: values.furnishing,
            },
          ],
          images:
            response?.data?.length > 0
              ? [...response.data, ...files].map((img) => ({
                  url: img.url,
                  name: img.name,
                  path: img.path,
                  size: img.size,
                }))
              : edit
              ? files
              : [], // pending
          user: user._id,
        };

        {
          edit ? await updateEntity(edit, payload) : await create(payload);
        }

        toast.success("Property created!");
        router.push("/dashboard/properties");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleDrop = (newFiles: any): void => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file): void => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = (): void => {
    setFiles([]);
  };

  const handleUpload = async (): Promise<void> => {
    try {
      await uploadImages(files);
      toast.success("Images uploaded");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      findOne(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (entity) {
      const selectedValues: {
        furnishing?: string;
        balcony?: string;
        frontDoorSecurity?: string;
        securityCameras?: string;
        lift?: string;
        freeWifi?: string;
      } = {};

      for (const item of entity?.data?.placeDescription) {
        if (item.label === "Furnishing") selectedValues.furnishing = item.value;
        if (item.label === "Balcony") selectedValues.balcony = item.value;
        if (item.label === "Front Door Security")
          selectedValues.frontDoorSecurity = item.value;
        if (item.label === "Security Cameras")
          selectedValues.securityCameras = item.value;
        if (item.label === "Lift") selectedValues.lift = item.value;
        if (item.label === "Free Wifi") selectedValues.freeWifi = item.value;
      }

      formik.setValues({
        title: entity?.data?.title,
        description: entity.data?.description,
        listingType: entity?.data?.listingType,
        address: entity?.data?.address?.building,
        phone: entity?.data?.contact,
        street: entity?.data?.address?.road,
        district: entity?.data?.address?.district,
        floor: entity?.data?.address?.floor,
        city: entity?.data?.address?.city,
        bedrooms: entity?.data?.placeInfo?.bedrooms,
        bathrooms: entity?.data?.placeInfo?.bathrooms,
        area: entity?.data?.placeInfo?.area,
        frontDoorSecurity: selectedValues?.frontDoorSecurity,
        securityCameras: selectedValues?.securityCameras,
        balcony: selectedValues?.balcony,
        lift: selectedValues?.lift,
        freeWifi: selectedValues?.freeWifi,
        furnishing: selectedValues.furnishing,
        rentPeriod: entity?.data?.billing?.rentPeriod,
        rent: entity?.data?.billing?.rent,
        advance: entity?.data?.billing?.advance,
        water: entity?.data?.billing?.bills?.water,
        electricity: entity?.data?.billing?.bills?.electricity,
      });

      setFiles(entity?.data?.images);
    }
  }, [entity]);

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(formik.touched.title && formik.errors.title)}
                fullWidth
                helperText={formik.touched.title && formik.errors.title}
                label="Title"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              <Typography
                color="textSecondary"
                sx={{
                  mb: 2,
                  mt: 3,
                }}
                variant="subtitle2"
              >
                Description
              </Typography>
              <QuillEditor
                onChange={(value: string): void => {
                  formik.setFieldValue("description", value);
                }}
                placeholder="Write something"
                sx={{ height: 400 }}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              )}
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                label="Contact"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="number"
                value={formik.values.phone}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Images</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Images will appear in the store front of your website.
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <FileDropzone
                accept="image/*"
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
                onUpload={handleUpload}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Place Info</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Geographical Details, be as precise as you can!
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.listingType && formik.errors.listingType
                )}
                fullWidth
                label="Listing Type"
                name="listingType"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.listingType}
              >
                {listingType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                label="Address"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                sx={{ mt: 2 }}
                value={formik.values.address}
              />
              <TextField
                error={Boolean(formik.touched.street && formik.errors.street)}
                fullWidth
                label="Street Name"
                name="street"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="text"
                value={formik.values.street}
              />
              <TextField
                error={Boolean(
                  formik.touched.district && formik.errors.district
                )}
                fullWidth
                label="District"
                name="district"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="text"
                value={formik.values.district}
              />
              <TextField
                error={Boolean(formik.touched.floor && formik.errors.floor)}
                fullWidth
                label="Floor"
                name="floor"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="text"
                value={formik.values.floor}
              />
              <TextField
                error={Boolean(formik.touched.city && formik.errors.city)}
                fullWidth
                label="City"
                name="city"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                type="text"
                value={formik.values.city}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Space Division</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.bedrooms && formik.errors.bedrooms
                )}
                fullWidth
                label="Bedrooms"
                name="bedrooms"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                value={formik.values.bedrooms}
              />
              <TextField
                error={Boolean(
                  formik.touched.bathrooms && formik.errors.bathrooms
                )}
                fullWidth
                label="Bathrooms"
                name="bathrooms"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                value={formik.values.bathrooms}
              />
              <TextField
                error={Boolean(formik.touched.area && formik.errors.area)}
                fullWidth
                label="Area"
                name="area"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                value={formik.values.area}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Questionnaire</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(formik.touched.balcony && formik.errors.balcony)}
                fullWidth
                label="Does this place have balcony?"
                name="balcony"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.balcony}
              >
                {genericAnswers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={Boolean(
                  formik.touched.frontDoorSecurity &&
                    formik.errors.frontDoorSecurity
                )}
                fullWidth
                label="Does this place have door security?"
                name="frontDoorSecurity"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 3 }}
                value={formik.values.frontDoorSecurity}
              >
                {genericAnswers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={Boolean(
                  formik.touched.securityCameras &&
                    formik.errors.securityCameras
                )}
                fullWidth
                label="Does this place have security cameras?"
                name="securityCameras"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 3 }}
                value={formik.values.securityCameras}
              >
                {genericAnswers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={Boolean(formik.touched.lift && formik.errors.lift)}
                fullWidth
                label="Does this place have lift?"
                name="lift"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 3 }}
                value={formik.values.lift}
              >
                {genericAnswers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={Boolean(
                  formik.touched.freeWifi && formik.errors.freeWifi
                )}
                fullWidth
                label="Do you offer free WiFi?"
                name="freeWifi"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 3 }}
                value={formik.values.freeWifi}
              >
                {genericAnswers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={Boolean(
                  formik.touched.furnishing && formik.errors.furnishing
                )}
                fullWidth
                label="What is the furnishing of the place?"
                name="furnishing"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 3 }}
                value={formik.values.furnishing}
              >
                {[
                  { label: "Not Furnished", value: "Not Furnished" },
                  { label: "Semi-Furnished", value: "Semi-Furnished" },
                  { label: "Fully Furnished", value: "Fully Furnished" },
                  { label: "-", value: "-" },
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
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Billing</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.rentPeriod && formik.errors.rentPeriod
                )}
                fullWidth
                label="Rent Period"
                name="rentPeriod"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.rentPeriod}
              >
                {[
                  { label: "day", value: "day" },
                  { label: "month", value: "month" },
                  { label: "year", value: "year" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={Boolean(formik.touched.rent && formik.errors.rent)}
                fullWidth
                label="Rent"
                name="rent"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                value={formik.values.rent}
              />
              <TextField
                error={Boolean(formik.touched.advance && formik.errors.advance)}
                fullWidth
                label="Advance"
                name="advance"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                value={formik.values.advance}
              />
              <TextField
                error={Boolean(formik.touched.water && formik.errors.water)}
                fullWidth
                label="Water Bill"
                name="water"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 3 }}
                value={formik.values.water}
              >
                {[
                  { label: "included", value: "included" },
                  { label: "separate", value: "separate" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={Boolean(formik.touched.water && formik.errors.water)}
                fullWidth
                label="Electricity Bill"
                name="electricity"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 3 }}
                value={formik.values.electricity}
              >
                {[
                  { label: "included", value: "included" },
                  { label: "separate", value: "separate" },
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mx: -1,
          mb: -1,
          mt: 3,
        }}
      >
        <Button
          color="error"
          sx={{
            m: 1,
            mr: "auto",
          }}
          onClick={async () => {
            await deleteEntity(edit);
            toast.success("Property deleted");
            router.push("/dashboard/properties");
            queryClient.invalidateQueries("find-listing/get");
          }}
        >
          Delete
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={() => router.push("/dashboard/properties")}
        >
          Cancel
        </Button>
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          {edit ? "Update" : "Create"}
        </Button>
      </Box>
    </form>
  );
};
