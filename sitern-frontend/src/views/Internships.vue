<template>
  <div class="container relative mx-auto">
    <h1 class="mb-4 text-3xl font-bold">Internships</h1>
    <ul class="flex flex-col gap-4">
      <InternshipCardList
        :internships="internships"
        @deleteInternship="deleteInternship"
        @editInternship="editInternship"
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
      :internships="internships"
      :companies="companies"
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
import AddCompanyModal from "../components/CompanyComponent/AddCompanyModal.vue";
import { companyStore } from "../services/company";

const internshipsService = internshipsStore();
const companyService = companyStore();
const internships = ref([]);
const companies = ref([]);

onMounted(async () => {
  refreshInternships();
  refreshCompanies();
});

const refreshInternships = async () => {
  await internshipsService.getInternships();
  internships.value = internshipsService.internships;
};

const refreshCompanies = async () => {
  await companyService.getCompanies();
  companies.value = companyService.companies;
};

const showAddButtons = ref(false);
const showAddCompanyModal = ref(false);
const showAddInternshipModal = ref(false);

const handleAddCompany = async (company) => {
  // Validate the form fields before proceeding
  if (validateForm(company, "company") == false) {
    // Display an error message or handle validation failure
    return;
  }

  try {
    await companyService.addCompany(company);
    alert("Add Company", company);
    closeModal("showAddCompanyModal");
    await refreshCompanies();
  } catch (error) {
    console.error("Error adding internship:", error);
  }
};

const editInternship = async (internship) => {
  try {
    await internshipsService.updateInternship(internship);
    await refreshInternships();
  } catch (error) {
    console.error("An error occurred:", error);
  }
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
  if (!validateForm(internship, "internship")) {
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

const validateForm = (data, type) => {
  // Add your validation logic here

  const isInternship = type === "internship";
  const requiredFields = isInternship
    ? ["title", "position", "skillNeededList", "jobRequirement", "salary", "workType", "job_location_ID"]
    : ["companyName", "companyDescription", "companyLocation", "companyWebsite", "companyEmployee"];

  if (!checkRequiredFields(data, requiredFields)) {
    // You can customize this condition based on your form requirements
    alert(`Please fill in all required ${isInternship ? 'internship' : 'company'} fields.`);
    return false;
  }

  // You can add more specific validation checks for each field if needed

  return true;
};

const checkRequiredFields = (data, fields) => {
  return fields.every(field => {
    const nestedFields = field.split('.');
    return nestedFields.reduce((obj, key) => obj && obj[key], data);
  });
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
