import { TrackContext } from "@/context/TrackWrapper";
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaGlobe } from "react-icons/fa";
import Tracking from "./Tracking";
// import styles  from '@/styles/track.module.css'

export function Map() {
  const [toggle, setToggle] = useState<boolean>(false);
  const { track, setTrack, trackPage, setTrackPage } = useContext(TrackContext);

  return (
    <main className="" style={{ display: trackPage === 1 ? "block" : "none" }}>
      <div className="bg-[#FEFEFE] w-[100vw] py-[29px] flex items-center justify-between px-[23px] lg:px-[68px] ">
        <div
          className="cursor-pointer text-[24px] hover:text-[#AC0108] "
          onClick={() => {
            setTrackPage(0);
          }}
        >
          {" "}
          <FaArrowLeft />
        </div>
        <div className="flex items-center gap-[7px] cursor-pointer ">
          <FaGlobe /> <p>English</p>{" "}
          <ChevronDownIcon className="w-[6px] h-[11px] " />{" "}
        </div>
      </div>
      <div className="relative h-[600px] lg:h-[949px] ">
        <div className="w-[100%] h-[100%] ">
          <img
            src="/img/Map.webp"
            alt="Track Item"
            className="object-cover w-[100%] h-[100%] hidden lg:block"
          />
          <img
            src="/img/Map1.svg"
            alt="Track Item"
            className="object-cover w-[100%] h-[100%] lg:hidden block"
          />
        </div>
        <div className="absolute lg:top-[9%]  top-[22%] left-[12%] lg:left-[17%] lg:w-[68px] w-[25px] h-[25px] lg:h-[68px] rounded-full bg-[#AC0108]/[.2] grid place-items-center  ">
          <img src="/img/locate.svg" alt="Location pin" className="" />
        </div>
        <div className="absolute lg:top-[60%] top-[62%] lg:left-[87.5%] left-[80%] lg:w-[68px] w-[25px] h-[25px] lg:h-[68px] rounded-full bg-[#AC0108]/[.2] grid place-items-center  ">
          <img src="/img/locate.svg" alt="Location pin" className="" />
        </div>

        {/* line and dot */}

        <div className="absolute lg:top-[-30.5%] lg:left-[55%] lg:h-[113%] h-[58%] w-[0px] border-dashed border-2 border-[#FEFEFE] rotate-[-46deg] lg:rotate-[-63deg] left-[49%] top-[9%] translate-y-[11%]">
          <div className="relative">
            <div
              className={`lg:border-2 lg:border-[#AC0108] lg:rounded-[40px] lg:px-[5px] lg:py-[4px] lg:translate-x-[-10px] lg:mt-[24px] lg:w-[20px] lg:h-[20px] lg:grid lg:place-items-center`}
            >
              <div className="bg-[#AC0108] w-[8px] h-[8px] rounded-full gap-96" />
            </div>
          </div>

          <Tracking distance={600} timeInHours={12} />
        </div>

        {/* toggle burron*/}
        <div className="z-50 absolute top-10 left-10 h-10 w-10 bg-white flex items-center justify-center rounded-full">
          {toggle ? (
            <CloseIcon
              boxSize={6}
              widths={4}
              height={4}
              color="red.500"
              className="cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <HamburgerIcon
              boxSize={6}
              widths={6}
              height={6}
              color="red.500"
              className="cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
          )}
        </div>
        {/* Information box */}
        {toggle && (
          <div className="bg-[#FEFEFE]/[.85] lg:w-[35%] w-[90%] top-0 left-[5%] absolute lg:top-[330px] lg:left-[100px] lg:py-[29px] py-[15px] text-[#1E1E1E] rounded-[10px] ">
            <div className="lg:mb-[13px] mb-[5px] flex items-center justify-between lg:px-[31px] lg:text-[18px] font-[500]  ">
              <p>Tracking Number</p>
              <p>
                <span>DLSlg</span>-<span>786543</span>
              </p>
            </div>
            <div className="border border-[#515151] w-[100%] lg:mb-[32px]"></div>
            <div className="w-fit m-auto text-center lg:mb-[32px] ">
              <p className="text-[#0A089A] lg:text-[20px] ">Status</p>
              <p className="text-[#1E1E1E] lg:text-[28px] ">
                Package In Transit
              </p>
            </div>
            <div className="lg:w-[90%] m-auto font-[500] lg:text-[18px] text-[16px] px-[5px]  ">
              <div className="flex items-center justify-between lg:mb-[30px] mb-[10px]">
                <p>Client Name:</p>
                <p>Divine Onyeleonu</p>
              </div>
              <div className="flex items-center justify-between lg:mb-[30px] mb-[10px]">
                <p>Type Of Shipping:</p>
                <p>Global Shipping</p>
              </div>
              <div className="flex items-center justify-between lg:mb-[30px] mb-[10px]">
                <p>Departure:</p>
                <p>Lagos Nigeria</p>
              </div>
              <div className="flex items-center justify-between lg:mb-[30px] mb-[10px]">
                <p>Arrival:</p>
                <p>Lagos Nigeria</p>
              </div>
              <div className="flex items-center justify-between lg:mb-[30px] mb-[10px]">
                <p>Estimated Time Of Arrival:</p>
                <p>
                  <span>13</span>/<span>10</span>/<span>2023</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
