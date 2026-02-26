import { Map, PageLayout, ParcelTrack, TrackLand } from "@/components";
import { TrackContext, TrackContextProvider } from "@/context/TrackWrapper";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";

type dataProps = {
  uid: string;
  device_uid: string;
  file: string;
  captured: string;
  received: string;
  body: {
    temperature: number;
    voltage: number;
    status: string;
  };
  tower_location?: {
    when: string;
    latitude: number;
    longitude: number;
  };
  gps_location: {
    latitude: number;
    longitude: number;
  };
};

export default function Index() {
  const { track, setTrack, trackPage, setTrackPage } = useContext(TrackContext);
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
      <TrackContextProvider>
        <TrackLand />
        {/* <Map /> */}
        <ParcelTrack />
      </TrackContextProvider>
    </>
  );
}
