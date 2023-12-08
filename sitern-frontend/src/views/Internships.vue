<template>
  <div class="container mx-auto relative">
    <h1 class="text-3xl font-bold mb-4">Internships</h1>

    <ul class="flex flex-col gap-4">
      <InternshipCardList :internships="internships" />
    </ul>

    <!-- Add Internship Button -->
    <button @click="toggleAddButtons" class="add-internship-button">
      Add Internship
    </button>

    <!-- Add Company and Post Buttons (conditional) -->
    <div v-if="showAddButtons" class="add-buttons">
      <button @click="addCompany">Add Company</button>
      <button @click="postInternship">Post</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { internshipsStore } from "../services/internships";
import InternshipCardList from "../components/InternshipComponent/InternshipCardList.vue";

const internships = [
  {
    id: 1,
    title: "Internship 1",
    company: "Company 1",
    position: "Position 1",
    description: "Description 1",
    link: "Link 1",
  },
  {
    id: 2,
    title: "Internship 2",
    company: "Company 2",
    position: "Position 2",
    description: "Description 2",
    link: "Link 2",
  },
  {
    id: 3,
    title: "Internship 3",
    company: "Company 3",
    position: "Position 3",
    description: "Description 3",
    link: "Link 3",
  },
  {
    id: 4,
    title: "Internship 4",
    company: "Company 4",
    position: "Position 4",
    description: "Description 4",
    link: "Link 4",
  },
  {
    id: 5,
    title: "Internship 5",
    company: "Company 5",
    position: "Position 5",
    description: "Description 5",
    link: "Link 5",
  },
];

const showAddButtons = ref(false);

const toggleAddButtons = () => {
  showAddButtons.value = !showAddButtons.value;
};

const addCompany = () => {
  // Logic to add a company
  console.log('Add Company');
};
const postInternship = () => {
  // Logic to post an internship
  console.log('Post Internship');
};
</script>

<style scoped>
.add-internship-button {
  position: fixed;
  bottom: 140px;
  right: 20px;
  background-color: #3490dc;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1; /* Adjust the z-index */
}

.add-buttons {
  position: fixed;
  bottom: 200px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1; /* Adjust the z-index */
}

.add-buttons button {
  background-color: #3490dc;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1; /* Adjust the z-index */
}
</style>
