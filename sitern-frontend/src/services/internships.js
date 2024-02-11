import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const internshipsStore = defineStore("internships", () => {
  const internships = ref([]);
  // const url = import.meta.env.VITE_API_URL;
  // const url = "https://capstone23.sit.kmutt.ac.th/sy4/api";
  const url = "http://localhost:8080/api";
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
      job_location_id: internship.job_location_id,
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
        isLogin.refreshToken();
      } else {
        alert("Please login");
      }
    } else if (res.status === HTTP_STATUS.FORBIDDEN) {
      alert("You are not authorized to access this page.");
    } else {
      console.log(`Error: ${res.status}, cannot perform the operation`);
    }
  }

  async function fetchJson(url, options) {
    const res = await fetch(url, options);
    if (res.ok) {
      return await res.json();
    } else {
      handleResponse(res);
    }
  }

  async function getInternships() {
    try {
      const data = await fetchJson(`${url}/jobs`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      internships.value = data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function createInternship(internship) {
    try {
      const data = await fetchJson(`${url}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(internship),
      });

      if (data) {
        alert("Internship created");
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`, error);
    }
  }

  async function updateInternship(internship) {
    try {
      const data = await fetchJson(`${url}/jobs/${internship.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildInternshipObject(internship)),
      });

      if (data) {
        alert("Internship updated");
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`, error);
    }
  }

  async function deleteInternship(id) {
    try {
      const data = await fetchJson(`${url}/jobs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (data) {
        console.log("Internship deleted");
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`, error);
    }
  }

  return {
    getInternships,
    createInternship,
    updateInternship,
    deleteInternship,
    internships,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(internshipsStore, import.meta.hot));
}
