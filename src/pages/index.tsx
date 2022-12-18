import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { MainLayout } from "../components/main-layout";
import { gtm } from "../lib/gtm";

const Home: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Househunt</title>
      </Head>
      <main> </main>
    </>
  );
};

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Home;
