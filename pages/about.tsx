import Image from "next/image";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Footer, Navbar } from "@/components";
import Link from "next/link";
import Head from "next/head";

const About = () => {
  const styles = {
    firstSection: {
      background: "url(../img/ship.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    fourth: {
      background:
        "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/img/delivery.png)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    whiteBox: {
      background: "rgba(254, 254, 254, 0.68)",
    },
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Welcome to OAK&D Canada, your trusted logistics partner for seamless package shipping and delivery. Our mission is to connect you with efficient and reliable shipping solutions, ensuring your packages reach their destination on time, every time. Explore our services today and experience hassle-free shipping with OAK&D."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="about-container font-poppins">
        <Navbar />
        <section
          style={styles.firstSection}
          className="flex justify-center align-center p-[10px] md:justify-start md:p-20 md:mb-10 mt-[100px]"
        >
          <div className="w-64 p-[30px] md:w-[400px] " style={styles.whiteBox}>
            <h1 className="text-red text-[16px] md:text-[24] font-bold mb-2 uppercase">
              About
            </h1>
            <p className="text-black font-bold text-[20px] md:text-[32px]">
              OAK & D is your trusted partner for efficient, reliable, and
              cost-efficient shipping solutions.
            </p>
          </div>
        </section>

        {/* FOUNDERS */}
        <section className="my-[50px]">
          <div
            className="flex flex-col sm:flex-row gap-[60px] justify-center"
            style={{ placeItems: "center" }}
          >
            <div className="h-[600px] w-fit mx-auto sm: mx-0">
              <img
                src="/img/Damilola-Kuku.svg"
                alt="Damilola Kuku"
                className="h-[80%] w-full"
                style={{ objectFit: "contain" }}
              />
              <p className="text-[18px] md:text-[36px] font-[700]">
                Damilola Kuku
              </p>
              <p className="text-[16px] md:text-[24px] font-[600] ">
                Co-founder of OAK & D CANADA
              </p>
            </div>

            <div className="h-[600px] w-fit">
              <img
                src="/img/Azeez.png"
                alt="Azeez Kuku"
                className="h-[80%] w-full"
                style={{ objectFit: "contain" }}
              />
              <p className="text-[18px] md:text-[36px] font-[700] ">
                Azeez Kuku
              </p>
              <p className="text-[16px] md:text-[24px] font-[600] ">
                Co-founder of OAK & D CANADA
              </p>
            </div>
          </div>

          <div className="h-[600px] w-fit mx-auto mt-[60px]">
            <img
              src="/img/Amosun.png"
              alt="Amosun Kolawale"
              className="h-[80%] w-full"
              style={{ objectFit: "contain" }}
            />
            <p className="text-[18px] md:text-[36px] font-[700] ">
              Amosun Kolawale
            </p>
            <p className="text-[16px] md:text-[24px] font-[600] ">
              Manager of OAK & D CANADA, Nigeria
            </p>
          </div>
        </section>

        {/* OUR MISSION/OUR VISION */}
        <section className="font-poppins md:py-20 md:px-10">
          <div className=" md:flex md:flex-row-reverse ">
            <div className="bg-blue text-white py-10 px-[20px] md:px-[50px] md:w-1/2 flex flex-col justify-center">
              <h1 className="text-[32px] md:text-[36px] mb-[10px] font-[700] uppercase">
                Our Mission
              </h1>
              <p className="text-[16px] md:text-[18px]">
                Our mission is to provide our customers with reliable and
                efficient service that meet their needs and exceed their
                expectations
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/img/about-image-1.png"
                alt="Delivery Man"
                layout="responsive"
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className=" md:flex ">
            <div className="bg-blue text-white py-10 px-[20px] md:px-[50px] md:w-1/2 flex flex-col justify-center">
              <h1 className="text-[32px] md:text-[36px] mb-[10px] font-[700] uppercase">
                Our Vision
              </h1>
              <p className="text-[16px] md:text-[18px]">
                Our vision is to be a leading logistics company, known for our
                innovative and sustainable solutions, exceptional customer
                service, and commitment to making a positive impact in the
                communities we serve. We aim to build long-term relationships
                with our customers and partners, while continuously improving
                our operations to meet evolving needs of the global market
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/img/about-image-2.png"
                alt="Delivery Man"
                layout="responsive"
                width={500}
                height={500}
              />
            </div>
          </div>
        </section>

        {/* TESTIMONIAL SECTION */}
        <section className="bg-white py-20 px-4 text-black font-poppins flex flex-col md:flex-row md:justify-between md:px-10">
          <div>
            <h2 className="text-2xl font-bold">Omolara Akigbogun</h2>
            <h3 className="uppercase text-xl mb-10 text-gray font-bold">
              client
            </h3>
          </div>
          <p className="text-xl font-bold md:max-w-md">
            “My items were delivered intact.{" "}
            <span className="text-gray">Owner</span> went an{" "}
            <span className="text-red">extra mile</span> and delivered to my
            home <span className="text-gray">saving me the trouble</span> of
            picking up. <span className="text-red">I recommend them</span> for
            your shipping needs <span className="text-gray">to and from</span>{" "}
            Nigeria”
          </p>
        </section>

        {/* TOGETHER WE ARE STRONG */}
        <section
          style={styles.fourth}
          className="flex flex-col text-white font-poppins py-[100px] px-4 md:flex-row md:px-10"
        >
          <h1 className="mb-10 text-4xl font-bold md:mr-10">
            Together we are strong
          </h1>
          <div className="md:max-w-xl">
            <p className="text-base mb-8">
              OAK & D is a reputable cargo and shipping company that specializes
              in shipping goods from Nigeria to Canada. We pride ourselves on
              providing top-notch services that are reliable, efficient, and
              tailored to meet the unique needs of each of our customers. With
              years of experience in the industry, we have developed a deep
              understanding of the logistics involved in shipping goods across
              borders and are committed to delivering your shipments on time and
              in the best possible condition.
            </p>

            <p className="text-base mb-8">
              Our team comprises of highly skilled and experienced professionals
              who are dedicated to ensuring that your shipments are handled with
              the utmost care and attention. We use state-of-the-art equipment
              and advanced technology to ensure that your goods are tracked and
              monitored every step of the way, giving you peace of mind and the
              assurance that your shipment is in safe hands.
            </p>

            <p className="text-base">
              At OAK & D, we believe in transparency and honesty in all our
              dealings with our customers. We provide timely updates and reports
              on the status of your shipment, keeping you informed every step of
              the way. Our customer service team is always available to answer
              any questions or concerns you may have, and we are committed to
              going above and beyond to exceed your expectations.
            </p>
          </div>
        </section>

        {/* FOUNDER SECTION */}
        <section className="bg-white flex flex-col py-20 px-4 md:flex-row md:justify-between md:px-10">
          <div className="mb-10 font-bold flex items-center  md:mr-10">
            {/* <Avatar
            name="Damilola, KUKU"
            src="../img/Damilola-Kuku.svg"
            style={{ width: "100px", height: "100px" }}
          /> */}
            <div className="flex flex-col justify-center ml-[20px]">
              <h1>Damilola, KUKU</h1>
              <h2 className="text-gray">Co-CEO OF OAK & D CANADA</h2>
            </div>
          </div>
          <div className="md:max-w-xl">
            <p className="text-base font-bold">
              &quot;As the founder of OAK & D, I believe that shipping cargo is
              not just about moving goods from one place to another, it&apos;s
              about <span className="text-red">delivering trust</span>,
              reliability, and{" "}
              <span className="text-gray">peace of mind to our customers</span>.
              We understand the importance of your cargo, and we take the
              responsibility of delivering it safely and securely with utmost
              sincerity. <span className="text-red">Our commitment</span> to
              excellence and{" "}
              <span className="text-gray">customer satisfaction</span> drives us
              to go above and beyond, every day, for every shipment. With OAK &
              D, you can trust that your{" "}
              <span className="text-red">cargo is in good hands</span>.&quot;
            </p>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="flex flex-col items-center bg-blue p-20 text-white font-poppins md:flex-row md:justify-around md:px-10">
          <div className="flex flex-col items-center mb-20 md:mb-0 md:mr-10">
            <h1 className="text-2xl text-center mb-8">Years Experience</h1>
            <h1 className="text-5xl text-center font-bold">10+</h1>
          </div>
          <div className="flex flex-col items-center mb-20 md:mb-0 md:mr-10">
            <h1 className="text-2xl text-center mb-8">Satisfied Customers</h1>
            <h1 className="text-5xl text-center font-bold">3k</h1>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl text-center mb-8">Shipments per Months</h1>
            <h1 className="text-5xl text-center font-bold">5+</h1>
          </div>
        </section>

        {/* CONTAINER IMAGE SECTION */}
        <section className="w-full my-10 bg-red-200">
          <img
            src="/img/oak-container.png"
            alt="Shipping Container"
            className="w-[100%] lg:w-[70%] 2xl:w-[50%] mx-auto"
          />
        </section>

        {/* HAVE A QUESTION SECTION */}
        <section className="bg-white py-4 px-4 flex flex-col font-poppins md:flex-row-reverse md:px-10 md:justify-between">
          <div className="w-full md:w-1/2">
            <Image
              src="/img/azeezwork.png"
              alt="Delivery Man"
              layout="responsive"
              width={500}
              height={500}
            />
          </div>
          <div className="md:mr-10 md:max-w-lg">
            <div className="border-b-2 border-black py-10 md:pr-20">
              <h1 className="text-2xl font-bold mb-10">
                Have a question?, Our team is happy to assist
              </h1>
              <p className="text-xl">
                You can ask about the services we render, our pricing methods,
                cargo specification, and much more. Our trained rep are standing
                by and ready to help
              </p>
            </div>
            <div className="py-10 flex justify-between items-center md:justify-start">
              <Link
                href={"/contact"}
                className="text-white text-sm bg-black p-4 rounded-xl mr-4 flex"
              >
                <span className="mr-2 font-bold">Contact Us</span>
                <ChevronRightIcon boxSize={5} />
              </Link>
              <div>
                <p className="font-bold text-sm mb-[10px] ">
                  Or Call <span className="text-blue">(437) 436-1757 </span>
                </p>
                <p className="text-blue font-bold text-sm ml-[50px] mb-[10px] ">
                  (234) 806 9651 839
                </p>
                <p className="text-blue font-bold text-sm ml-[50px] ">
                  (234) 906 4790 625
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default About;
