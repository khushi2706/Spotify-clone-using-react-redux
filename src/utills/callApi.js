import axios from "axios";

export const callAPI = async (url, options) => {
  try {
    const response = await axios(url, options);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.error(error);
  }
};
