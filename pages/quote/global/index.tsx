import {
  GlobalCrumb,
  GlobalParcel,
  GlobalQuoteLand,
  GlobalReciever,
  GlobalSender,
  GlobalSummary,
  PickDrop,
  QuoteBtn,
  QuoteLayout,
} from "@/components";
import { DomesticContextProvider } from "@/context/DomesticWrapper";
import { GlobalContextProvider } from "@/context/GlobalWrapper";
import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { setCookie } from "cookies-next";
import { userToken } from "@/api/api";
import axios from "axios";
import { ClientDataType } from "../domestic";
import { userPackageDataType } from "../warehousing";
import Head from "next/head";
import { API_BASE_URL } from "@/lib/config";

export default function Global() {
  const [data, setData] = useState<any>();
  const router = useRouter();
  const [successfulGlobalPackage, setSuccessfulGlobalPackage] = useState(false);
  const [userPackageData, setUserPackageData] = useState<userPackageDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleGlobalPackage = async (myParcel: ClientDataType | undefined) => {
    if (
      myParcel?.newPackage.packageWeight &&
      myParcel.newPackage.dimension.length &&
      myParcel.newPackage.dimension.breadth &&
      myParcel.newPackage.dimension.height
    ) {
      const hasAlphabet = /[a-zA-Z]/.test(
        myParcel.newPackage.packageWeight +
          myParcel.newPackage.dimension.length +
          myParcel.newPackage.dimension.breadth +
          myParcel.newPackage.dimension.height
      );
      if (hasAlphabet) {
        alert("The fields should contain only number values");
        return;
      }
    }
    function objectToFormData(
      obj: any | undefined,
      formData = new FormData(),
      parentKey = ""
    ) {
      if (obj === undefined) {
        return;
      }
      for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
          let key = parentKey ? `${parentKey}[${property}]` : property;
          let value = obj[property];

          if (typeof value === "object" && !(value instanceof File)) {
            objectToFormData(value, formData, key); // Recurse nested object
          } else {
            formData.append(key, value);
          }
        }
      }
      return formData;
    }
    const formData = objectToFormData(myParcel);
    console.log(formData);

    setIsLoading(true)

    const response = await axios.post(
      `${API_BASE_URL}/package/register-package`,
      formData,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    if (response.data.status === "Success") {
      setUserPackageData(response.data.data);
      setSuccessfulGlobalPackage(true);
      setIsLoading(false)
    }

    if (response.data.packageID) {
      setCookie("packageID", response.data.packageID);
    }
    if (response.data.warehouseID) {
      setCookie("warehouseID", response.data.warehouseID);
    }
  };

  console.log(data);

  return (
    <>
      <QuoteLayout>
        <Head>
          <title>Global Quote</title>
          {/* <link rel="icon" href="/img/nav-logo.svg" /> */}
          <link rel="icon" href="/img/fav-logo.png" />
          <meta
            name="description"
            content="Welcome to OAK&D Canada, your trusted logistics partner for seamless package shipping and delivery. Our mission is to connect you with efficient and reliable shipping solutions, ensuring your packages reach their destination on time, every time. Explore our services today and experience hassle-free shipping with OAK&D."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main>
          <GlobalContextProvider>
            <DomesticContextProvider>
              <GlobalCrumb />
              <GlobalQuoteLand />
              <GlobalSender setData={setData} />
              <GlobalReciever setData={setData} />
              <GlobalParcel setData={setData} />
              <GlobalSummary
                data={data}
                isLoading={isLoading}
                userPackageData={userPackageData}
                successfulGlobalPackage={successfulGlobalPackage}
                handleGlobalPackage={handleGlobalPackage}
              />
              <PickDrop />
            </DomesticContextProvider>
          </GlobalContextProvider>
        </main>
      </QuoteLayout>
    </>
  );
}
