import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';

export const internshipsStore = defineStore('internships', () => {
  const internships = ref([]);
  // const url = import.meta.env.VITE_API_URL;
  const url = "http://10.4.85.44:8080/api";

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
    deleteInternship,
    internships
  };
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(internshipsStore, import.meta.hot));
}
