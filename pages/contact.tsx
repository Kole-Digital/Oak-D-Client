import React, { useState } from "react";
import { Navbar, Footer } from "@/components";
import { Ready } from "@/components/ReadyToStart";
import emailjs from "emailjs-com";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import { ContactMap } from "@/components/GoogleMap";
import { Spinner } from "@chakra-ui/react";
import { ContactModal } from "@/components/Modal/ContactModal";
import Head from "next/head";
import Link from "next/link";

type inputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type data = {
  name: string;
  email: string;
  number: string;
  message: string;
};
const initialValues: data = {
  name: "",
  email: "",
  number: "",
  message: "",
};

const styles = {
  firstSection: {
    background: "url(../img/contact-woman-with-headset.webp)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  whiteBox: {
    background: "rgba(254, 254, 254, 0.68)",
  },
};

const Contact = () => {
  // Lat and Lng for the Google Map
  const latitude = 43.753124;
  const longitude = -79.548546;

  const [values, setValues] = useState<data>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  // INPUT ONCHANGE FUNCTION
  const handleChange = (event: inputChangeEvent) => {
    const { name, value } = event.target;
    setValues((prevUserData) => {
      return {
        ...prevUserData,
        [name]: value,
      };
    });
  };
  // FORM SUBMISSION FUNCTION
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.name !== "" && values.email !== "" && values.message !== "") {
      setIsLoading(true);
      try {
        // CONFIGURE EMAILJS
        const emailParams = {
          to_name: "OAK&D CANADA",
          subject: values.name,
          from_name: values.name,
          from_email: values.email,
          from_phone: values.number,
          message: values.message,
        };
        await emailjs.send(
          "service_j32sykj",
          "template_hshdgns",
          emailParams,
          "SLaJAJfG-62Jj7HZX"
        );

        setIsLoading(false);
        setDisplayModal(true);
      } catch (error) {
        console.log(error);
      }
    }
    setValues(initialValues);
  };

  return (
    <div>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Welcome to OAK&D Canada, your trusted logistics partner for seamless package shipping and delivery. Our mission is to connect you with efficient and reliable shipping solutions, ensuring your packages reach their destination on time, every time. Explore our services today and experience hassle-free shipping with OAK&D."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      {displayModal && <ContactModal setDisplayModal={setDisplayModal} />}
      <section className="py-20 mt-[100px]" style={styles.firstSection}>
        <div
          className="w-[300px]  py-[52px] px-[29px] mx-auto font-poppins md:ml-[104px] md:w-[600px] md:p-[60px]"
          style={styles.whiteBox}
        >
          <h1 className="text-red text-[20px] font-bold mb-4 uppercase md:text-[24px]">
            Contact
          </h1>

          <p className="text-black font-bold text-[25px] md:text-[30px] md:leading-[54px]">
            Get in touch with OAK & D our team is ready to assist you with all
            your needs
          </p>
        </div>
      </section>

      {/* FORM AND MAP SECTION */}
      <section className="flex flex-col font-poppins py-20 px-4 lg:flex-row md:px-10">
        <div className="mb-[30px] md:w-[100%] lg:mb-0">
          <p className="uppercase font-bold text-[20px] md:text-[24px]">
            OAK & D CANADA
          </p>
          <p className="text-[16px] mb-[10px] md:text-[20px]">
            {" "}
            3625 Weston Road Unit 16, Toronto, ON M9L 1V9. Canada
          </p>

          <div>
            <ContactMap latitude={latitude} longitude={longitude} />
          </div>

          <div className="mt-[12px] flex mb-[25px]">
            <div className="border-r-[1px] border-[#1E1E1E] pr-[10px] mr-[10px] md:mr-[30px] md:pr-[30px]">
              <p className="font-bold text-[20px] mb-[5px] md:text-[24px]">
                Contact Email
              </p>
              <p className="text-[16px] md:text-[20px]">
                support@oakanddcanada.com
              </p>
            </div>
            <div>
              <p className="font-bold text-[20px] mb-[5px] md:text-[24px]">
                Follow Us
              </p>
              <div className="flex gap-[10px] md:gap-[25px] text-[16px] md:text-[24px]">
                <Link href={"https://www.instagram.com/oakanddcanada/"}>
                  <FaInstagram />
                </Link>

                <Link href={""}>
                  <FaFacebookF />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="border-r-[1px] border-[#1E1E1E] pr-[10px] mr-[10px] md:mr-[30px] md:pr-[30px]">
              <p className="font-bold text-[20px] mb-[5px] md:text-[24px]">
                Canada
              </p>
              <p className="text-[16px] md:text-[20px]">(437) 436-1757</p>
            </div>

            <div className="border-[#1E1E1E] pr-[10px] mr-[10px] md:mr-[30px] md:pr-[30px] w-[50%]">
              <p className="font-bold text-[20px] mb-[5px] md:text-[24px]">
                Nigeria
              </p>
              <p className="text-[16px] md:text-[20px]">
                (234) 906 4790 625 <br /> (234) 806 9651 839
              </p>
            </div>
          </div>

          <div className="w-full flex items-center gap-x-[25px] text-[16px] font-[500] md:text-[24px] mt-[25px]">
            <Link
              href={"https://wa.me/qr/JU7M5GDPZ7LYO1"}
              className="flex gap-x-[20px] items-center"
            >
              <FaWhatsapp size="32px" />
              09075015945
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between w-[100%] lg:ml-[50px]"
        >
          <input
            type="text"
            value={values.name}
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
            className="w-[100%] bg-[#F5F5F5] p-[20px] mb-[20px] outline-0 rounded-[8px] text-[16px] md:text-[18px]"
            required
          />
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
            className="w-[100%] bg-[#F5F5F5] p-[20px] mb-[20px] outline-0 rounded-[8px] text-[16px] md:text-[18px]"
            required
          />
          <input
            type="number"
            value={values.number}
            name="number"
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-[100%] bg-[#F5F5F5] p-[20px] mb-[20px] outline-0 rounded-[8px] text-[16px] md:text-[18px]"
            required
          />
          <textarea
            placeholder="Message"
            value={values.message}
            name="message"
            onChange={handleChange}
            className="w-[100%] bg-[#F5F5F5] rounded-[8px] p-[20px] mb-[20px] h-[199px] outline-0 md:h-[250px] text-[16px] md:text-[18px] "
            required
          />

          {isLoading ? (
            <button
              type="submit"
              className="bg-[#AC0108] p-[20px] text-[#F5F5F5] w-[162px] rounded-[8px] cursor-pointer md:w-[200px] md:text-[20px] flex items-center justify-center"
            >
              <Spinner style={{ width: "30px", height: "30px" }} />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#AC0108] p-[20px] text-[#F5F5F5] w-[162px] text-[16px] rounded-[8px] cursor-pointer md:w-[200px] md:text-[20px]"
            >
              Send Message
            </button>
          )}
        </form>
      </section>
      <Ready />
      <Footer />
    </div>
  );
};

export default Contact;
