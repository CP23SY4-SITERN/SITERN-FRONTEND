<template>
  <nav class="flex flex-wrap items-center justify-between p-6 bg-white">
    <div class="flex items-center flex-shrink-0 ml-6 mr-20">
      <router-link to="/" class="text-4xl font-semibold tracking-tight">
        SITern
      </router-link>
    </div>
    <div class="text-sm navigator lg:flex-grow">
      <router-link
        to="/Internships"
        class="block mt-4 ml-20 lg:inline-block lg:mt-0 hover:font-semibold link"
      >
        Intern Search
      </router-link>
      <router-link
        to="/Profile"
        class="block mt-4 ml-20 lg:inline-block lg:mt-0 hover:font-semibold link"
      >
        Profile
      </router-link>
      <router-link
        to="/Status"
        class="block mt-4 ml-20 lg:inline-block lg:mt-0 hover:font-semibold link"
      >
        Status
      </router-link>
      <router-link
        to="/Dashboard"
        class="block mt-4 ml-20 lg:inline-block lg:mt-0 hover:font-semibold link"
      >
        Dashboard
      </router-link>
    </div>
    <div v-if="isLogin === false">
      <router-link
        to="/Login"
      >
        <login-button/>
      </router-link>
      <router-link
        to="/Register"
      >
        <register-button/>
      </router-link>
    </div>
    <div v-else-if="isLogin === true">
      <span class="mr-5">Hi, {{ loginService.loginUser.email }} </span>
      <button class="inline-block px-4 py-2 text-sm leading-none text-white bg-blue-500 rounded hover:bg-blue-600" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import LoginButton from '../ButtonComponent/LoginButton.vue';
import RegisterButton from '../ButtonComponent/RegisterButton.vue';
import { loginStore } from "../../services/loginData.js";
import { computed } from "vue";

const loginService = loginStore();
const isLogin = computed(() => loginService.isLogin);
const logout = async () => {
  try {
    await loginService.logout();
  } catch (error) {
    console.error("An error occurred:", error);
    alert("Logout failed. Please try again.");
  }
};

</script>

<style scoped>
.navigator {
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  text-decoration: none;
  transition: color 0.25s ease-in-out;
}

.link {
  display: inline-block;
  margin-bottom: 8px; /* Adjust the gap below the text */
}

.link:hover,
.link:focus,
.link.active {
  font-weight: 600;
  color: #333333;
  text-decoration: underline; /* Add underline only for hover, focus, and active states */
  margin-bottom: 4px; /* Adjust the gap for the hover, focus, and active states */
}
</style>