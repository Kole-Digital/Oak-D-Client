import Head from "next/head";
import styles from "@/styles/home.module.css";
import { useContext, useState } from "react";
import HashLinkObserver from "react-hash-link";
import {
  About,
  Address,
  FAQ,
  GetStarted,
  Land,
  PageLayout,
  Testimonial,
  Why,
} from "@/components";
import { faqs } from "@/utils/faq";
import { OurLocation } from "@/components/DashboardComponent/SupportNavbar/OurLocation";
import { TrackContext } from "@/context/TrackWrapper";

export default function Home() {
  const {
    track,
    setTrack,
    trackPage,
    setTrackPage,
    userDetail,
    setUserDetail,
    tracId,
    setTrackId,
  } = useContext(TrackContext);
  return (
    <>
      <Head>
        <title>OAK & D LOGISTICS</title>
        <meta
          name="description"
          content="Welcome to OAK&D Canada, your trusted logistics partner for seamless package shipping and delivery. Our mission is to connect you with efficient and reliable shipping solutions, ensuring your packages reach their destination on time, every time. Explore our services today and experience hassle-free shipping with OAK&D."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageLayout>
        <main>
          {/* <HashLinkObserver /> */}
          <Land />
          <div style={{ display: trackPage === 1 ? "none" : "block" }}>
            <Why />
            <About />
            <Testimonial />
            {/* <div className='px-[50px]'> */}
            <Address />
            <FAQ faqs={faqs} />
            <GetStarted />
          </div>
        </main>
      </PageLayout>
    </>
  );
}
