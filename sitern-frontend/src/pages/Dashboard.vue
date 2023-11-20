<script setup>
import { ref } from "vue";
import NavBar from "../components/NavBarComponent/NavBar.vue";
import Footer from "../components/FooterComponent/Footer.vue";
import Searchbox from "../components/InternshipComponent/InternshipSearchbox.vue";
import FilterIcon from "../components/InternshipComponent/InternshipFilter.vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <NavBar />
    </header>
    <main class="flex-grow">
      <!-- Content to fill the main part -->
      <div class="p-8">
        <div class="flex items-center justify-between w-full">
          <Searchbox class="searchbox" />
          <FilterIcon class="filter-icon" />
        </div>
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
/* Set the background color for the main part */
main {
  background-color: #e7f0f1;
}

/* Style the content inside the main part if needed */
main div {
  color: #000000; /* Set text color */
}

.searchbox {
  display: flex;
  align-items: center;
  width: 50%;
  margin-right: 10px;
}

.searchbox input {
  flex: 1; /* Occupies the remaining space in the flex container */
  margin-right: 5px; /* Add a small margin between the input and button */
}

.searchbox button {
  margin: 0; /* Remove default button margin */
}

.filter-icon {
  float: right;
}
</style>
