import { Card, CardContent, CardHeader, Divider, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ContactForm } from "src/components/contact/contact-form";
import PopularProjectsCard from "src/components/listing/popular-projects-card";
import PropertyDetailsTabs from "src/components/listing/property-details-tabs";
import PropertyHeader from "src/components/listing/property-header";
import PropertyLightBox from "src/components/listing/property-lightbox";
import PropertySpecsBar from "src/components/listing/property-specs-bar";
import { MainLayout } from "src/components/main-layout";
import { useEntity } from "src/hooks/use-entity";

const ListingSlug = () => {
  const router = useRouter();
  const { findOne, entity } = useEntity("listing/slug");

  useEffect(() => {
    findOne(router.query.listingSlug);
  }, [router.query.listingSlug]);

  return (
    <>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap"
          sx={{ my: 3 }}
        >
          <Box sx={{ mt: 2 }}>
            <PopularProjectsCard />
          </Box>
          <Box sx={{ mt: 2 }}>
            <PopularProjectsCard />
          </Box>
          <Box sx={{ mt: 2 }}>
            <PopularProjectsCard />
          </Box>
        </Stack>
        <PropertyHeader listing={entity?.data} />

        <PropertyLightBox images={entity?.data?.images} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <PropertySpecsBar listing={entity?.data} />
        </Stack>
        <PropertyDetailsTabs listing={entity?.data} />

        <Card>
          <CardHeader title="Contact Developer" />
          <Divider />
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

ListingSlug.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default ListingSlug;
