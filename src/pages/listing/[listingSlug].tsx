import { Card, CardContent, CardHeader, Divider, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { find } from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ContactForm } from "src/components/contact/contact-form";
import PopularProjectsCard from "src/components/listing/popular-projects-card";
import PopularProjectsSection from "src/components/listing/popular-projects-section";
import PropertyDetailsTabs from "src/components/listing/property-details-tabs";
import PropertyHeader from "src/components/listing/property-header";
import PropertyLightBox from "src/components/listing/property-lightbox";
import PropertySpecsBar from "src/components/listing/property-specs-bar";
import { MainLayout } from "src/components/main-layout";
import { useEntity } from "src/hooks/use-entity";

const ListingSlug = () => {
  const router = useRouter();
  const { findOne, entity } = useEntity("listing/slug");
  const { find, entities } = useEntity("listing/get-featured");

  useEffect(() => {
    findOne(router.query.listingSlug);
  }, [router.query.listingSlug]);

  useEffect(() => {
    find({ limit: 2 }, {});
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <PopularProjectsSection listings={entities?.data?.listings} />
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
