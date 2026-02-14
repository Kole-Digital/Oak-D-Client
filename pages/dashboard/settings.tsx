import { SideNavbar, TopNavbar, SettingsNavbar, FirstDeleteModal, SecondDeleteModal } from "@/components";
import { NavContext, LayoutContext, DeleteModalContext, SecondModalContext, SecurityModalContext } from "@/context/UserDashboardLayout";
import { useState, useEffect } from "react";
import { getSingleUser } from "@/api/api";
import { deleteUser } from "@/api/api";
import axios from "axios";
import { parse } from 'cookie';
import { API_BASE_URL } from "@/lib/config";

export interface initialUserDataType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role?: string;
}

function Settings(){
    const [showNav, setShowNav] = useState(false);
    const [activeNav, setActiveNav] = useState(0);
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [showSecurtyModal, setShowSecurityModal] = useState(false);
    const [initialUserData, setInitialUserData] = useState<initialUserDataType>({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
    })

    useEffect(()=>{
        const getUserData = async ()=> {
            const { data } = await getSingleUser();
            setInitialUserData(data)
        }
        getUserData();
    }, []);
    const handleDeleteUser = async ()=> {
        try {
            await deleteUser(initialUserData._id);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <SecurityModalContext.Provider value={{showSecurtyModal, setShowSecurityModal}}>
        <SecondModalContext.Provider value={{showSecondModal, setShowSecondModal}}>
        <DeleteModalContext.Provider value={{showFirstModal, setShowFirstModal}}>
        <NavContext.Provider value={{activeNav, setActiveNav}}>
        <LayoutContext.Provider value={{showNav, setShowNav}}>
        <div className="relative lg:grid lg:grid-cols-12 lg:grid-rows-6">
             <SideNavbar />
             <TopNavbar />
             <SettingsNavbar initialUserData={initialUserData} />
             <FirstDeleteModal />
             <SecondDeleteModal handleDeleteUser={handleDeleteUser} />
        </div>
        </LayoutContext.Provider>
        </NavContext.Provider>
        </DeleteModalContext.Provider>
        </SecondModalContext.Provider>
        </SecurityModalContext.Provider>
    )
}

export default Settings;

export const getServerSideProps = async (context: any) => {
    const { req } = context;
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