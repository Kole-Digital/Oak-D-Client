import Link from "next/link";
import React from "react";

const styles = {
  getStartedSection: {
    background:
      "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(../img/contact-happy-african-american-delivery-woman.webp)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
};
export const Ready = () => {
  return (
    <>
      <section
        style={styles.getStartedSection}
        className="py-[70px] px-[10px] text-[#F5F5F5] font-poppins flex flex-col justify-center"
      >
        <p className="text-center text-[36px] font-[700] mb-[38px] md:text-[40px]">
          Ready to get started with OAK & D?,
        </p>
        <p className="text-center mx-auto text-[16px] font-[500] mb-[38px]  md:max-w-[50%] md:text-[20px]">
          Get started to track your package efficiently, view your order
          history, gain access to a lot more and get 40% off on our freight
          services
        </p>
        <button className="w-[160px] p-[20px] bg-[#0A089A] mx-auto border-0 text-[16px] rounded-[10px] cursor-pointer md:text-[18px]">
          <Link href={"/get-started"}>Get Started</Link>
        </button>
      </section>
    </>
  );
};

// export default Ready
