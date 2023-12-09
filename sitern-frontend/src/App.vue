<script setup>
import NavBar from "./components/NavBarComponent/NavBar.vue";
import Footer from "./components/FooterComponent/Footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <div class="flex-grow p-6 overflow-y-auto">
      <router-view />
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
