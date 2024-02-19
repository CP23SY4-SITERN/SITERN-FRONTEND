<template>
  <div>
    <Register @submit="handleSubmit" />
  </div>
</template>

<script setup>
import Register from "../components/LoginComponent/RegisterComponent.vue";
import { loginStore } from "../services/loginData.js";

const loginService = loginStore();

const handleSubmit = async (registerUser) => {
  try {
    await loginService.register(registerUser); // Wait for registration to complete
  } catch (error) {
    console.error("An error occurred:", error);
    alert("Registration failed. Please try again."); // User friendly error message
  }
};
</script>
