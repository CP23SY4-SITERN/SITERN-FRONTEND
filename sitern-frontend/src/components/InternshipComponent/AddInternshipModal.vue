<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="p-8 overflow-y-auto bg-white rounded-lg max-h-[40rem] sm:w-1/2">
      <h2 class="mb-4 text-xl font-bold">Add Internship</h2>

      <form>
        <div class="flex flex-col mb-4">
          <label for="name" class="mb-2 text-sm font-medium">Title:</label>
          <input
            type="text"
            id="title"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.title"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="company-id" class="mb-2 text-sm font-medium"
            >Company:</label
          >
          <select
            id="company_id"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="selectedCompany"
            required
          >
            <option
              v-for="company in uniqueCompanies"
              :key="company.companyName"
              :value="company.company_ID"
            >
              {{ company.companyName }}
            </option>
          </select>
        </div>

        <div class="flex flex-col mb-4">
          <label for="application-deadline" class="mb-2 text-sm font-medium"
            >Application Due:</label
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
            >Position:</label
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
            >Skill Needed List:</label
          >
          <input
            type="text"
            id="skillsneed"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.skillNeededList"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="jobrequirement" class="mb-2 text-sm font-medium"
            >Job requirement:</label
          >
          <input
            type="text"
            id="jobrequirement"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.jobRequirement"
            required
          />
        </div>
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
          <label for="salary" class="mb-2 text-sm font-medium">Salary:</label>
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
            >Work Type:</label
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
            >Job Location ID:</label
          >
          <input
            type="number"
            id="joblocationid"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.job_location_ID"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="mr-2 text-sm font-medium text-gray-500 hover:underline"
            @click="(show = false), $emit('cancel', 'showAddInternshipModal')"
          >
            Cancel
          </button>
          <button
            @click="addInternship()"
            type="submit"
            class="px-4 py-2 font-medium text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
          >
            Add Internship
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const emit = defineEmits(["addInternship", "cancel"]);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  internships: {
    type: Array,
  },
});

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
  job_location_ID: "",
  isActive: "",
});

const uniqueCompanies = computed(() => {
  const companiesMap = new Map();

  props.internships.forEach((internship) => {
    const { companyName, company_ID } = internship;

    // Use the company name as the key in the Map
    if (!companiesMap.has(companyName)) {
      companiesMap.set(companyName, { companyName, company_ID });
    }
  });

  // Convert the Map values to an array
  return Array.from(companiesMap.values());
});

const selectedCompany = ref("");

const addInternship = () => {
  // Format the date to match the expected format "yyyy-MM-dd"
  const formattedDate = new Date(internship.value.applicationDeadline)
    .toISOString()
    .split("T")[0];

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
    job_location_ID: parseInt(internship.value.job_location_ID),
  };
  emit("addInternship", internshipDTO);
  resetForm();
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
    job_location_ID: "",
    isActive: "",
  };
};

watch(
  () => selectedCompany.value,
  (newCompany) => {
    // Find the corresponding internship with the selected company name
    const matchingInternship = props.internships.find(
      (internship) => internship.companyName === newCompany
    );

    if (matchingInternship) {
      // Update the company_ID in the internship object
      internship.company_ID = matchingInternship.company_ID;
    }
  }
);
</script>
