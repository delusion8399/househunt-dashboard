import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { MainLayout } from "src/components/main-layout";
import { useEntity } from "src/hooks/use-entity";

const ListingSlug = () => {
  const router = useRouter();
  const { findOne, entity } = useEntity("listing/slug");

  useEffect(() => {
    findOne(router.query.listingSlug);
  }, [router.query.listingSlug]);

  return <div></div>;
};

ListingSlug.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default ListingSlug;
