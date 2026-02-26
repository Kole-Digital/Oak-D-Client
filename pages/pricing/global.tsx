import { FAQ, Footer, Navbar } from "@/components";
import { faqs } from "@/utils/faq";

const Global = () => {
  const styles = {
    firstSection: {
      background: "url(../img/pricing-page-two-deliverers-communicating.webp)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    whiteBox: {
      background: "rgba(161, 161, 161, 0.7)",
    },
  };

  return (
    <div>
      <Navbar />
      <section className="py-20" style={styles.firstSection}>
        <div
          className="w-64 p-4 mx-auto font-poppins md:ml-20 md:w-96"
          style={styles.whiteBox}
        >
          <h1 className="text-red text-xl font-bold mb-4 uppercase">Pricing</h1>
          <h2 className="text-black text-2xl font-bold mb-4">
            How we price your items by weight and size
          </h2>
          <p className="text-black text-lg">
            Below is how we charge handling for shipment from Lagos to Canada.
            Freight is charged at N2,600/kg
          </p>
        </div>
      </section>

      {/* NOTE */}
      <section className="py-20 px-4 font-poppins ">
        <p className="text-black font-bold text-xl text-center md:max-w-2xl md:mx-auto">
          <span className="text-red">Note:</span> Shipment within Canada is
          shipped based on weight and dimension of the package and shipment from
          Canada to Lagos is charged at $12/kg
        </p>
      </section>

      {/* PRICE LIST SECTION */}
      <section className="py-20 md:flex justify-between md:px-20">
        <div className="w-full md:max-w-lg md:mr-20  ">
          <img
            src="../img/pricing-page-delivery-person.svg"
            alt=""
            className="md:h-full"
          />
        </div>
        <div className="flex justify-between flex-col p-4 font-poppins md:w-full md:p-0">
          <div className="flex justify-between p-4 bg-[#F3F3F3] rounded-md mb-4">
            <p className="text-black text-lg">1KG TO 10KG</p>
            <p className="text-black text-lg">$20</p>
          </div>
          <div className="flex justify-between p-4 bg-[#F3F3F3] rounded-md mb-4">
            <p className="text-black text-lg">11KG TO 15K</p>
            <p className="text-black text-lg">$30</p>
          </div>
          <div className="flex justify-between p-4 bg-[#F3F3F3] rounded-md mb-4">
            <p className="text-black text-lg">16KG TO 30KG</p>
            <p className="text-black text-lg">$50</p>
          </div>
          <div className="flex justify-between p-4 bg-[#F3F3F3] rounded-md mb-4">
            <p className="text-black text-lg">31KG TO 50KG</p>
            <p className="text-black text-lg">$60</p>
          </div>
          <div className="flex justify-between p-4 bg-[#F3F3F3] rounded-md mb-4">
            <p className="text-black text-lg">51KG TO 60KG</p>
            <p className="text-black text-lg">$70</p>
          </div>
          <div className="flex justify-between p-4 bg-[#F3F3F3] rounded-md mb-4">
            <p className="text-black text-lg">61KG TO 70KG</p>
            <p className="text-black text-lg">$80</p>
          </div>
          <div className="flex justify-between p-4 bg-[#F3F3F3] rounded-md mb-4">
            <p className="text-black text-lg">71KG TO 90KG</p>
            <p className="text-black text-lg">$90</p>
          </div>
          <div className="flex justify-between p-4 bg-[#F3F3F3] rounded-md">
            <p className="text-black text-lg">91KG ABOVE</p>
            <p className="text-black text-lg">$1 PER KG</p>
          </div>
        </div>
      </section>
      <FAQ faqs={faqs} />
      <Footer />
    </div>
  );
};

export default Global;
