import { useState } from "react";
import ResetPasswordModal from "../components/Modal/ResetPasswordModal/index";
import { useRouter } from "next/router";
import { newPassword } from "@/api/api";
import { Spinner } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Head from "next/head";

const styles = {
  square: {
    background: "rgba(254, 254, 254, 0.68)",
  },
  onModalDisplay: {
    background: "rgba(0, 0, 0, 0.7)",
  },
};

type data = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};
const ResetPassword = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [alertValue, setAlertValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [passwordLength, setPasswordLength] = useState("");
  const [correctPassword, setCorrectPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState(true);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(true);

  const [resetPassword, setResetPassword] = useState<data>({
    email: router.query.email as string,
    newPassword: "",
    confirmPassword: "",
  });

  const handleResetPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResetPassword((prevResetPassword) => {
      const { name, value } = event.target;
      return {
        ...prevResetPassword,
        [name]: value,
      };
    });
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (resetPassword.newPassword === resetPassword.confirmPassword) {
        setCorrectPassword("");
        setIsLoading(true);
        if (resetPassword.newPassword.length < 8) {
          setPasswordLength("Password must not be less than 8 characters");
          setIsLoading(false);
        } else {
          setPasswordLength("");
        }
        const response = await newPassword(resetPassword);
        console.log(response);
        if (response.status === "Unsuccessful") {
          setIsLoading(false);
          setError(response.message);
        }
        if (response.status === "Success") {
          setResetPassword({
            email: router.query.email as string,
            newPassword: "",
            confirmPassword: "",
          });
          setIsLoading(false);
          setDisplayModal(true);
        }
      } else {
        setPasswordLength("");
        setCorrectPassword("Password and Confirm Password must match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Reset Password</title>
        <meta
          name="description"
          content="Welcome to OAK&D Canada, your trusted logistics partner for seamless package shipping and delivery. Our mission is to connect you with efficient and reliable shipping solutions, ensuring your packages reach their destination on time, every time. Explore our services today and experience hassle-free shipping with OAK&D."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="font-poppins px-[10px] md:px-[0px]">
        {displayModal ? <ResetPasswordModal /> : null}
        <div className="flex justify-between">
          <div
            className="hidden bg-black lg:py-[50px] lg:block relative lg:w-[70%] auth-bg"
          >
            <div
              className="w-[350px] p-[20px] absolute top-[40%] lg:left-[5%] xl:left-[15%]"
              style={styles.square}
            >
              <img
                src="../img/get-started-vector.svg"
                alt=""
                className="mb-[10px] h-50]"
              />
              <p className="text-[16px] mb-[10px]">
                I have been using the company since its inception and its been a
                smooth ride all the way. Their customer service is topnotch.
                Their delivery time is si exceptional. Tested, trusted and
                Recommended.
              </p>
              <h1 className="font-[600] text-[24px]">Yetunde Temi</h1>
            </div>
          </div>
          <form
            onSubmit={handlePasswordSubmit}
            className="mx-auto sm:w-[70%] lg:px-[50px] lg:mx-0 lg:py-[150px] lg:w-[100%] xl:px-[150px]"
          >
            <div className="flex flex-col justify-center text-[#1E1E1E] mb-[30px] ">
              <h1 className="text-[32px] font-[600] text-center mb-[5px]">
                Reset Password
              </h1>
              <p className="text-[18px] text-center">
                Please reset your password
              </p>
            </div>

            {/* <div className="flex flex-col mb-[30px]">
              <label
                htmlFor="newPassword"
                className="mb-[10px] text-[18px] font-[500]"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                value={resetPassword.newPassword}
                onChange={handleResetPasswordChange}
                placeholder="Enter New Password"
                required
                className="rounded-[8px] border-[#D9D9D9] border-[2px] px-[20px] py-[10px] focus:outline-[#0A089A] md:h-[60px]"
              />
            </div>
            <div className="flex flex-col mb-[30px]">
              <label
                htmlFor="confirmPassword"
                className="mb-[10px] text-[18px] font-[500]"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={resetPassword.confirmPassword}
                onChange={handleResetPasswordChange}
                placeholder="Confirm New Password"
                required
                className="rounded-[8px] text-[16px] border-[#D9D9D9] border-[2px] px-[20px] py-[10px] mb-[3px] focus:outline-[#0A089A] md:h-[60px]"
              />
              <p className="text-[12px] text-[#AC0108] font-[700]">
                {alertValue}
              </p>
            </div> */}

            <div className="flex flex-col mb-[20px]">
              <label
                htmlFor="newPassword"
                className="mb-[10px] text-[18px] font-[500]"
              >
                New Password
              </label>
              <div className=" flex items-center w-full md:h-[60px] relative">
                <input
                  id="newPassword"
                  type={showPassword ? `text` : `password`}
                  name="newPassword"
                  value={resetPassword.newPassword}
                  onChange={handleResetPasswordChange}
                  placeholder="Enter New Password"
                  required
                  className="abosolute pl-[20px] py-[10px] top-0 left-0 w-[100%] h-[100%] border-[#D9D9D9] border-[2px] focus:outline-[#0A089A] rounded-[8px] "
                />

                {togglePassword ? (
                  <div
                    className="w-fit cursor-pointer absolute right-[10px] "
                    onClick={() => {
                      setTogglePassword(false), setShowPassword(true);
                    }}
                  >
                    <FaEye size={25} />
                  </div>
                ) : (
                  <div
                    className="w-fit cursor-pointer absolute right-[10px]"
                    onClick={() => {
                      setTogglePassword(true);
                      setShowPassword(false);
                    }}
                  >
                    <FaEyeSlash size={25} />
                  </div>
                )}
              </div>
              <p className="text-[#AC0108] text-[14px] md:text-[16px] font-[600] mt-[10px] ">
                {passwordLength}
              </p>
            </div>

            <div className="flex flex-col mb-[20px]">
              <label
                htmlFor="confirm-password"
                className="mb-[10px] text-[18px] font-[500]"
              >
                Confirm Password
              </label>
              <div className=" flex items-center w-full md:h-[60px] relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? `text` : `password`}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={resetPassword.confirmPassword}
                  onChange={handleResetPasswordChange}
                  required
                  className="abosolute pl-[20px] py-[10px] top-0 left-0 w-[100%] h-[100%] border-[#D9D9D9] border-[2px] focus:outline-[#0A089A] rounded-[8px] "
                />

                {toggleConfirmPassword ? (
                  <div
                    className="w-fit cursor-pointer absolute right-[10px] "
                    onClick={() => {
                      setToggleConfirmPassword(false),
                        setShowConfirmPassword(true);
                    }}
                  >
                    <FaEye size={25} />
                  </div>
                ) : (
                  <div
                    className="w-fit cursor-pointer absolute right-[10px]"
                    onClick={() => {
                      setToggleConfirmPassword(true);
                      setShowConfirmPassword(false);
                    }}
                  >
                    <FaEyeSlash size={25} />
                  </div>
                )}
              </div>
              <p className="text-[#AC0108] text-[14px] md:text-[16px] font-[600] mt-[10px] ">
                {correctPassword}
              </p>
            </div>

            <h2 className="text-center text-[#AC0108] text-[16px] md:text-[18px] font-[700] mt-[20px] ">
              {error}
            </h2>

            {isLoading ? (
              <button className="p-[20px] w-[100%] text-[#FAFAFA] mt-[15px] text-center bg-[#0A089A] rounded-[8px] flex items-center justify-center">
                <Spinner className="h-[30px] w-[30px]" />
              </button>
            ) : (
              <button className="p-[20px] w-[100%] text-[#FAFAFA] mt-[15px] text-center bg-[#0A089A] rounded-[8px]">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
