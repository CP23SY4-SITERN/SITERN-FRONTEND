<template>
  <div>
    <Register @submit="handleSubmit" />
    <AlertModal :showAlert="loginService.alertState.isOpen" :alertText="loginService.alertState.alertText" :alertType="loginService.alertState.alertType" />
  </div>
</template>

<script setup>
import Register from "../components/LoginComponent/RegisterComponent.vue";
import { loginStore } from "../services/loginData.js";
import AlertModal from "../components/ModalComponent/AlertModal.vue";

const loginService = loginStore();

const handleSubmit = async (registerUser) => {
  try {
    await loginService.register(registerUser); // Wait for registration to complete
  } catch (error) {
  }
};
</script>
