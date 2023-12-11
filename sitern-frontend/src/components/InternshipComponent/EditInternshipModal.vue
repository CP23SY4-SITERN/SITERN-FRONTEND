<!-- EditInternshipModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="p-4 overflow-y-auto bg-white rounded-lg max-h-[40rem] sm:w-1/2">
      <h2 class="mb-4 text-xl font-bold">Edit Internship</h2>

      <form @submit.prevent="editInternship">
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
          <label for="position" class="mb-2 text-sm font-medium"
            >Position:</label
          >
          <input
            type="text"
            id="position"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="internship.position"
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

const emit = defineEmits(["editInternship", "cancel"]);

const editInternship = () => {
  emit("editInternship", props.internship);
  props.show = false;
};
</script>
