import { SideNavbar, TopNavbar, FaqNavbar } from "@/components";
import { NavContext, LayoutContext } from "@/context/UserDashboardLayout";
import { useState, useEffect } from "react";
import { getSingleUser } from "@/api/api";
import { initialUserDataType } from "./settings";
import axios from "axios";
import { parse } from 'cookie';
import { API_BASE_URL } from "@/lib/config";

const initialUserInfo: initialUserDataType = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
}

function Support(){
    const [showNav, setShowNav] = useState(false);
    const [activeNav, setActiveNav] = useState(0);
    const [userInfo, setUserInfo] = useState<initialUserDataType>(initialUserInfo);

    useEffect(()=>{
        const getUser = async ()=> {
            try {
                const { data } = await getSingleUser();
                setUserInfo(data); 
            } catch (error) {
               console.log(error); 
            }
        };
        getUser();
    }, [])

    return(
        <NavContext.Provider value={{activeNav, setActiveNav}}>
        <LayoutContext.Provider value={{showNav, setShowNav}}>
        <div className="relative lg:grid lg:grid-cols-12 lg:grid-rows-6">
             <SideNavbar />
             <TopNavbar />
             <FaqNavbar userInfo={userInfo} />
        </div>
        </LayoutContext.Provider>
        </NavContext.Provider>
    )
}

export default Support;

export const getServerSideProps = async (context: any) => {
    console.log('hey')
    const { req } = context;
    console.log(req);
    const cookies = req.headers.cookie;
    const myCookies = parse(cookies || "");
    if (!myCookies.token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const response = await axios.post(
      `${API_BASE_URL}/auth/user/verify-token`,
      { token: myCookies.token }
    );
    const isAuthenticated = response.data.data.email && response.data.data.role;
  
    if (!isAuthenticated) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  
    // Proceed to render the protected page
    return {
      props: {},
    };
};