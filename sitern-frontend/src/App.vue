<script setup>
import NavBar from "./components/NavBarComponent/NavBar.vue";
import Footer from "./components/FooterComponent/Footer.vue";
</script>

<template>
  <div>
    <NavBar />
    <div class="main-content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style>
body {
  background-color: #e7f0f1;
}

.main-content {
  padding: 20px; /* Adjust padding as needed */
}
</style>
