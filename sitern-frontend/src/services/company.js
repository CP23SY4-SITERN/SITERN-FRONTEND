import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const companyStore = defineStore("companies", () => {
  const companies = ref([]);
  // const url = import.meta.env.VITE_API_URL;
  const url = "http://10.4.85.44:8080/api";

  async function addCompany() {
    try {
      const res = await fetch(`${url}/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });
      if (res.status === 201) {
        alert("Company created");
      } else if (res.status === 401) {
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
      } else if (res.status === 403) {
        alert("You are not authorized to access this page.");
      } else {
        console.log("Error, cannot get data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return {
    companies,
    addCompany,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(companyStore, import.meta.hot));
}
