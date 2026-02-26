import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { loginUser } from "@/api/api";
import { setCookie } from "cookies-next";
import { Spinner } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Head from "next/head";
// import GoogleLogin from "react-google-login";

export type LoginDataType = {
  email: string;
  password: string;
};
const styles = {
  square: {
    background: "rgba(254, 254, 254, 0.68)",
  },
};

const Login = () => {
  const [loginData, setLoginData] = useState<LoginDataType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [passwordLength, setPasswordLength] = useState("");

  // Displaying Password
  const [showPassword, setShowPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState(true);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  };

  // SUBMIT FUNCTION
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (loginData.email !== "" && loginData.password !== "") {
        setIsLoading(true);
        if (loginData.password.length < 8) {
          setPasswordLength("Password must not be less than 8 characters");
          setIsLoading(false);
        } else {
          setPasswordLength("");
        }
        const response = await loginUser(loginData);
        console.log(response);

        if (response.status === "Unsuccessful") {
          setError(response.message);
          setIsLoading(false);
        }
        if (response.status === "Success") {
          const userToken = response.data.token;
          setLoginData({
            email: "",
            password: "",
          });
          setCookie("token", userToken);
          setIsLoading(false);
          router.push(`/dashboard`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Welcome to OAK&D Canada, your trusted logistics partner for seamless package shipping and delivery. Our mission is to connect you with efficient and reliable shipping solutions, ensuring your packages reach their destination on time, every time. Explore our services today and experience hassle-free shipping with OAK&D."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="font-poppins px-[10px] md:px-[0px]">
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
            onSubmit={handleLoginSubmit}
            className="mx-auto w-[100%] md:w-[70%] lg:px-[50px] lg:mx-0 lg:py-[100px] lg:w-[100%] xl:px-[150px]"
          >
            <div className="flex flex-col justify-center text-[#1E1E1E] mb-[20px] ">
              <h1 className="text-[32px] font-[600] text-center mb-[8px]">
                Welcome Back
              </h1>
            </div>
            <div className="flex flex-col mb-[30px]">
              <label
                htmlFor="email"
                className="mb-[10px] text-[18px] font-[500]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Enter Email"
                required
                className="rounded-[8px] border-[#D9D9D9] border-[2px] px-[20px] py-[10px] focus:outline-[#0A089A] md:h-[60px]"
              />
            </div>

            <div className="flex flex-col mb-[10px]">
              <label
                htmlFor="password"
                className="mb-[10px] text-[18px] font-[500]"
              >
                Password
              </label>
              <div className=" flex items-center w-full md:h-[60px] relative">
                <input
                  id="password"
                  type={showPassword ? `text` : `password`}
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter Password"
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

            <div className="flex flex-col text-[16px] lg:text-[18px] font-[500] lg:flex-col-reverse">
              <Link
                href="/forgot-password"
                className="text-[#0A089A] mb-[30px] lg:mb-[0px]"
              >
                Forgot Password?
              </Link>
              <div className="flex justify-center lg:mb-[10px] lg:justify-between">
                <p className="mr-[10px]">Don&apos;t have an account?</p>
                <Link href="/get-started" className="text-[#0A089A]">
                  Sign Up
                </Link>
              </div>
            </div>

            <h2 className="text-center text-[#AC0108] text-[16px] md:text-[18px] font-[700] mt-[20px] ">
              {error}
            </h2>

            {isLoading ? (
              <button
                type="submit"
                className="p-[20px] w-[100%] text-[#FAFAFA] mt-[10px] lg:mt-[20px] mb-[15px] text-center bg-[#0A089A] rounded-[8px] flex items-center justify-center"
              >
                <Spinner className="h-[30px] w-[30px]" />
              </button>
            ) : (
              <button
                type="submit"
                className="p-[20px] w-[100%] text-[#FAFAFA] mt-[10px] lg:mt-[30px] mb-[15px] text-center bg-[#0A089A] rounded-[8px] font-[500]"
              >
                Log In
              </button>
            )}

            {/* <div className="flex justify-center">
                            <p>Or</p>
                        </div>

                        <GoogleLogin
                            clientId="821553739768-ea9hcfpcudsshi1m1srr16rc3qkar2vm.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={handleGoogleLogin}
                            // onFailure={handleGoogleLogin}
                            cookiePolicy="single_host_origin"
                        /> */}

            {/* <button className="flex items-center justify-center p-[20px] w-[100%] text-[#0A089A] mt-[15px] text-center border-[2px] font-[500] border-[#0A089A] rounded-[8px]">
                            <img src="../img/Google.svg" alt="Google Logo" className="mr-[10px] h-[25px]" />
                            <p>Continue with Google</p>
                        </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
