<!-- AddInternshipModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <AlertModal
      :showAlert="internshipsService.alertState.isOpen"
      :alertText="internshipsService.alertState.alertText"
      :alertType="internshipsService.alertState.alertType"
    />
    <div class="p-8 overflow-y-auto bg-white rounded-lg max-h-[50rem] sm:w-1/2">
      <div class="flex items-center justify-end space-x-2">
        <button @click="closeModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 72 72"
          >
            <path
              d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"
            ></path>
          </svg>
        </button>
      </div>
      <h2 class="mb-4 text-xl font-bold">{{ currentPage === 1 ? "Add Internship" : "Add Internship" }}</h2>

      <form @submit.prevent="currentPage === 1 ? submitPageOne : addInternship">
        <template v-if="currentPage === 1">
          <!-- Page 1: General Information -->
          <div class="flex flex-col mb-4">
            <label for="title" class="mb-2 text-sm font-medium">Title <span class="text-red-500">*</span> :</label>
            <input type="text" id="title" class="p-2 rounded-md shadow-sm focus:outline-none" v-model="internship.title" required />
          </div>
          <!-- Add more fields for Page 1 as needed -->
          <div class="flex flex-col mb-4">
            <label for="company-id" class="mb-2 text-sm font-medium">Company <span class="text-red-500">*</span> :</label>
            <select id="company_id" class="p-2 rounded-md shadow-sm focus:outline-none" v-model="selectedCompany" required>
              <option v-for="company in uniqueCompanies" :key="company.companyName" :value="company.id">{{ company.companyName }}</option>
            </select>
          </div>
          <!-- More form fields for Page 1 -->
          <div class="flex flex-col mb-4">
          <label for="application-deadline" class="mb-2 text-sm font-medium"
            >Application Due <span class="text-red-500">*</span> :</label
          >
          <input
            type="date"
            id="applicationDeadline"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.applicationDeadline"
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="position" class="mb-2 text-sm font-medium"
            >Position <span class="text-red-500">*</span> :</label
          >
          <input
            type="text"
            id="position"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.position"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="skillsneed" class="mb-2 text-sm font-medium"
            >Skill Needed List <span class="text-red-500">*</span> :</label
          >
          <input
            type="text"
            id="skillsneed"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.skillNeededList"
            required
          />
        </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="mr-2 text-sm font-medium text-gray-500 hover:underline">Cancel</button>
            <button type="button" @click="submitPageOne" class="px-4 py-2 font-medium text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600">Next</button>
          </div>
        </template>

        <template v-else-if="currentPage === 2">
          <!-- Page 2: Additional Information -->
          <div class="flex flex-col mb-4">
            <label for="jobrequirement" class="mb-2 text-sm font-medium">Job Requirement <span class="text-red-500">*</span> :</label>
            <input type="text" id="jobrequirement" class="p-2 rounded-md shadow-sm focus:outline-none" v-model="internship.jobRequirement" required />
          </div>
          <!-- Add more fields for Page 2 as needed -->
          <div class="flex flex-col mb-4">
          <label for="jobdesc" class="mb-2 text-sm font-medium"
            >Job Description:</label
          >
          <input
            type="text"
            id="jobdesc"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.jobDescription"
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="jobbenefit" class="mb-2 text-sm font-medium"
            >Job Benefits:</label
          >
          <input
            type="text"
            id="jobbenefit"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.jobBenefits"
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="link" class="mb-2 text-sm font-medium">link:</label>
          <input
            type="url"
            id="link"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.link"
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="salary" class="mb-2 text-sm font-medium"
            >Salary <span class="text-red-500">*</span> :</label
          >
          <input
            type="number"
            id="salary"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.salary"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="workType" class="mb-2 text-sm font-medium"
            >Work Type <span class="text-red-500">*</span> :</label
          >
          <select
            id="workType"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.workType"
            required
          >
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>
        <div class="flex flex-col mb-4">
          <label for="joblocationid" class="mb-2 text-sm font-medium"
            >Job Location ID <span class="text-red-500">*</span> :</label
          >
          <input
            type="number"
            id="joblocationid"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.jobLocation_ID"
            required
          />
        </div>
          <!-- Navigation buttons -->
          <div class="flex justify-end">
            <button type="button" @click="prevPage" class="mr-2 text-sm font-medium text-gray-500 hover:underline">Back</button>
            <button type="submit" @click="addInternship" class="px-4 py-2 font-medium text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600">Add Internship</button>
          </div>
        </template>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AlertModal from '../ModalComponent/AlertModal.vue';
import { internshipsStore } from '../../services/internships';
const emit = defineEmits(["addInternship", "cancel"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  internships: {
    type: Array,
  },
  companies: {
    type: Array,
    default: [],
  },
});

const internshipsService = internshipsStore();
const isTitleValid = ref(false);
const isCompanyValid = ref(false);
const currentPage = ref(1);
const selectedCompany = ref("");
const internship = ref({
  title: "",
  company_ID: "",
  applicationDeadline: "",
  position: "",
  skillNeededList: "",
  jobRequirement: "",
  jobDescription: "",
  jobBenefits: "",
  link: "",
  salary: "",
  workType: "",
  jobLocation_ID: "",
  isActive: "",
});

const uniqueCompanies = computed(() => {
  const companiesMap = new Map();

  props.companies.forEach((company) => {
    const { companyName, id } = company;

    // Use the company name as the key in the Map
    if (!companiesMap.has(companyName)) {
      companiesMap.set(companyName, { companyName, id });
    }
  });

  // Convert the Map values to an array
  return Array.from(companiesMap.values());
});

const nextPage = () => {
  currentPage.value++;
};

const prevPage = () => {
  currentPage.value--;
};

const closeModal = () => {
  currentPage.value = 1;
  emit("cancel", "showAddInternshipModal");
};

const submitPageOne = () => {
  if (validateForm()) {
    // Handle form submission logic for Page 1
    nextPage();
  } else {
    internshipsService.showAlert("Page 1 validation failed. Please check the fields.", "warning");
  }
};

const addInternship = () => {
  if (validateForm()) {
    // Format the date to match the expected format "yyyy-MM-dd"
    const formattedDate = new Date(internship.value.applicationDeadline).toISOString().split("T")[0];

    const internshipDTO = {
      title: internship.value.title,
      company_ID: selectedCompany.value,
      applicationDeadline: formattedDate,
      position: internship.value.position,
      skillNeededList: internship.value.skillNeededList,
      jobRequirement: internship.value.jobRequirement,
      jobDescription: internship.value.jobDescription,
      jobBenefits: internship.value.jobBenefits,
      link: internship.value.link,
      salary: parseInt(internship.value.salary),
      workType: internship.value.workType,
      jobLocation_ID: parseInt(internship.value.jobLocation_ID),
    };
    emit("addInternship", internshipDTO);
    resetForm();
  } else {
    // Display an alert when form validation fails
  }
};

const resetForm = () => {
  // Reset the form data
  internship.value = {
    title: "",
    company_ID: "",
    applicationDeadline: "",
    position: "",
    skillNeededList: "",
    jobRequirement: "",
    jobDescription: "",
    jobBenefits: "",
    link: "",
    salary: "",
    workType: "",
    jobLocation_ID: "",
    isActive: "",
  };
  currentPage.value = 1;
};

const validateForm = () => {
  isTitleValid.value = internship.value.title.trim().length >= 1;
  isCompanyValid.value = !!selectedCompany.value;

  return isTitleValid.value && isCompanyValid.value;
};
</script>
