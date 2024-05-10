import axios from "axios";

const client = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: "http://localhost:5000/api/",
  timeout: 5 * 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;

    switch (status) {
      case 401:
        console.log("Token-related issue");
        break;
      case 403:
        console.log("Permission-related issue");

        window.location = "/";
        break;
      case 400:
        console.log("Bad request");
        break;
      case 404:
        console.log("Resource not found");
        break;
      case 409:
        console.log("Conflict");
        break;
      case 422:
        console.log("Unprocessable");
        break;
      default:
        console.log("Unknown error");
        break;
    }

    return Promise.reject(error);
  }
);

client.interceptors.request.use((config) => {
  const accessToken = getToken();

  if (config.headers) {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

function getToken() {
const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}

export { client };
