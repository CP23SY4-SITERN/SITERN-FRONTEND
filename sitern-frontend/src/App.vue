<script setup>
import NavBar from "./components/NavBarComponent/NavBar.vue";
import Footer from "./components/FooterComponent/Footer.vue";
import { onBeforeMount } from "vue";
import { jwtDecode } from "jwt-decode";
import { cookieData } from "./services/cookieData.js";
import { loginStore } from "./services/loginData.js";
import { useRouter } from "vue-router";
import ConfirmationModal from "./components/ModalComponent/ConfirmationModal.vue";

const cookie = cookieData();
const loginService = loginStore();
const router = useRouter();
onBeforeMount(() => {
  loginService.checkLogin();
  if (loginService.isLogin) {
    let decoded = jwtDecode(cookie.getCookie("token"));
    loginService.setLoginUser(decoded);
  }
});

const handleLogout = async () => {
  loginService.showConfirm();
};

const logout = () => {
  loginService.logout();
  loginService.closeConfirm();
  router.push("/Login");
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavBar @logout="handleLogout" />
    <div class="flex-grow p-6 overflow-y-auto">
      <router-view />
      <ConfirmationModal
        :showConfirmModal="loginService.confirmState.isOpen"
        :confirmText="'Are you sure you want to logout?'"
        @closeModal="showModal = false"
        @confirm="logout"
      />
    </div>
    <Footer />
  </div>
</template>

<style>
body {
  background-color: #e7f0f1;
}

.flex-grow {
  flex-grow: 1;
}
</style>
