<template>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
  >
    <div class="p-4 overflow-y-auto bg-white rounded-lg max-h-[40rem] sm:w-1/2">
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
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["close"]);
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
