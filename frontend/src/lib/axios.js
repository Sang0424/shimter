import axios from "axios";
import jwtDecode from "jwt-decode";
import { getCookie, setCookie } from "./Cookie.js";

const instance = axios.create({
  baseURL: "http://localhost:5173",
  headers: {
    // "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "http://localhost:8080",
    withCredentials: true,
  },
  timeout: 20000,
});

instance.interceptors.request.use(
  (config) => {
    if (!config.headers) return config;
    const accessToken = getCookie("accessToken");
    //const refreshToken = getCookie("refreshToken");

    try {
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      if (accessToken) {
        config.headers["authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    } catch (err) {
      console.error(err.message);
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response && err.response.status == 401) {
      const refreshToken = getCookie("refreshToken");
      try {
        const { data } = await axios.get("/api/auth/reissue", {
          headers: { authorization: `Bearer ${refreshToken}` },
          withCredentials: true,
        });
        const { newAccessToken, newRefreshToken } = data;
        setCookie("accessToken", newAccessToken, {
          expires: new Date(new Date().getTime() + 1 * 60000),
        });
        setCookie("refreshToken", newRefreshToken, {
          expires: new Date(new Date().getTime() + 5 * 60000),
        });
        err.config.headers["authorization"] = `Bearer ${newAccessToken}`;
        return instance(err.config);
      } catch (err) {
        console.log("토큰 갱신 실패");
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
