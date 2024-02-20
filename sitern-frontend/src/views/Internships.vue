<template>
  <div class="container relative mx-auto">
    <AlertModal :showAlert="internshipsService.alertState.isOpen" :alertText="internshipsService.alertState.alertText" :alertType="internshipsService.alertState.alertType" />
    <AlertModal :showAlert="companyService.alertState.isOpen" :alertText="companyService.alertState.alertText" :alertType="companyService.alertState.alertType" />
    <h1 class="mb-4 text-3xl font-bold">Internships</h1>
    <ul class="flex flex-col gap-4">
      <InternshipCardList
        :internships="internships"
        @deleteInternship="deleteInternship"
        @editInternship="editInternship"
      />
    </ul>
    <!-- Add Internship Button -->
    <button
      v-show="(!isPageScrolling && !isSomethingToggled) && loginService.loginUser.role === 'STAFF'"
      @click="toggleAddButtons"
      class="bg-blue-500 add-internship-button"
    >
      Add Internship
    </button>

    <!-- Add Company and Post Buttons (conditional) -->
    <transition name="fade">
      <div v-show="showAddButtons" class="add-buttons">
        <button class="bg-blue-500" @click="showAddCompanyModal = true">
          Add Company
        </button>
        <button class="bg-blue-500" @click="showAddInternshipModal = true">
          Post
        </button>
      </div>
    </transition>
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
import { onMounted, ref, onUpdated, watch, watchEffect } from "vue";
import { internshipsStore } from "../services/internships";
import InternshipCardList from "../components/InternshipComponent/InternshipCardList.vue";
import AddInternshipModal from "../components/InternshipComponent/AddInternshipModal.vue";
import AddCompanyModal from "../components/CompanyComponent/AddCompanyModal.vue";
import { companyStore } from "../services/company";
import AlertModal from "../components/ModalComponent/AlertModal.vue";
import { loginStore } from "../services/loginData";

const internshipsService = internshipsStore();
const companyService = companyStore();
const internships = ref([]);
const companies = ref([]);
const showAddButtons = ref(false);
const showAddCompanyModal = ref(false);
const showAddInternshipModal = ref(false);
const isPageScrolling = ref(false);
const isSomethingToggled = ref(false);
const loginService = loginStore();

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

const handleAddCompany = async (company) => {
  // Validate the form fields before proceeding
  if (validateForm(company, "company") == false) {
    // Display an error message or handle validation failure
    return;
  }

  try {
    await companyService.addCompany(company);
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
    closeModal("showAddInternshipModal");
    await refreshInternships();
  } catch (error) {
    console.error("Error adding internship:", error);
  }
};

const validateForm = (data, type) => {
  // Add your validation logic here

  const isInternship = type === "internship";
  const requiredFields = isInternship
    ? [
        "title",
        "position",
        "skillNeededList",
        "jobRequirement",
        "salary",
        "workType",
        "jobLocation_ID",
      ]
    : [
        "companyName",
        "companyDescription",
        "companyLocation",
        "companyWebsite",
        "companyEmployee",
      ];

  if (!checkRequiredFields(data, requiredFields)) {
    // You can customize this condition based on your form requirements
    internshipsService.showAlert("Please fill in all required fields.", "error");
    return false;
  }

  // You can add more specific validation checks for each field if needed

  return true;
};

const checkRequiredFields = (data, fields) => {
  return fields.every((field) => {
    const nestedFields = field.split(".");
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


// Listen for scroll events to update isPageScrolling
window.addEventListener("scroll", () => {
  isPageScrolling.value = true;
  setTimeout(() => {
    isPageScrolling.value = false;
  }, 3000);
});

// Watch changes in showAddButtons to handle fade animation
watchEffect(
  () => showAddButtons.value,
);
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
  opacity: 1;
  transition: opacity 0.5s ease-in-out; /* Smooth transition */
}

.add-buttons button {
  opacity: 1;
  transition: opacity 1s;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
