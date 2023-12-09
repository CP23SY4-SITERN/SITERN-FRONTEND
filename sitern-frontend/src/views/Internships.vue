<template>
  <div class="container relative mx-auto">
    <h1 class="mb-4 text-3xl font-bold">Internships</h1>
    <ul class="flex flex-col gap-4">
      <InternshipCardList :internships="internships" />
    </ul>

    <!-- Add Internship Button -->
    <button @click="toggleAddButtons" class="bg-blue-500 add-internship-button">
      Add Internship
    </button>

    <!-- Add Company and Post Buttons (conditional) -->
    <div v-if="showAddButtons" class="add-buttons">
      <button class="bg-blue-500" @click="showAddCompanyModal = true">Add Company</button>
      <button class="bg-blue-500" @click="showAddInternshipModal = true">Post</button>
    </div>
    <AddCompanyModal :show="showAddCompanyModal" @cancel="handleCancelModal" @addCompany="handleAddCompany"/>
    <AddInternshipModal :show="showAddInternshipModal" @cancel="handleCancelModal" @addInternship="handleAddInternship"/>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { internshipsStore } from "../services/internships";
import InternshipCardList from "../components/InternshipComponent/InternshipCardList.vue";
import AddInternshipModal from "../components/InternshipComponent/AddInternshipModal.vue";
import AddCompanyModal from "../components/InternshipComponent/AddCompanyModal.vue";
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
  }
];

const showAddButtons = ref(false);
const showAddCompanyModal = ref(false);
const showAddInternshipModal = ref(false);

const handleAddCompany = (company) => {
  console.log('Add Company', company);
};

const handleAddInternship = (company) => {
  alert('Add Internship', company);
};

const handleCancelModal = () => {
  showAddCompanyModal.value = false;
  showAddInternshipModal.value = false;
};

const toggleAddButtons = () => {
  showAddButtons.value = !showAddButtons.value;
};

</script>

<style scoped>
.add-internship-button {
  position: fixed;
  bottom: 140px;
  right: 20px;
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
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1; /* Adjust the z-index */
}
</style>
