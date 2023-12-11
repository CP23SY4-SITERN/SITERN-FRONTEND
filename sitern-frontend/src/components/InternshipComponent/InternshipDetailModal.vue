<template>
  <div>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50" @click="closeModal">
      <div
        class="p-4 overflow-y-auto bg-white rounded-lg max-h-[40rem] sm:w-1/2"
      >
        <div class="flex items-center justify-end space-x-2">
          <button @click="toggleEditModal">
            <svg
              class="feather feather-edit"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              />
              <path
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              />
            </svg>
          </button>
        </div>
        <!-- Content of All internship detail div -->
        <h1>Title: {{ internship.title }}</h1>
        <h2>Company: {{ internship.company }}</h2>
        <h3>Position: {{ internship.position }}</h3>
        <p>
          Location: {{ internship.jobLocation.road }},
          {{ internship.jobLocation.subDistrict }},
          {{ internship.jobLocation.province }},
          {{ internship.jobLocation.country }}
        </p>
        <p>Skills Needed: {{ internship.skillNeededList }}</p>
        <p>Requirements: {{ internship.jobRequirement }}</p>
        <p>Job Benefits: {{ internship.jobBenefits }}</p>
        <p>Salary: {{ internship.salary }}</p>
        <p>Work Type: {{ internship.workType }}</p>
        <p>
          Link:
          <a
            :href="internship.link"
            target="_blank"
            class="text-blue-400 hover:text-blue-600"
            >{{ internship.link }}</a
          >
        </p>
        <p>Job Description: {{ internship.description }}</p>

        <!-- Close button -->
        <button
          @click="closeModal"
          class="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
    <EditInternshipModal
      :show="showEditModal"
      :internship="props.internship"
      @editInternship="handleEditInternship"
      @cancel="handleCancelModal"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import EditInternshipModal from "./EditInternshipModal.vue";
import { internshipsStore } from "../../services/internships.js";

const internshipsService  = internshipsStore();
const emit = defineEmits(["close", "editInternship"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  internship: {
    type: Object,
  },
});
const showModal = ref(props.show);
const showEditModal = ref(false);

const toggleEditModal = () => {
  showEditModal.value = !showEditModal.value;
  showModal.value = false;
  // Emit an event to inform the parent component that the modal is closed
  emit("close");
};

const handleEditInternship = (internship) => {
  showEditModal.value = false;
  showModal.value = false;
  emit("editInternship", internship);
};

const handleCancelModal = () => {
  showEditModal.value = false;
};

watch(
  () => props.show,
  (value) => {
    showModal.value = value;
  }
);

const closeModal = () => {
  showModal.value = false;
  // Emit an event to inform the parent component that the modal is closed
  emit("close");
};
</script>
