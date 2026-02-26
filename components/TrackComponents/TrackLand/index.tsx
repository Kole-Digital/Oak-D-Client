import { TrackContext, TrackContextType } from "@/context/TrackWrapper";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrackerDataType, trackParcel } from "@/api/api";

export type trackDataType = {
  ETA: string;
  arrival: string;
  departure: string;
  packageType: string;
  sender: string;
  shipmentStatus: string;
};

export function TrackLand() {
  const {
    track,
    setTrack,
    trackPage,
    setTrackPage,
    userDetail,
    setUserDetail,
    tracId,
    setTrackId,
    processing,
    setProcessing,
    exist,
    setExist,
  } = useContext(TrackContext);
  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTrackId((prevLoginData: any) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  };

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);
    try {
      const { msg, data, token, status } = await trackParcel(tracId);
      if (data) {
        setUserDetail(data);
        setTrackPage(1);
        setProcessing(false);
        setExist(status);
        const inputElement = document.getElementById(
          "trackingID"
        ) as HTMLInputElement;
        if (inputElement) {
          inputElement.value = "";
        }
      } else {
        setProcessing(false);
        setExist(status);
      }
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <main
      className="relative"
      style={{ display: trackPage === 0 ? "block" : "none" }}
    >
      <Navbar />
      <div className="w-[100vw] h-[100vh] mt-[100px] ">
        <img
          src="/img/track-back.webp"
          alt="Track Item"
          className="w-[100%] h-[100%] object-cover block lg:hidden"
        />
        <img
          src="/img/track-back1.webp"
          alt="Track Item"
          className="w-[100%] h-[100%] object-cover hidden lg:block"
        />
      </div>
      <div className="absolute top-[100px] lg:top-[105px] lg:flex lg:items-center lg:justify-around lg:left-[5%] ">
        <div className="w-[90%] mt-[46px] m-auto bg-[#FEFEFE]/[.68] py-[28px] px-[19px] md:py-[48px] md:px-[39px] mb-[28px] md:mb-[48px] lg:w-[40%] lg:mt-[0px] ">
          <h1 className="font-[600] text-[20px] text-[#AC0108] mb-[10px] ">
            TRACK PARCEL
          </h1>
          <p className="font-[700] text-[32px] text-[#1E1E1E] ">
            To track your item, input the tracking number in the field provided
          </p>
        </div>
        <form
          onSubmit={handleClick}
          className="md:relative md:w-[627px] w-fit grid place-items-center lg:mr-[100px]  "
        >
          <input
            type="text"
            name="trackingID"
            id="trackingID"
            onChange={handleLoginChange}
            className=" w-fit  py-[18px] px-[50px] ml-[15%] text-[16px] text-center outline-none bg-[#FEFEFE] border-2 border-[#E3E3E3] text-[#1E1E1E] placeholder:text-[#989898] placeholder:text-[16px] rounded-[10px] md:mb-[20px] mb-[20px] md:py-[12px] md:text-[24px] md:px-[74px] md:ml-[30%] md:placeholder:text-[18px] lg:py-[25px] md:px-[94px]  "
            placeholder="Input Tracking number"
          />

          {processing && (
            <button
              className="bg-[#0A089A] text-[16px] text-[#FEFEFE] rounded-[10px] py-[15px] px-[37px] ml-[15%]  md:text-[18px]  md:ml-[30%] lg:top-[10%] lg:py-[20px] lg:px-[38px]  "
              type="submit"
            >
              Tracking...
            </button>
          )}

          {!processing && (
            <button
              className="bg-[#AC0108] text-[16px] text-[#FEFEFE] rounded-[10px] py-[15px] px-[33px] ml-[15%] hover:bg-[#0A089A]  md:text-[18px]  md:ml-[30%] lg:top-[10%] lg:py-[20px] lg:px-[32px]  "
              type="submit"
            >
              Track Parcel
            </button>
          )}

          <div
            className="w-[40%] bg-[#FEFEFE] rounded-[5px] py-[15px] text-center mt-[20px] ml-[30%] font-semibold text-[14px] "
            style={{ display: exist === "Unsuccessful" ? "block" : "none" }}
          >
            Parcel dosen&apos;post exist
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}
