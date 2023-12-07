import { CognitoUserPool } from "amazon-cognito-identity-js";
import axios from "axios";

// var user_pool = "";
// var client_id = "";
// axios
//   .post(
//     "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/cred_cognito"
//   )
//   .then(function (response) {
//     console.log(response);
//     client_id = response.data.CLIENT_ID;
//     user_pool = response.data.USER_POOL;
//     // window.location = "/auth";
//   })
//   .catch(function (error) {
//     console.log(error);
//     // susetShow(true);
//   });
const poolData = {
  UserPoolId: "us-west-1_xi4Ic7PEK",
  ClientId: "1h6aa7pefr0k04ncpq2ukl49as",
};

export default new CognitoUserPool(poolData);
