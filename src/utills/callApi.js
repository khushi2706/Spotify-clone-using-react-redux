import axios from "axios";
import Cookies from "universal-cookie";

export const callAPI = async (url) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const response = await axios(url, options);
  return response.data;
};
