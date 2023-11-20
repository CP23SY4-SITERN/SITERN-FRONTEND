<script setup>
import { ref } from "vue";
import NavBar from "./NavBarComponent/NavBar.vue";
import Footer from "./FooterComponent/Footer.vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div>
    <header>
      <NavBar/>
    </header>
    <main>
        
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
</style>
