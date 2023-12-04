import axios from "axios";
const BASE_URL =
  "https://3930-2601-646-a080-7c60-b4a2-1c6f-d891-c86.ngrok-free.app/";

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
export const getUserDetails = async (otp, one_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/login_one_id`, {
      otp,
      one_id,
    });
    return res.data;
  } catch (error) {
    console.log("apierror", error);
    throw error;
  }
};
