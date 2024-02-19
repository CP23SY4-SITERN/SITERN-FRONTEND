import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { cookieData } from "./cookieData";
import { jwtDecode } from "jwt-decode";

export const loginStore = defineStore("loginData", () => {
  const cookie = cookieData();
  const isLogin = ref(false);
  const loginUser = ref({ name: "Guest", role: "Guest", email: "" });
  // const url = "http://localhost:8080/api";
  const url = "https://capstone23.sit.kmutt.ac.th/sy4/api";
  const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  };

  async function handleResponse(res) {
    if (res.status === HTTP_STATUS.UNAUTHORIZED) {
      const errorResponse = await res.json();
      if (
        errorResponse.message
          .toLowerCase()
          .includes("please send refresh token to /refresh to refresh token")
      ) {
        refreshToken();
      } else {
        alert("Please login");
      }
    } else if (res.status === HTTP_STATUS.FORBIDDEN) {
      alert("You are not authorized to access this page.");
    } else {
      console.log(`Error: ${res.status}, cannot perform the operation`);
    }
  }

  function setLogin(value) {
    isLogin.value = value;
  }

  function setLoginUser(user) {
    loginUser.value = {
      name: user.name,
      email: user.sub,
      role: user.role[0],
    };
  }

  function clearLoginUser() {
    loginUser.value = { name: "Guest", role: "Guest", email: "" };
  }

  async function checkLogin() {
    const token = cookie.getCookie("token");
    isLogin.value = !!token;
  }

  async function refreshToken() {
    try {
      const res = await fetch(`${url}/jwt/refresh`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + cookie.getCookie("refreshToken"),
          isRefreshToken: true,
        },
      });
      if (res.status === HTTP_STATUS.OK) {
        const token = await res.json();
        cookie.setCookie("token", token.token, 7);
      } else if (res.status === HTTP_STATUS.FORBIDDEN) {
        const response = await res.json();
        if (
          response.message.toLowerCase().includes("cannot refresh token") ||
          response.message.toLowerCase().includes("claims == null")
        ) {
          cookie.eraseCookie("token");
          cookie.eraseCookie("refreshToken");
          alert("Please login again");
        }
      }
    } catch (error) {
      console.error("An error occurred while refreshing token:", error);
    }
  }

  async function login(user) {
    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.status === HTTP_STATUS.OK) {
        const tokenResponse = await res.json();
        const token = tokenResponse.token;
        const decoded = jwtDecode(token);
        cookie.setCookie("token", token, 7);
        cookie.setCookie("refreshToken", tokenResponse.refreshToken, 7);
        setLogin(true);
        console.log("decoded:", decoded);
        setLoginUser(decoded);
        alert("Login successfully!");
        console.log("Login successfully");
      }
    } catch (error) {
      console.error("An error occurred about login:", error);
    }
  }

  async function register(user) {
    try {
      const res = await fetch(`${url}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (res.status === HTTP_STATUS.CREATED) {
        alert("Register completed");
      } else {
        handleResponse(res);
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`, error);
    }
  }

  async function logout() {
    try {
      const res = await fetch(`${url}/auth/logout`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + cookie.getCookie("refreshToken"),
        },
      });
      if (res.status === HTTP_STATUS.OK) {
        cookie.eraseCookie("token");
        cookie.eraseCookie("refreshToken");
        setLogin(false);
        clearLoginUser();
        alert("Logout successfully");
      } else {
        handleResponse(res);
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  }

  return {
    login,
    logout,
    register,
    isLogin,
    loginUser,
    setLogin,
    setLoginUser,
    clearLoginUser,
    refreshToken,
    checkLogin,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(loginStore, import.meta.hot));
}
