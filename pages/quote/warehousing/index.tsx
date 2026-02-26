import {
  PickDrop,
  QuoteLayout,
  WareCrumb,
  WarehouseParcel,
  WarehouseQuoteLand,
  WarehouseSummary,
} from "@/components";
import { DomesticContextProvider } from "@/context/DomesticWrapper";
import { GlobalContextProvider } from "@/context/GlobalWrapper";
import React from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { ClientDataType } from "../domestic";
import { useRouter } from "next/router";
import { userToken } from "@/api/api";
import { useState } from "react";
import Head from "next/head";
import { API_BASE_URL } from "@/lib/config";


export interface userPackageDataType {
  createdAt: string;
  packageID: string;
  packageName: string;
  packageType: string;
  sender: string;
}

export default function Warehousing() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [successfulWarehousePackage, setSuccessfulWarehousePackage] = useState(false);
  const [userPackageData, setUserPackageData] = useState<userPackageDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const handleWarehousePackage = async (
    myParcel: ClientDataType | undefined
  ) => {
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

    setIsLoading(true);

    const response = await axios.post(
      `${API_BASE_URL}/package/register-package`,
      formData,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    if(response.data.status === 'Success'){
      setUserPackageData(response.data.data)
      setSuccessfulWarehousePackage(true);
      setIsLoading(false);

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
    <QuoteLayout>
      <Head>
        <title>Warehousing Quote</title>
        <meta
          name="description"
          content="Welcome to OAK&D Canada, your trusted logistics partner for seamless package shipping and delivery. Our mission is to connect you with efficient and reliable shipping solutions, ensuring your packages reach their destination on time, every time. Explore our services today and experience hassle-free shipping with OAK&D."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <GlobalContextProvider>
          <DomesticContextProvider>
            <WareCrumb />
            <WarehouseQuoteLand setData={setData} />
            <WarehouseParcel setData={setData} />
            <WarehouseSummary
              data={data}
              isLoading={isLoading}
              userPackageData={userPackageData}
              successfulWarehousePackage={successfulWarehousePackage}
              handleWarehousePackage={handleWarehousePackage} 
            />
            <PickDrop />
          </DomesticContextProvider>
        </GlobalContextProvider>
      </main>
    </QuoteLayout>
  );
}
