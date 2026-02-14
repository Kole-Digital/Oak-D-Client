import { BlogContext } from "@/context/BlogWrapper";
import { BlogValue } from "@/pages/blogs";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

type BlogDataProps = {
  blogData: BlogValue[];
};

export const Latest = () => {
  const { selectBp, setSelectBp } = useContext(BlogContext);
  const [blogData, setBlogData] = useState<BlogValue[]>([]);
  const [firstPara, setFirstPara] = useState<string>("");

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blog`);
        const { data } = response.data;
        setBlogData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
  }, []);

  console.log("BlogData", blogData);

  useEffect(() => {
    const parser = new DOMParser();

    // Parse the HTML string into a Document object
    const doc = parser.parseFromString(
      blogData[blogData?.length - 1]?.content as string,
      "text/html"
    );

    // Use DOM methods to select the first <p> element
    const firstParagraph = doc.querySelector("p");
    console.log("FirstPara", firstParagraph);
    setFirstPara(firstParagraph?.textContent);
  }, []);

  return (
    <section className="mb-[95px] lg:mb-[142px] ">
      <div className="text-[#1E1E1E] w-[90%] md:w-[80%] lg:w-[90%] m-auto lg:flex gap-[149px] ">
        <div
          id="mostRecent"
          className="flex flex-col gap-[20px] mb-[95px] lg:w-[50%] cursor-pointer "
          key={blogData[blogData?.length - 1]?._id}
        >
          <div className="h-[369px] w-[100%] lg:h-[602px] bg-white ">
            <img
              src={blogData[blogData?.length - 1]?.coverImage}
              alt="Latest Blog Post"
              className="w-[100%] h-[100%] object-cover "
            />
          </div>
          <h2 className="font-[700] text-[28px] md:text-[32px] lg:text-[40px] ">
            {blogData[blogData?.length - 1]?.heading}
          </h2>
          <p className="text-[16px] sm:text-[20px]">{firstPara}</p>
        </div>
        <div
          id="recent"
          className="flex flex-col gap-[20px] lg:gap-[36px] lg:w-[40%] "
        >
          <p className="w-fit text-center text-[26px] md:text-[32px] font-[700] ">
            Latest
          </p>
          {blogData.slice(-5).map((item: BlogValue) => {
            return (
              <Link href={`/blogs/${item.slug}`} key={item._id}>
                <div className="flex items-center gap-[20px] cursor-pointer ">
                  <div className="w-[45%] h-[119px] md:h-[149px] lg:w-[177px]  ">
                    <img
                      src={item?.coverImage}
                      alt="Blog Post"
                      className="w-[100%] h-[100%] object-cover "
                    />
                  </div>
                  <div className="h-[120px] md:h-[150px] w-[50%] text-ellipsis overflow-hidden ">
                    <h2 className="font-[700] text-[16px] md:text-[20px] lg:text-[24px]">
                      {item?.heading}
                    </h2>
                    <p className="text-[16px] font-semibold md:text-[20px]">
                      {item?.content}{" "}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
