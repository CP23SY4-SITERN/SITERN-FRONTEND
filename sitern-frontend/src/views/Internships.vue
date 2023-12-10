<template>
  <div class="container relative mx-auto">
    <h1 class="mb-4 text-3xl font-bold">Internships</h1>
    <ul class="flex flex-col gap-4">
      <InternshipCardList
        :internships="internships"
        @deleteInternship="deleteInternship"
      />
    </ul>

    <!-- Add Internship Button -->
    <button @click="toggleAddButtons" class="bg-blue-500 add-internship-button">
      Add Internship
    </button>

    <!-- Add Company and Post Buttons (conditional) -->
    <div v-if="showAddButtons" class="add-buttons">
      <button class="bg-blue-500" @click="showAddCompanyModal = true">
        Add Company
      </button>
      <button class="bg-blue-500" @click="showAddInternshipModal = true">
        Post
      </button>
    </div>
    <AddCompanyModal
      :show="showAddCompanyModal"
      @cancel="closeModal"
      @addCompany="handleAddCompany"
    />
    <AddInternshipModal
      :show="showAddInternshipModal"
      @cancel="closeModal"
      @addInternship="handleAddInternship"
    />
  </div>
</template>
<script setup>
import { onMounted, ref, onUpdated } from "vue";
import { internshipsStore } from "../services/internships";
import InternshipCardList from "../components/InternshipComponent/InternshipCardList.vue";
import AddInternshipModal from "../components/InternshipComponent/AddInternshipModal.vue";
import AddCompanyModal from "../components/InternshipComponent/AddCompanyModal.vue";

const internshipsService = internshipsStore();
const internships = ref([]);

onMounted(async () => {
  refreshInternships();
});

const refreshInternships = async () => {
  await internshipsService.getInternships();
  internships.value = internshipsService.internships;
};

const showAddButtons = ref(false);
const showAddCompanyModal = ref(false);
const showAddInternshipModal = ref(false);

const handleAddCompany = (company) => {
  console.log("Add Company", company);
};

const deleteInternship = async (id) => {
  try {
    await internshipsService.deleteInternship(id);
    await refreshInternships();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const handleAddInternship = async (internship) => {
  // Validate the form fields before proceeding
  if (!validateForm(internship)) {
    // Display an error message or handle validation failure
    return;
  }

  try {
    await internshipsService.createInternship(internship);
    alert("Add Internship", internship);
    closeModal("showAddInternshipModal");
    await refreshInternships();
  } catch (error) {
    console.error("Error adding internship:", error);
    // Handle the error as needed
  }
};

const validateForm = (internship) => {
  // Add your validation logic here
  if (
    !internship.title ||
    !internship.company_ID ||
    !internship.position ||
    !internship.skillNeededList ||
    !internship.jobRequirement ||
    !internship.salary ||
    !internship.workType ||
    !internship.job_location_ID
  ) {
    // You can customize this condition based on your form requirements
    alert("Please fill in all required fields.");
    return false;
  }

  // You can add more specific validation checks for each field if needed

  return true;
};

const closeModal = (modalName) => {
  switch (modalName) {
    case "showAddInternshipModal":
      showAddInternshipModal.value = false;
      break;
    case "showAddCompanyModal":
      showAddCompanyModal.value = false;
      break;
    default:
      // Handle the default case (if modalName doesn't match any case)
      break;
  }
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
