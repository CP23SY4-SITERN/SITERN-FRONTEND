import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { cookieData } from "./cookieData";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

export const loginStore = defineStore("loginData", () => {
  const cookie = cookieData();
  const router = useRouter();
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
  
  const alertState = ref({
    isOpen: false,
    alertText: "",
    alertType: "error", // Default to error type
  });

  const confirmState = ref({
    isOpen: false,
    confirmText: "",
    confirmType: "confirm", // Default to confirm type
  });

  function closeAlert() {
    alertState.value.isOpen = false;
    alertState.value.alertText = "";
    alertState.value.alertType = "error";
  }

  function closeConfirm() {
    confirmState.value.isOpen = false;
    confirmState.value.confirmText = "";
    confirmState.value.confirmType = "confirm";
  }

  function showConfirm(message, type = "confirm") {
    confirmState.value.isOpen = true;
    confirmState.value.confirmText = message;
    confirmState.value.confirmType = type;
  }

  function showAlert(message, type = "error", time = 3000) {
    alertState.value.isOpen = true;
    alertState.value.alertText = message;
    alertState.value.alertType = type;

    setTimeout(() => {
      closeAlert();
    }, time);
  }

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
        showAlert("Please login", "warning");
      }
    } else if (res.status === HTTP_STATUS.FORBIDDEN) {
      showAlert("You are not authorized to access this page.", "warning");
    } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
      showAlert("Bad request", "error");
    } else if (res.status === HTTP_STATUS.NOT_FOUND) {
      showAlert("User not found", "error");
    } else {
      showAlert(
        `An error occurred while performing the operation, Error: ${res.status}`,
        "error"
      );
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
    cookie.getCookie("token");
    if (cookie.getCookie("token") != "") {
      isLogin.value = true;
    } else {
      isLogin.value = false;
    }
  }

  async function refreshToken() {
    try {
      const res = await fetch(`${url}/auth/refresh`, {
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
          showAlert("Please login again", "warning");
        }
      }
    } catch (error) {
      showAlert(`An error occurred: ${error.message}`, "error");
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
        setLoginUser(decoded);
        showAlert("Login successfully!", "success");
        setTimeout(() => {
          router.push("/");
        }, 4000);
      } else {
        handleResponse(res);
      }
    } catch (error) {
      showAlert(`An error occurred: ${error.message}`, "error");
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
        showAlert("Register completed", "success");
        setTimeout(() => {
          login(user);
        }, 2500);
      } else {
        handleResponse(res);
      }
    } catch (error) {
      showAlert(`An error occurred: ${error.message}`, "error");
    }
  }

  async function logout() {
    try {
      const res = await fetch(`${url}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie.getCookie("token"),
        },
        body: JSON.stringify({ token: cookie.getCookie("token") ,refreshToken: cookie.getCookie("refreshToken") }),
      });
      if (res.status === HTTP_STATUS.OK) {
        cookie.eraseCookie("token");
        cookie.eraseCookie("refreshToken");
        setLogin(false);
        clearLoginUser();
        showAlert("Logout successfully", "success");
      } else {
        handleResponse(res);
      }
    } catch (error) {
      showAlert(`An error occurred: ${error.message}`, "error");
    }
  }

  return {
    login,
    alertState,
    confirmState,
    closeConfirm,
    closeAlert,
    showAlert,
    showConfirm,
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
