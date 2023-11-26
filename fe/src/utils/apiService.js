const BASE_URL = "your_api_base_url";

/*-----------------------------*/
/*------Auth operations -------*/
/*-----------------------------*/

export const login = async (email, password) => {
  // const response = await fetch(`${BASE_URL}/login`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email, password }),
  // });

  // if (!response.ok) {
  //   throw new Error("Login failed");
  // }

  // return response.json();
  localStorage.setItem("email", email);
};

export const register = async (email, password) => {
  // const response = await fetch(`${BASE_URL}/login`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email, password }),
  // });

  // if (!response.ok) {
  //   throw new Error("Login failed");
  // }

  // return response.json();
  localStorage.setItem("email", email);
};
