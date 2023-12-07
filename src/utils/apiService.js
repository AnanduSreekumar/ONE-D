import axios from "axios";
import { getAge } from "./data";
const BASE_URL =
  "https://3930-2601-646-a080-7c60-b4a2-1c6f-d891-c86.ngrok-free.app";

/*-----------------------------*/
/*------Auth operations -------*/
/*-----------------------------*/

export const login = async (email, password) => {
  localStorage.setItem("email", email);
};

export const register = async (formData) => {
  const {
    firstname,
    lastname,
    middlename,
    country,
    state,
    email,
    password,
    role,
  } = formData;
  // console.log(formData);
  try {
    const res = await axios.post(`${BASE_URL}/create_account`, {
      firstname,
      lastname,
      middlename,
      country,
      state,
      email,
      password,
      role,
    });
    return res.data;
  } catch (error) {
    console.log("apierror", error);
    throw error;
  }
};

/*-----------------------------*/
/*-----Retrieval operations----*/
/*-----------------------------*/
export const getUserDetails = async (otp, one_id, email, role) => {
  try {
    const res = await axios.post(`${BASE_URL}/login_one_id`, {
      otp,
      one_id,
      email,
      role,
    });
    return res.data;
  } catch (error) {
    console.log("apierror", error);
    throw error;
  }
};

export const getUserStatus = async (email) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, {
      email,
    });
    return res.data;
  } catch (error) {
    console.log("apierror", error);
    throw error;
  }
};

export const uploadFile = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const uploadNotaryTextdata = async (formData) => {
  const { firstname, lastname, country, state, pincode, address, email } =
    formData;

  try {
    const res = await axios.post(`${BASE_URL}/set_textract_data`, {
      email,
      firstname,
      lastname,
      country,
      state,
      pincode,
      address,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const uploadTextdata = async (formData) => {
  const {
    firstname,
    lastname,
    dob,
    sex,
    address,
    middlename,
    county,
    country,
    pincode,
    state,
    occupation,
    email,
  } = formData;
  const age = getAge(dob);
  console.log(age);

  try {
    const res = await axios.post(`${BASE_URL}/set_textract_data`, {
      firstname,
      lastname,
      age,
      sex,
      address,
      middlename,
      county,
      country,
      pincode,
      state,
      occupation,
      email,
    });
    console.log(res.data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getNotaryService = async (formData) => {
  const { country, state, pincode } = formData;
  try {
    const res = axios.post(`${BASE_URL}/get_notary_service`, {
      country,
      state,
      pincode,
    });
    return res;
  } catch (error) {
    console.log("api error", error);
    throw error;
  }
};

export const setVerificationDetails = async (verification, dispute) => {
  const { one_id, veri_status, veri_comments, verifier_email, country, state } =
    verification;
  console.log(verification, dispute);
  try {
    const res = axios.post(`${BASE_URL}/set_verification`, {
      one_id,
      veri_status: dispute,
      veri_comments,
      verifier_email,
      country,
      state,
      verification_status: dispute,
    });
    return res.data;
  } catch (error) {
    console.log("api error", error);
    throw error;
  }
};

export const getOTP = async (email) => {
  try {
    const res = axios.post(`${BASE_URL}/get_otp`, {
      email,
    });
    return res;
  } catch (error) {
    console.log("api error", error);
    throw error;
  }
};

export const getOneidDetails = async (email) => {
  try {
    const res = axios.post(`${BASE_URL}/extract_user_data`, {
      email,
    });
    return res;
  } catch (error) {
    console.log("api error", error);
    throw error;
  }
};

export const getCheckinDetails = async (email, role) => {
  console.log(email, role);
  try {
    const res = axios.post(`${BASE_URL}/get_check_in_logs`, {
      email,
      role,
    });
    return res;
  } catch (error) {
    console.log("api error", error);
    throw error;
  }
};

export const getAdminStats = async (email, role) => {
  console.log(email, role);
  try {
    const res = axios.post(`${BASE_URL}/get_admin_stats`, {
      email,
      role,
    });
    return res;
  } catch (error) {
    console.log("api error", error);
    throw error;
  }
};

export const raiseUserDispute = async (id, comment) => {
  console.log(id, comment);
  try {
    const res = axios.post(`${BASE_URL}/raise_dispute_user`, {
      check_in_id: id,
      dispute_comments: comment,
    });
    return res;
  } catch (error) {
    console.log("api error", error);
    throw error;
  }
};
