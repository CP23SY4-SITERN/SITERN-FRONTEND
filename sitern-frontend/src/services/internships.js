import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

export const internshipsStore = defineStore('internships', () => {
  const internships = ref([]);
  // const url = import.meta.env.VITE_API_URL;
  const url = "https://capstone23.sit.kmutt.ac.th/sy4/api";

  async function getInternships() {
    try {
      const res = await fetch(`${url}/jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        internships.value = await res.json();
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
  };

  async function createInternship(internship) {
    try {
      const res = await fetch(`${url}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(internship),
      });
      if (res.status === 201) {
        alert("Internship created");
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
        console.log("Error, cannot create internship");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  async function updateInternship(internship) {
    try {
      const res = await fetch(`${url}/jobs/${internship.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });
      if (res.status === 200) {
        alert("Internship updated");
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
        console.log("Error, cannot update internship");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  async function deleteInternship(id) {
    try {
      const res = await fetch(`${url}/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        console.log("Internship deleted");
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
        console.log("Error, cannot delete internship");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return {
    getInternships,
    createInternship,
    updateInternship,
    deleteInternship,
    internships
  };
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(internshipsStore, import.meta.hot));
}
