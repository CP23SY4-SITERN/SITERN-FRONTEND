import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

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
  // const url = "https://capstone23.sit.kmutt.ac.th/sy4/api";
  const url = "http://localhost:8080/api";

  async function handleResponse(res) {
    if (res.status === HTTP_STATUS.UNAUTHORIZED) {
      const errorResponse = await res.json();
      if (
        errorResponse.message
          .toLowerCase()
          .includes("please send refresh token to /refresh to refresh token")
      ) {
        isLogin.refreshToken();
      } else {
        alert("Please login");
      }
    } else if (res.status === HTTP_STATUS.FORBIDDEN) {
      alert("You are not authorized to access this page.");
    } else {
      console.log("Error, cannot get data");
    }
  }

  async function getCompanies() {
    try {
      const res = await fetch(`${url}/companies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === HTTP_STATUS.OK) {
        companies.value = await res.json();
      } else {
        handleResponse(res);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function addCompany(company) {
    try {
      const res = await fetch(`${url}/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });
      if (res.status === HTTP_STATUS.CREATED) {
        alert("Company created");
      } else {
        handleResponse(res);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return {
    companies,
    getCompanies,
    addCompany,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(companyStore, import.meta.hot));
}
