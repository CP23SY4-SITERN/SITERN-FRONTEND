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
      <div class="flex items-center p-8">
        <h1 class="text-9xl font-bold mr-20">
          Find your desired <br />
          Internship Job
        </h1>
        <svg
          class="w-[256x] h-[256px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
          d="M7.45508 2V3M11.3438 3.61084L10.6366 4.31795M4.27344 10.6821L3.56633 11.3892M1.95508 7.5H2.95508M3.56641 3.61084L4.27351 4.31795M6.50049 9.21251C6.38862 9.15163 6.2832 9.08038 6.18553 9.00006C5.73952 8.63325 5.45508 8.07714 5.45508 7.45459C5.45508 6.35002 6.35051 5.45459 7.45508 5.45459C8.21398 5.45459 8.87416 5.87727 9.21303 6.50006C9.29756 6.65541 9.3621 6.82321 9.40319 7M9.8 21C7.14903 21 5 18.9466 5 16.4137C5 14.3144 6.6 12.375 9 12C9.75283 10.274 11.5346 9 13.6127 9C16.2747 9 18.4504 10.9907 18.6 13.5C20.0127 14.0956 21 15.5574 21 17.1402C21 19.2719 19.2091 21 17 21L9.8 21Z"
            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          />
        </svg>
      </div>

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
