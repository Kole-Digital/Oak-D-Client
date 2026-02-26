import { GlobalContext } from "@/context/GlobalWrapper";
import Link from "next/link";
import React, { useContext } from "react";
import { FaWhatsapp } from "react-icons/fa";

export function PickDrop() {
  const { glotrail, setGlotrail } = useContext(GlobalContext);

  return (
    <section
      className=""
      style={{ display: glotrail === 4 ? "block" : "none" }}
    >
      <div className="mb-[102px]">
        <div className="relative">
          <div className="w-[100vw] h-[835px] lg:h-[945px] ">
            <div className="h-[100%] w-[100%]">
              <img
                src="/img/pick-drop.webp"
                alt="global shipping"
                className="w-[100%] h-[100%] object-cover "
              />
            </div>
          </div>
          <div className="absolute top-[5%] ">
            <div className="bg-[#FEFEFE]/[.68] w-[90%] lg:w-[55%] lg:ml-[5%] m-auto mt-[240px] md:mt-[153px] lg:mt-[15px] py-[81px] md:py-[34px] lg:py-[64px]  ">
              <div className="w-[80%] m-auto ">
                <h1 className="font-semibold text-[#AC0108] text-[20px] md:text-[24px] ">
                  Pick Up And Drop Off
                </h1>
                <p className="font-[700] text-[32px] text-[#1E1E1E] md:text-[36px] ">
                  To send a cargo from any country to Canada, Please locate any
                  OAK & D office in your region or contact our team for guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact */}
      <div className="w-[90%] m-auto">
        <div className="mb-[200px]">
          <div className="w-fit mb-[40px] ">
            <h2 className="text-[28px] lg:text-[32px] font-[600] text-[#AC0108] pb-[10px] ">
              CONTACT US
            </h2>
            <div className=" border-b-2 border-[#AC0108] w-[70%] "></div>
          </div>
          <div className=" lg:flex lg:items-center ">
            <div className="mb-[50px] lg:border-r-4 lg:border-[#1E1E1E]/[.4] lg:pr-[88px] lg:py-[48px] ">
              <p className="text-[#1E1E1E] text-[20px] lg:text-[22px] font-[600] ">
                Contact Email
              </p>
              <Link
                href={""}
                className="text-[#0A089A] text-[18px] font-[500] "
              >
                support@oakanddcanada.com
              </Link>
            </div>
            <div className="mb-[50px] lg:border-r-4 lg:border-[#1E1E1E]/[.4] lg:px-[88px] lg:py-[48px] ">
              <p className="text-[#1E1E1E] text-[20px] lg:text-[22px] font-[600] ">
                Contact Number
              </p>
              <Link
                href={""}
                className="text-[#0A089A] text-[18px] font-[500] "
              >
                +(289) 923-3548
              </Link>
            </div>
            <div className="w-fit lg:px-[88px] lg:py-[48px]">
              <p className="text-[#1E1E1E] text-[20px] lg:text-[22px] font-[600] ">
                WhatsApp Message
              </p>
              <Link
                href={"https://wa.me/qr/JU7M5GDPZ7LYO1"}
                className="text-[#0A089A] text-[18px] font-[500] grid place-items-center "
              >
                <FaWhatsapp size="50px" />
              </Link>
            </div>
          </div>
        </div>

        {/* location */}
        <div className="lg:mb-[100px] ">
          <h2 className="text-[28px] lg:text-[32px] font-[600] text-[#AC0108] m-auto mb-[40px] lg:text-center ">
            OUR DROP OFF LOCATION
          </h2>
          <div className="sm:grid grid-cols-2 lg:items-center">
            <div className="sm:border-r-4 sm:border-[#1E1E1E]/[.4] px-[30px]">
              <p className="text-[20px] font-[600] text-[#1E1E1E] mb-[20px] ">
                CANADA
              </p>
              <div className="lg:grid grid-cols-2 lg:items-center lg:gap-[50px] ">
                <div className="flex gap-[20px] text-[18px] font-[500] mb-[20px] lg:mb-[0px]">
                  <img
                    src="/img/location-pin.svg"
                    alt="location pin"
                    className="w-[20px] h-[25px]"
                  />
                  <p>
                    NORTH YORK Unit 16 3625 Weston Road North York ON M9LIV8
                    Canada
                  </p>
                </div>
                <div className="flex gap-[20px] text-[18px] font-[500] mb-[20px] lg:mb-[0px] ">
                  <img
                    src="/img/location-pin.svg"
                    alt="location pin"
                    className="w-[20px] h-[25px]"
                  />
                  <p>5 Stafford Drive, Brampton, ON L6W 1L3, Canada</p>
                </div>
                <div className="flex gap-[20px] text-[18px] font-[500] mb-[20px] lg:mb-[0px] ">
                  <img
                    src="/img/location-pin.svg"
                    alt="location pin"
                    className="w-[20px] h-[25px]"
                  />
                  <p>1160 Simcoe St S, Oshawa, ON L1H 5L8</p>
                </div>
                <div className="flex gap-[20px] text-[18px] font-[500] mb-[20px] lg:mb-[0px] ">
                  <img
                    src="/img/location-pin.svg"
                    alt="location pin"
                    className="w-[20px] h-[25px]"
                  />
                  <p>AJAX 98 Harwood Ave S, Ajax, ON L1S 2H6 Canada</p>
                </div>
                <div className="flex gap-[20px] text-[18px] font-[500] mb-[20px] lg:mb-[0px] ">
                  <img
                    src="/img/location-pin.svg"
                    alt="location pin"
                    className="w-[20px] h-[25px]"
                  />
                  <p>196 Dalhousie St unit 4, Brantford, ON N3S 3T7 Canada</p>
                </div>
              </div>
            </div>

            <div className="px-[30px] h-full mt-[100px] sm:mt-0">
              <p className="text-[20px] font-[600] text-[#1E1E1E] mb-[20px] ">
                NIGERIA
              </p>
              <div className="lg:grid grid-cols-2 sm:items-center lg:gap-[50px] ">
                <div className="flex gap-[20px] text-[18px] font-[500] mb-[20px] lg:mb-[0px] ">
                  <img
                    src="/img/location-pin.svg"
                    alt="location pin"
                    className="w-[20px] h-[25px]"
                  />
                  <p>
                    5/7 Alhaji Rafiu Street,
                    <br />
                    Off Airport Road,
                    <br />
                    Apakun Mafoluku, Oshodi
                    <br />
                    Lagos, Nigeria.
                  </p>
                </div>
                <div className="flex gap-[20px] text-[18px] font-[500] mb-[20px] lg:mb-[0px] ">
                  <img
                    src="/img/location-pin.svg"
                    alt="location pin"
                    className="w-[20px] h-[25px]"
                  />
                  <p>
                    10 Ugo Nnebufe Street,
                    <br />
                    Off Baale Sekoni Street,
                    <br />
                    Ajao estate, Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* map */}
        <div className="mb-[141px] w-[100vw] h-[234px] md:h-[434px] lg:h-[735px]">
          <img
            src="/img/world-map.svg"
            alt="Locations"
            className="w-[100%] h-[100%] "
          />
        </div>
      </div>
    </section>
  );
}
