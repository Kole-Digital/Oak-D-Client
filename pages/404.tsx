import Image from "next/image";
import { useRouter } from "next/router";

function PageNotFound() {
  const router = useRouter();
  function handleClick() {
    router.back();
  }

  return (
    <section className="flex flex-col items-center px-[20px] py-[50px] gap-y-[50px] lg:flex-row lg:items-start lg:py-0 lg:justify-center ">
      <div className="lg:w-[15%] lg:pt-[20px] ">
        <Image
          src="../img/company-logo.svg"
          alt="Company Logo"
          width={80}
          height={80}
        />
      </div>

      <div className="lg:w-[100%] ">
        <div className="relative mb-[15px] flex flex-col items-center ">
          <Image
            src="../img/container-image.webp"
            alt="Container Image"
            layout="responsive"
            width={500}
            height={500}
          />
          <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] text-center text-[30px] md:text-[50px] font-[700] text-[#FEFEFE]  ">
            <p className="leading-[25px] md:leading-[40px]">
              404 <br /> Page Error
            </p>
          </div>
        </div>
        <p className="text-center text-[#1E1E1E] text-[14px] font-[500] ">
          We&apos;re sorry, but the page you are looking for cannot be found, If
          you continue to experience issues or have any questions, please
          contact Oak and D customer support for further assistance. Thank you
          for choosing Oak and D for your shipping needs.
        </p>
      </div>

      <div className="w-[100%] lg:w-[15%] lg:text-right lg:pt-[20px] ">
        <button
          onClick={handleClick}
          className="bg-[#0A089A]/[10%] p-[15px] w-[100%] rounded-[8px] text-[18px] text-[#0A089A] font-[500] "
        >
          Back
        </button>
      </div>
    </section>
  );
}

export default PageNotFound;
