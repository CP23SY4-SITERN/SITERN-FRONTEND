import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { cookieData } from "./cookieData";

export const companyStore = defineStore("companies", () => {
  const companies = ref([]);
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
  // const url = import.meta.env.VITE_API_URL;
  const url = "https://capstone23.sit.kmutt.ac.th/sy4/api";
  // const url = "http://localhost:8080/api";
  const cookie = cookieData();
  const alertState = ref({
    isOpen: false,
    alertText: "",
    alertType: "error", // Default to error type
  });

  function closeAlert() {
    alertState.value.isOpen = false;
    alertState.value.alertText = "";
    alertState.value.alertType = "error";
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
    } else if (res.status === HTTP_STATUS.UNAUTHORIZED) {
      showAlert("You are not authorized to access this page.", "warning");
    } else if (res.status === HTTP_STATUS.FORBIDDEN) {
      showAlert("Forbidden.", "error");
    } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
      showAlert("Bad request", "error");
    } else if (res.status === HTTP_STATUS.NOT_FOUND) {
      showAlert("Company not found", "error");
    } else {
      showAlert(
        `An error occurred while performing the operation, Error: ${res.status}`,
        "error"
      );
    }
  }

  async function getCompanies() {
    try {
      const res = await fetch(`${url}/companies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         Authorization: `Bearer ${cookie.getCookie("token")}`,
        },
      });
      if (res.status === HTTP_STATUS.OK) {
        companies.value = await res.json();
      } 
    } catch (error) {
      showAlert(
        `Failed to retrieve companies: ${error.message}, please ensure that you are logged in`,
        "error"
      );
    }
  }

  async function addCompany(company) {
    try {
      const res = await fetch(`${url}/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.getCookie("token")}`,
        },
        body: JSON.stringify(company),
      });
      if (res.status === HTTP_STATUS.CREATED) {
        showAlert("Company created", "success");
      } else {
        handleResponse(res);
      }
    } catch (error) {
      showAlert(`An error occurred: ${error.message}`, "error");
    }
  }

  return {
    companies,
    getCompanies,
    addCompany,
    alertState,
    closeAlert,
    showAlert,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(companyStore, import.meta.hot));
}
