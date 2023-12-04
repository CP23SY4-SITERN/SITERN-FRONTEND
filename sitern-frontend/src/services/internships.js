import { defineStore, acceptHMRUpdate } from 'pinia';

export const internshipsStore = defineStore('internships', () => {
  const internships = ref([]);
  const url = import.meta.env.VITE_API_URL;

  const getAllJobs = async () => {
    const res = await fetch(`${url}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      users.value = await res.json();
    } else if (res.status === 401) {
      let res = await res.json();
      if (
        res.message
          .toLowerCase()
          .match(
            "please send refresh token to /refresh to refresh token".toLowerCase()
          )
      ) {
        isLogin.refreshToken();
      } else alert("please login");
    } else if (res.status === 403) {
      alert("You are not authorized to access this page.")
    }else console.log("Error, cannot get data");
  };
  return {
    getAllJobs,
    internships
  };
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(internshipsStore, import.meta.hot));
}
