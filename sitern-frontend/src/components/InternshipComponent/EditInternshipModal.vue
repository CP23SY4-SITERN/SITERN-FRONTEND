<!-- EditInternshipModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
  >
    <div class="p-4 overflow-y-auto bg-white rounded-lg max-h-[40rem] sm:w-1/2">
      <div class="flex items-center justify-end space-x-2">
        <button
          @click="(show = false), $emit('cancel')"
        >
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
      <h2 class="mb-4 text-xl font-bold">Edit Internship</h2>

      <form>
        <div class="flex flex-col mb-4">
          <label for="name" class="mb-2 text-sm font-medium">Title:</label>
          <input
            type="text"
            id="title"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.title"
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="company-id" class="mb-2 text-sm font-medium"
            >Company ID:</label
          >
          <input
            type="text"
            id="company_id"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.company_ID"
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="application-deadline" class="mb-2 text-sm font-medium"
            >Application Due:</label
          >
          <input
            type="text"
            id="applicationDeadline"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.applicationDeadline"
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
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="workType" class="mb-2 text-sm font-medium"
            >Work Type:</label
          >
          <input
            type="text"
            id="workType"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.workType"
          />
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
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="mr-2 text-sm font-medium text-gray-500 hover:underline"
            @click="(show = false), $emit('cancel')"
          >
            Cancel
          </button>
          <button
            type="submit"
            @click="editInternship"
            class="px-4 py-2 font-medium text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  internship: {
    type: Object,
    default: {},
  },
});

const internship = ref({
  title: "",
  company_ID: "",
  applicationDeadline: "",
  skillNeededList: "",
  jobRequirement: "",
  jobDescription: "",
  jobBenefits: "",
  link: "",
  salary: "",
  workType: "",
  job_location_ID: "",
});

const emit = defineEmits(["editInternship", "cancel"]);

const editInternship = () => {
  // Create a copy of props.internship
  const internshipEdit = { ...props.internship };

  // Loop through each form field and update internshipEdit
  for (const key in internship.value) {
    // Check if the form field has a value
    if (internship.value[key]) {
      // If yes, update internshipEdit with the form value
      internshipEdit[key] = internship.value[key];
    }
  }

  // Emit the edited internship object
  emit("editInternship", internshipEdit);
};
</script>
