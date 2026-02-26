import { AllBlogs, BlogLand, Latest, PageLayout, Post } from "@/components";
import { BlogContext, BlogContextProvider } from "@/context/BlogWrapper";
import Head from "next/head";
import React, { useEffect, useState } from "react";
export type BlogValue = {
  _id?: string;
  heading: string;
  coverImage: string;
  content: string;
  slug?: string;
};

export default function Blogs() {
  const [blog, setBlog] = useState<BlogValue[]>([]);
  return (
    <>
      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Welcome to OAK&D Canada, your trusted logistics partner for seamless package shipping and delivery. Our mission is to connect you with efficient and reliable shipping solutions, ensuring your packages reach their destination on time, every time. Explore our services today and experience hassle-free shipping with OAK&D."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageLayout>
        <main>
          <BlogContextProvider>
            <div className="">
              <BlogLand />
              <Latest />
              <AllBlogs />
            </div>
            <div className="hidden">
              <Post selectBp={""} />
            </div>
          </BlogContextProvider>
        </main>
      </PageLayout>
    </>
  );
}
