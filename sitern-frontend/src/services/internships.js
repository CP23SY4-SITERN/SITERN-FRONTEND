import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { cookieData } from "./cookieData";

export const internshipsStore = defineStore("internships", () => {
  const internships = ref([]);
  const cookie = cookieData();
  // const url = import.meta.env.VITE_API_URL;
  const url = "https://capstone23.sit.kmutt.ac.th/sy4/api";
  // const url = "http://localhost:8080/api";
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

  function buildInternshipObject(internship) {
    return {
      title: internship.title,
      applicationDeadline: internship.applicationDeadline,
      skillNeededList: internship.skillNeededList,
      jobRequirement: internship.jobRequirement,
      jobDescription: internship.jobDescription,
      jobBenefits: internship.jobBenefits,
      link: internship.link,
      salary: internship.salary,
      workType: internship.workType,
      jobLocation_ID: internship.jobLocation_ID,
    };
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
      showAlert("Forbidden.", "error");
    } else if (res.status === HTTP_STATUS.UNAUTHORIZED) {
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

  async function getInternships() {
    try {
      const res = await fetch(`${url}/jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.getCookie("token")}`,
        },
      });
      if (res.status === HTTP_STATUS.OK) {
        internships.value = await res.json();
      }
    } catch (error) {
      showAlert(
        `Failed to retrieve internships: ${error.message}, please ensure that you are logged in`,
        "error"
      );
    }
  }

  async function createInternship(internship) {
    try {
      const res = await fetch(`${url}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.getCookie("token")}`,
        },
        body: JSON.stringify(internship),
      });
      if (res.status === HTTP_STATUS.CREATED) {
        showAlert("Internship created", "success");
      }
    } catch (error) {
      showAlert(`An error occurred: ${error.message}`, "error");
    }
  }

  async function updateInternship(internship) {
    try {
      const res = await fetch(`${url}/jobs/${internship.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.getCookie("token")}`,
        },
        body: JSON.stringify(buildInternshipObject(internship)),
      });

      if (res.status === HTTP_STATUS.OK) {
        showAlert("Internship updated", "success");
      } else {
        handleResponse(res);
      }
    } catch (error) {
      showAlert(`An error occurred: ${error.message}`, "error");
    }
  }

  async function deleteInternship(id) {
    try {
      const res = await fetch(`${url}/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.getCookie("token")}`,
        },
      });

      if (res.status === HTTP_STATUS.OK) {
        showAlert("Internship deleted", "success");
      } else {
        handleResponse(res);
      }
    } catch (error) {
      showAlert(`An error occurred: ${error.message}`, "error");
    }
  }

  return {
    getInternships,
    alertState,
    closeAlert,
    showAlert,
    createInternship,
    updateInternship,
    deleteInternship,
    internships,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(internshipsStore, import.meta.hot));
}
