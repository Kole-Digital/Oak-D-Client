import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SingleBlog } from "@/components";
import { BlogValue } from ".";
import axios from "axios";
import Head from "next/head";
import { API_BASE_URL } from "@/lib/config";

export default function BlogDetail() {
  const router = useRouter();
  const { query } = router;
  const [myBlog, setMyBlog] = useState<BlogValue>();

  useEffect(() => {
    const getSingleBlog = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/blog/${query.slug}`
      );
      setMyBlog(response.data.data);
    };
    getSingleBlog();
  }, []);
  console.log(myBlog);
  console.log("Query", query);
  return (
    <>
      <Head>
        <title>Blog Detail</title>
        {/* <link rel="icon" href="/img/nav-logo.svg" /> */}
        <link rel="icon" href="/img/fav-logo.png" />
        <meta
          name="description"
          content="Welcome to OAK&D Canada, your trusted logistics partner for seamless package shipping and delivery. Our mission is to connect you with efficient and reliable shipping solutions, ensuring your packages reach their destination on time, every time. Explore our services today and experience hassle-free shipping with OAK&D."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <SingleBlog myBlog={myBlog} />
      </div>
    </>
  );
}
