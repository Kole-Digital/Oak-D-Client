import { BlogValue } from "@/pages/blogs";
import axios from "axios";
import { type } from "os";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@/lib/config";

type BlogValues = {
  _id?: string;
  heading: string;
  coverImage: string;
  content: string;
  slug: string;
};

type BlogDataProps = {
  blogData: BlogValue[];
};

export const AllBlogs = () => {
  const router = useRouter();
  const [blog, setBlog] = useState<BlogValues[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blog`);
        const { data } = response.data;
        setBlog(data);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
  }, []);

  if (loading) {
    return <h1>The page is loading</h1>;
  }

  return (
    <section className="mb-[152px]">
      <div className="w-[90%] md:w-[80%] lg:w-[90%] m-auto text-[#1E1E1E] ">
        <div className="border-2 border-[#A1A1A1] mb-[95px] lg:mb-[107px] lg:w-[70%] lg:m-auto  "></div>
        <p className="w-fit text-center text-[26px] font-[700] mb-[20px] md:text-[32px] ">
          All Post
        </p>
        <div className="flex items-center gap-[32px] lg:gap-[104] flex-wrap ">
          {blog.map((item) => {
            return (
              <div
                className="w-[45%] lg:w-[30%] mb-[32px] flex flex-col gap-[20px] cursor-pointer "
                key={item._id}
                onClick={() => {
                  const id = item._id as string;
                  router.push(`/blogs/${item?.slug}`);
                }}
              >
                <div className="w-[100%] h-[164px] md:h-[193px] lg:h-[251px] ">
                  <img
                    src={item.coverImage}
                    alt="blog post"
                    className="w-[100%] h-[100%] object-cover "
                  />
                </div>
                <div>
                  <h2 className="font-[700] text-[16px] md:text-[20px] lg:text-[28px]  ">
                    {item.heading}
                  </h2>
                  {/* <div dangerouslySetInnerHTML={{ __html: item?.content }} /> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
