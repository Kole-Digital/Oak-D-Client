import { SettingContext } from "@/context/UserDashboardSettings";
import { useContext, useState } from "react";
import { SecurityModal } from "../SecurityModal";
import { SecurityModalContext, DeleteModalContext } from "@/context/UserDashboardLayout";
import { initialUserDataType } from "@/pages/dashboard/settings";
import { userToken } from "@/api/api";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";

export interface PasswordDataType {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface SecurityContentDataType {
    initialUserValue: initialUserDataType;
}


export function SecurityContent({initialUserValue}: SecurityContentDataType){
    const [showModal, setShowModal] = useState(false);
    const {setShowSecurityModal} = useContext(SecurityModalContext);
    const {activeSettingNav, setActiveSettingNav} = useContext(SettingContext);
    const { setShowFirstModal } = useContext(DeleteModalContext)
    const [changePassword, setChangePassword] = useState<PasswordDataType>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setChangePassword(prevPassword => {
            return{
                ...prevPassword,
                [name]: value
            }
        })
    }

    async function submitForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        try {
            if (changePassword.oldPassword !== '' && changePassword.newPassword !== '' && changePassword.confirmPassword !== '' && changePassword.newPassword === changePassword.confirmPassword) {
                const {data} = await axios.patch(`${API_BASE_URL}/users/${initialUserValue._id}`, changePassword, {headers: {Authorization: `Bearer ${userToken}`}});

                setChangePassword({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                })
                setShowSecurityModal(true);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <section className={activeSettingNav === 1 ? `` : 'hidden'}>
            <h1 className="text-[18px] font-[600] text-[#1E1E1E] mb-[20px] lg:text-[24px] ">Security</h1>

            <form onSubmit={submitForm} className="border-[2px] border-[#F3F3F3] rounded-[10px] lg:p-[20px] ">
                <h1 className="text-[#1E1E1E] text-[18px] font-[600] mb-[20px] lg:text-[24px] ">Change Password</h1>

                <div className="flex flex-col mb-[20px] lg:w-[100%] ">
                    <label htmlFor="oldPassword" className="text-[#9C9C9C] text-[16px] font-[500] mb-[8px] ">Old Password</label>
                    <input 
                        id="oldPassword" 
                        type="password" 
                        name="oldPassword"
                        value={changePassword.oldPassword}
                        onChange={handleInputChange}
                        className="p-[20px] bg-none border-[2px] border-[#F3F3F3] rounded-[10px] " 
                    />
                </div>

                <div className="flex flex-col mb-[20px] lg:w-[100%]">
                    <label htmlFor="lastName" className="text-[#9C9C9C] text-[16px] font-[500] mb-[8px] ">New Password</label>
                    <input 
                        id="newPassword" 
                        type="password"
                        name="newPassword"
                        value={changePassword.newPassword}
                        onChange={handleInputChange}
                        className="p-[20px] bg-none border-[2px] border-[#F3F3F3] rounded-[10px] " 
                    />
                </div>

                <div className="flex flex-col mb-[20px] lg:w-[100%] ">
                    <label htmlFor="confirmPassword" className="text-[#9C9C9C] text-[16px] font-[500] mb-[8px] ">Confirm Password</label>
                    <input 
                        id="confirmPassword" 
                        type="password"
                        name="confirmPassword"
                        value={changePassword.confirmPassword}
                        onChange={handleInputChange}
                        className="p-[20px] bg-none border-[2px] border-[#F3F3F3] rounded-[10px] " 
                    />
                </div>

                <button type="submit" className="p-[20px] bg-[#0A089A] rounded-[15px] text-[#FEFEFE] text-[16px] font-[500] w-[100%] lg:text-[20px] ">Save Changes</button>
            </form>
            <button onClick={()=> setShowFirstModal(true)} className="p-[20px] bg-[#AC0108] mt-[20px] rounded-[15px] text-[#FEFEFE] text-[16px] font-[500] w-[100%] lg:text-[20px] lg:hidden ">Delete</button>

            <SecurityModal />

        </section>
    )
}