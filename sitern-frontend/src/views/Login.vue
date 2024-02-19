<template>
  <div>
    <Login @submit="handleSubmit" />
  </div>
</template>

<script setup>
import Login from "../components/LoginComponent/LoginComponent.vue";
import { loginStore } from "../services/loginData.js";

const loginService = loginStore();

const handleSubmit = async (loginUser) => {
  try {
    await loginService.login(loginUser);
  } catch (error) {
    console.error("An error occurred:", error);
    alert("Login failed. Please try again.");
  }
};
</script>
