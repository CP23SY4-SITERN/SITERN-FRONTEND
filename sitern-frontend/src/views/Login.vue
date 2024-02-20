<template>
  <div>
    <Login @submit="handleSubmit" />
    <AlertModal :showAlert="loginService.alertState.isOpen" :alertText="loginService.alertState.alertText" :alertType="loginService.alertState.alertType" />
  </div>
</template>

<script setup>
import Login from "../components/LoginComponent/LoginComponent.vue";
import AlertModal from "../components/ModalComponent/AlertModal.vue";
import { loginStore } from "../services/loginData.js";

const loginService = loginStore();

const handleSubmit = async (loginUser) => {
  try {
    await loginService.login(loginUser);
  } catch (error) {
  }
};
</script>
