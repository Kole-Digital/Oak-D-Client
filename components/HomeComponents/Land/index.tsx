import React, { useContext } from "react";
import styles from "@/styles/home.module.css";
import Image from "next/image";
import { TrackContext } from "@/context/TrackWrapper";
import router, { Router } from "next/router";
import { trackParcel } from "@/api/api";
import { ParcelTrack } from "@/components/TrackComponents";

export function Land() {
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
      console.log("data", data);
      if (data) {
        setUserDetail(data);
        setProcessing(false);
        setExist(status);
        console.log(status);
        setTrackPage(1);
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
    <div className="100vh 100vw relative lg:mb-[100px]">
      {trackPage === 1 && <ParcelTrack />}
      <div style={{ display: trackPage === 1 ? "none" : "block" }}>
        <div className="block h-[500px] sm:h-[450px] md:hidden">
          <img
            className="w-full h-full object-cover"
            src="/img/new-land.png"
            alt="OAK Image"
          />
        </div>
        <div className="hidden md:block">
          <img
            src="/img/land-image1.webp"
            alt="OAK Image"
            className="w-[100%] h-[100%] md:h-[100%] "
          />
        </div>
      </div>
      <div
        className="absolute top-[20px] text-[#FEFEFE] px-[20px] "
        style={{ display: trackPage === 1 ? "none" : "block" }}
      >
        <div className=" text-center m-auto mt-[70px] md:mt-[19px] font-[500] mb-[30px] md:mb-[0px] lg:mb-[50px] lg:w-[80%] lg:mt-[50px] lg:m-auto ">
          <h2 className="font-[700] text-[30px] mb-[20px] md:w-[50%] lg:w-[70%] lg:text-[50px] lg:mb-[30px] md:text-left  ">
            Fast and Reliable Cargo Shipping
          </h2>
          <p className="mb-[20px] md:mb-[5px] lg:mb-[30px] text-[16px] md:w-[60%] lg:text-[20px] lg:w-[70%] md:text-left ">
            Choose OAK & D to enjoy hassle-free shipping that meets your unique
            business requirements.
          </p>
          <form
            onSubmit={handleClick}
            className=" flex flex-col gap-[50px] md:relative md:w-[627px]"
          >
            <input
              type="text"
              name="trackingID"
              id="trackingID"
              onChange={handleLoginChange}
              className="py-[15px] px-[37px] w-[100%] text-[24px] text-center outline-none bg-[#FEFEFE] border-2 border-[#E3E3E3] text-[#1E1E1E] placeholder:text-[#989898] placeholder:text-[24px] rounded-[10px] md:py-[15px] md:text-[24px] md:pl-[34px] md:pr-[10px] md:text-left md:placeholder:text-[18px]"
              placeholder={
                exist === "Unsuccessful"
                  ? "Parcel dosen't exist"
                  : "Input Tracking Number"
              }
            />
            {processing && (
              <button
                className="bg-[#0A089A] text-[24px] rounded-[10px] py-[10px] px-[23px]  md:absolute md:top-[5px] md:right-[13px] md:translate-x-[2px] md:text-[18px] lg:py-[15px] lg:px-[32px]  "
                type="submit"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                Tracking...
              </button>
            )}

            {!processing && (
              <button
                className="bg-[#AC0108] text-[24px] w-[200px] mx-auto md:mx-0 rounded-[10px] py-[20px] px-[15px] hover:bg-[#0A089A]  md:absolute md:top-[5px] md:right-[13px] md:translate-x-[2px] md:text-[18px] lg:py-[15px] lg:px-[32px]  "
                type="submit"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                Track Parcel
              </button>
            )}
          </form>
        </div>

        <div className="mb-[40px] md:mb-[0px] hidden md:block">
          <div className="flex items-center m-auto  md:ml-[10%]  ">
            <p className="text-[48px] font-[600] mr-[10px] lg:text-[64px]    ">
              10+
            </p>
            <p className="text-[14px] w-[20%] lg:text-[20px] ">
              {" "}
              Years <br /> Experience{" "}
            </p>
            <div className=" border-2 border-[#FEFEFE] rotate-[90deg] w-[40px] "></div>
            <p className="text-[48px] font-[500] font-[600] mr-[20px] lg:text-[64px]  ">
              3K
            </p>
            <p className="text-[14px] font-[500] w-[20%] lg:text-[20px] ">
              {" "}
              Satisfied <br /> Customers{" "}
            </p>
          </div>
        </div>
        {/* md:translate-y-[-90px] md:w-fit md:ml-[65%] lg:translate-y-[-100%] */}
        <div className="hidden md:block">
          <p className="text-[16px] font-[500] text-center mb-[10px] ">
            Scroll down for more
          </p>
          <div>
            <img
              src="/img/down.svg"
              alt="scroll down"
              className={styles.bounce}
              style={{ margin: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
