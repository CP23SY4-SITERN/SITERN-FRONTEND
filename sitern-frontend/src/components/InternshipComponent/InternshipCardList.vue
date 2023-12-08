<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="internship in myInternships" class="interncard">
      <!-- Favorite Icon -->
      <button class="favorite-icon" @click="toggleFavorite(internship)">
        <!-- Add your favorite icon here -->
        <span>&#9733;</span>
      </button>

      <!-- Internship Details -->
      <div class="internship-details mt-6">
        <h1>{{ internship.title }}</h1>
        <h2>{{ internship.company }}</h2>
        <h3 class="mb-12">{{ internship.position }}</h3>
      </div>

      <!-- Apply Button -->
      <button class="apply-button" @click="applyToInternship(internship)">
        Apply
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ref } from 'vue';

const props = defineProps({
  internships: {
    type: Array,
    default: [],
  },
});

const myInternships = computed(() => {
  return props.internships.map(element => ({
    id: element.id,
    title: element.title,
    company: element.company,
    position: element.position,
    description: element.description,
    link: element.link,
    isFavorite: ref(false), // Add a property to track if it's a favorite
  }));
});

const toggleFavorite = (internship) => {
  internship.isFavorite = !internship.isFavorite;
};

const applyToInternship = (internship) => {
  // Add logic for applying to the internship
  console.log(`Applied to ${internship.title}`);
};
</script>

<style>
/* Add your custom styles here */
.interncard {
  @apply border-2 relative m-2.5 p-2.5 rounded-[15px] border-solid border-[black];
  /* Add this to position the buttons inside the card */
}

.favorite-icon {
  @apply absolute cursor-pointer right-2.5 top-2.5;
}

.apply-button {
  @apply absolute bg-[#3490dc] text-white cursor-pointer px-2.5 py-[5px] rounded-[3px] border-[none] right-2.5 bottom-2.5;
}

.internship-details {
  @apply flex flex-col gap-1.5;
}
</style>
