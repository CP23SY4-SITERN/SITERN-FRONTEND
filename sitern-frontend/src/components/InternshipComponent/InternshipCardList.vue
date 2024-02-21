<template>
  <div>
    <div class="flex items-center justify-between">
      <InternshipSearchbox @search="handleSearch" />
      <IntershipFilter />
    </div>
    <!-- Main delete modal -->
    <div
      ref="deleteModal"
      id="deleteModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center hidden w-full h-full"
    >
      <!-- Backdrop overlay -->
      <div
        class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50"
        @click="hideDeleteModal"
      ></div>
      <div class="relative max-w-md p-4 md:h-auto">
        <!-- Modal content -->
        <div
          class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
        >
          <button
            type="button"
            class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
            @click="hideDeleteModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <svg
            class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this item?
          </p>
          <div class="flex items-center justify-center space-x-4">
            <button
              data-modal-toggle="deleteModal"
              type="button"
              @click="hideDeleteModal"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              type="submit"
              @click="confirmDelete"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <EditInternshipModal :show="showEditModal" :internship="selectedInternship" @editInternship="handleEditInternship" @cancel="handleCancelModal" /> -->
    <div
      v-if="filteredInternships.length > 0"
      class="grid grid-cols-3 grid-rows-2 gap-4"
    >
      <div v-for="internship in filteredInternships" class="interncard">
        <!-- Favorite Icon -->
        <button class="favorite-icon" @click="toggleFavorite(internship)">
          <!-- Add your favorite icon here -->
          <span>&#9733;</span>
        </button>

        <!-- Internship card info -->
        <div class="relative mt-6 mb-12 group">
          <div class="internship-details group-hover:opacity-25">
            <h1>Title: {{ internship.title }}</h1>
            <h2>Company: {{ internship.company }}</h2>
            <h3>Position: {{ internship.position }}</h3>
            <p>Location: {{ internship.jobLocation.country }}</p>
            <p>Skills Needed: {{ internship.skillNeededList }}</p>
            <p>Requirements: {{ internship.jobRequirement }}</p>
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
          </div>
          <div
            class="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 bg-gray-800 opacity-0 group-hover:opacity-50"
            @click="selectAndShowInternshipDetailModal(internship)"
          >
            <p>More details</p>
          </div>
        </div>
        <InternshipDetailModal
          :show="showInternshipDetail"
          :internship="selectedInternship"
          @close="closeInternshipDetailModal"
          @editInternship="handleEditInternship"
        />
        <DeleteButton class="right-20 bottom-2.5" @click="deleteInternship(internship.id)"
        v-show="loginService.loginUser.role === 'STAFF'"/>
        <!-- Apply Button -->
        <button class="apply-button" @click="applyToInternship(internship)">
          Apply
        </button>
      </div>
    </div>
    <div v-else class="grid grid-cols-3 grid-rows-2 gap-4">
      <div><h1 class="mb-4 text-3xl font-bold">No Internships Found</h1></div>
    </div>
    <div class="flex justify-end my-4 mr-4">
      <button
        class="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
      >
        Prev
      </button>
      <button
        class="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import InternshipSearchbox from "./InternshipSearchbox.vue";
import IntershipFilter from "./InternshipFilter.vue";
import InternshipDetailModal from "./InternshipDetailModal.vue";
import DeleteButton from "../ButtonComponent/DeleteButton.vue";
import { loginStore } from "../../services/loginData";

const emit = defineEmits(["editInternship", "deleteInternship", "cancel"]);
const props = defineProps({
  internships: {
    type: Array,
    default: [],
  },
});

const loginService = loginStore();
const searchValue = ref("");
let internshipIdToDelete = ref(null);
const selectedInternship = ref({});
const showInternshipDetail = ref(false);
const deleteModal = ref(null);
const router = useRouter();
const selectInternship = (internship) => {
  selectedInternship.value = internship;
};

const selectAndShowInternshipDetailModal = (internship) => {
  selectInternship(internship);
  showInternshipDetailModal();
};

const showInternshipDetailModal = () => {
  showInternshipDetail.value = true;
};

const closeInternshipDetailModal = () => {
  showInternshipDetail.value = false;
};

const myInternships = computed(() => {
  return props.internships.map((element) => ({
    id: element.id,
    title: element.title,
    company: element.companyName, // Updated to use companyName
    position: element.position,
    description: element.jobDescription, // Updated to use jobDescription
    link: element.link,
    jobLocation: element.jobLocation, // Updated to include jobLocation
    skillNeededList: element.skillNeededList,
    jobBenefits: element.jobBenefits,
    jobRequirement: element.jobRequirement,
    salary: element.salary,
    workType: element.workType,
    isFavorite: ref(false),
  }));
});

const filteredInternships = computed(() => {
  const searchQuery = router.currentRoute.value.meta.searchQuery || "";
  return myInternships.value.filter(
    (internship) =>
      internship.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      internship.company
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      internship.position
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
});

const deleteInternship = (id) => {
  internshipIdToDelete = id;
  deleteModal.value.classList.remove("hidden");
};

const handleSearch = (value) => {
  searchValue.value = value;
};

const hideDeleteModal = () => {
  // Hide the delete modal
  deleteModal.value.classList.add("hidden");
};

const handleEditInternship = (internship) => {
  emit("editInternship", internship);
};

const confirmDelete = () => {
  // You can pass the id to your modal for further processing
  emit("deleteInternship", internshipIdToDelete);
  // Hide the delete modal
  hideDeleteModal();
};

const toggleFavorite = (internship) => {
  internship.isFavorite = !internship.isFavorite;
};

const applyToInternship = (internship) => {
  // Add logic for applying to the internship
  loginService.showAlert(`Applied to ${internship.title}`, "success");
};

// Watch for changes in searchValue
watch(searchValue, (newSearchValue) => {
  // Check if the route is 'Internships'
  if (router.currentRoute.value.name === 'Internships') {
    // Perform the search with the new search value
    handleSearch(newSearchValue);
  }
});

onBeforeRouteUpdate((to, from, next) => {
  // Reset the search value when navigating to a different route
  
  next();
});

</script>

<style>
/* Add your custom styles here */

.favorite-icon,
.apply-button,
.delete-button {
  z-index: 1; /* Set a lower z-index */
}

.interncard {
  @apply border-2 relative m-2.5 p-2.5 rounded-[15px] border-solid border-[black];
  /* Add this to position the buttons inside the card */
}

.favorite-icon {
  @apply absolute cursor-pointer right-2.5 top-2.5;
}

.apply-button {
  @apply absolute bg-blue-500 text-white cursor-pointer px-2.5 py-[5px] rounded-[3px] border-[none] right-2.5 bottom-2.5;
}
.delete-button {
  @apply absolute bg-red-500 text-white cursor-pointer px-2.5 py-[5px] rounded-[3px] border-[none] right-20 bottom-2.5;
}
.internship-details {
  @apply flex flex-col gap-1.5;
}
</style>
