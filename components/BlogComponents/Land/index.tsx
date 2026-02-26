import React from "react";

export function BlogLand() {
  return (
    <section className="mb-[92px] md:mb-[142px]">
      <div className="h-[90vh] relative ">
        <div className="w-[100vw] h-[100%] bg-black ">
          <img
            src="/img/blog-land.webp"
            alt="Blogs"
            className="w-[100%] h-[100%] object-cover "
          />
        </div>
        <div className="absolute top-0">
          <div className="bg-[#FEFEFE]/[.68] w-[90%] m-auto mt-[240px] lg:mt-[103px] py-[81px] lg:py-[114px]  ">
            <div className="w-[80%] m-auto ">
              <h1 className="font-semibold text-[#AC0108] text-[20px] md:text-[24px] ">
                BLOGS
              </h1>
              <p className="font-[700] text-[32px] text-[#1E1E1E] md:text-[36px] ">
                Read about our upcoming news and blogs{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
