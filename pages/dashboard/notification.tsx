import { SideNavbar, TopNavbar, NotificationNavbar } from "@/components";
import { NavContext, LayoutContext, NotificationContext } from "@/context/UserDashboardLayout";
import { useState } from "react";
import axios from "axios";
import { parse } from 'cookie';
import { API_BASE_URL } from "@/lib/config";

function Notification(){
    const [showNav, setShowNav] = useState(false);
    const [activeNav, setActiveNav] = useState(0);
    const [showNotification, setShowNotification] = useState(false)

    return(
        <NavContext.Provider value={{activeNav, setActiveNav}}>
        <LayoutContext.Provider value={{showNav, setShowNav}}>
        <NotificationContext.Provider value={{showNotification, setShowNotification}}>
            <div className="relative lg:grid lg:grid-cols-12 lg:grid-rows-6">
                <SideNavbar />
                <TopNavbar />
                <NotificationNavbar />
            </div>
        </NotificationContext.Provider>
        </LayoutContext.Provider>
        </NavContext.Provider>
    )
}

export default Notification;

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