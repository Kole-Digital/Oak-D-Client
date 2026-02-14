import axios from "axios";
import { userData } from "@/pages/get-started";
import { LoginDataType } from "@/pages/login";
import { profileDataType } from "@/components/DashboardComponent/SettingsNavbar/SettingContent/ProfileContent";
import { getCookie } from "cookies-next";
import { API_BASE_URL } from "@/lib/config";

export const userToken = getCookie("token");

// GE ALL USERS
export async function getAllUsers() {
  const response = await axios.get(`${API_BASE_URL}/users`);

  return response.data;
}

// GET SINGLE USER
export async function getSingleUser() {
  const response = await axios.get(
    `${API_BASE_URL}/users/single`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
}

// REGISTER USER
export async function createUser(body: userData) {
  const response = await axios.post(
    `${API_BASE_URL}/auth/user/register`,
    JSON.stringify(body),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

// UPDATE USER PROFILE
export async function updateUserProfile(body: profileDataType) {
  const response = await axios.post(
    `${API_BASE_URL}/users/update-profile`,
    body,
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
}

// VERIFY USER
export type verifyUserData = {
  email: string;
  verificationCode: string;
};

export async function verifyUser(code: verifyUserData) {
  const response = await axios.post(
    `${API_BASE_URL}/auth/user/verify`,
    code
  );

  return response.data;
}

// LOGIN USER
export async function loginUser(body: LoginDataType) {
  const response = await axios.post(
    `${API_BASE_URL}/auth/user/login`,
    body
  );

  return response.data;
}

// FORGOT PASSWORD
export type forgotPasswordType = {
  email: string;
};
export async function forgotPassword(body: forgotPasswordType) {
  const response = await axios.post(
    `${API_BASE_URL}/auth/user/reset-password`,
    body
  );

  return response.data;
}

// VERIFY PASSWORD OTP
export type passwordOTP = {
  email: string;
  verificationCode: string;
};
export async function verifyPasswordOTP(body: passwordOTP) {
  const response = await axios.post(
    `${API_BASE_URL}/auth/user/verify-password-reset`,
    body
  );

  return response.data;
}

// NEW PASSWORD
export type newPasswordType = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};
export async function newPassword(body: newPasswordType) {
  const response = await axios.post(
    `${API_BASE_URL}/auth/user/add-new-password`,
    body
  );

  return response.data;
}

// DELETE USER
export async function deleteUser(id: string) {
  const response = await axios.delete(
    `${API_BASE_URL}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
}

// Get User Package
export async function getUserPackage(packages: string[]) {
  const response = await axios.post(
    `${API_BASE_URL}/package/get-packages`,
    { packages },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
}

export type TrackerDataType = {
  trackingID: string;
};
export async function trackParcel(body: TrackerDataType) {
  const response = await axios.post(
    `${API_BASE_URL}/package/track-parcel`,
    body
  );
  return response.data;
}
