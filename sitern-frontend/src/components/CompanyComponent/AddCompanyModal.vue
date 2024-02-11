<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
  >
    <div class="p-8 overflow-y-auto bg-white rounded-lg max-h-[50rem] sm:w-1/2">
      <div class="flex items-center justify-end space-x-2">
        <button @click="(show = false), $emit('cancel', 'showAddCompanyModal')">
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
      <h2 class="mb-4 text-xl font-bold">
        {{
          currentPage === 1 ? "Add Company - Page 1" : "Add Company - Page 2"
        }}
      </h2>

      <form v-if="currentPage === 1" @submit.prevent="submitFormPage1">
        <div class="flex flex-col mb-4">
          <label for="name" class="mb-2 text-sm font-medium"
            >Company Name:</label
          >
          <input
            type="text"
            id="name"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="company.companyName"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="description" class="mb-2 text-sm font-medium"
            >Company Description:</label
          >
          <input
            type="text"
            id="description"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="company.companyDescription"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="website" class="mb-2 text-sm font-medium">Website:</label>
          <input
            type="url"
            id="website"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="company.companyWebsite"
          />
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            class="mr-2 text-sm font-medium text-gray-500 hover:underline"
            @click="(show = false), $emit('cancel', 'showAddCompanyModal')"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="currentPage++"
            class="px-4 py-2 font-medium text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </form>

      <form v-else @submit.prevent="submitFormPage2">
        <div class="flex flex-col mb-4">
          <label class="mb-2 font-bold text-md">Company Information</label>
          <div class="flex flex-col mb-4">
            <label for="road" class="mb-2 text-sm font-medium">Road:</label>
            <input
              type="text"
              id="road"
              class="p-2 rounded-md shadow-sm focus:outline-none"
              v-model="company.companyLocation.road"
              required
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="subDistrict" class="mb-2 text-sm font-medium"
              >Sub District:</label
            >
            <input
              type="text"
              id="subDistrict"
              class="p-2 rounded-md shadow-sm focus:outline-none"
              v-model="company.companyLocation.subDistrict"
              required
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="province" class="mb-2 text-sm font-medium"
              >Province:</label
            >
            <input
              type="text"
              id="province"
              class="p-2 rounded-md shadow-sm focus:outline-none"
              v-model="company.companyLocation.province"
              required
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="country" class="mb-2 text-sm font-medium"
              >Country:</label
            >
            <input
              type="text"
              id="country"
              class="p-2 rounded-md shadow-sm focus:outline-none"
              v-model="company.companyLocation.country"
              required
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="zipcode" class="mb-2 text-sm font-medium"
              >Zipcode:</label
            >
            <input
              type="text"
              id="zipcode"
              class="p-2 rounded-md shadow-sm focus:outline-none"
              v-model="company.companyLocation.zipcode"
              required
            />
          </div>
        </div>
        <div class="flex flex-col mb-4">
          <label for="employees" class="mb-2 text-sm font-medium"
            >Number of employees:</label
          >
          <input
            type="number"
            id="employees"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="company.companyEmployee"
            required
          />
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            class="mr-2 text-sm font-medium text-gray-500 hover:underline"
            @click="currentPage--"
          >
            Back
          </button>
          <button
            type="submit"
            class="px-4 py-2 font-medium text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
          >
            Add Company
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["addCompany", "cancel"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const totalPages = ref(2);
const currentPage = ref(1);
const company = ref({
  companyName: "",
  companyDescription: "",
  companyWebsite: "",
  companyLocation: {
    road: "",
    subDistrict: "",
    province: "",
    country: "",
    zipcode: "",
  },
  companyEmployee: 0,
});

const submitFormPage1 = () => {
  // Handle form submission logic for Page 1
  console.log("Page 1 submitted successfully!");
  currentPage.value++;
};

const submitFormPage2 = () => {
  // Handle form submission logic for Page 2
  if (validateForm()) {
    const companyDTO = {
      companyName: company.value.companyName,
      companyDescription: company.value.companyDescription,
      companyWebsite: company.value.companyWebsite,
      companyLocation: `${company.value.companyLocation.road}, ${company.value.companyLocation.subDistrict}, ${company.value.companyLocation.province}, ${company.value.companyLocation.country}, ${company.value.companyLocation.zipcode}`,
      companyEmployee: company.value.companyEmployee,
    };
    emit("addCompany", companyDTO);
    resetForm();
  } else {
    alert("Please fill in all required fields.");
  }
};

const resetForm = () => {
  company.value = {
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    companyLocation: {
      road: "",
      subDistrict: "",
      province: "",
      country: "",
      zipcode: "",
    },
    companyEmployee: 0,
  };
};

const validateForm = () => {
  // Add validation logic for Page 2 fields
  // For example: Check if required fields are filled
  return (
    company.value.companyName.trim().length > 0 &&
    company.value.companyDescription.trim().length > 0 &&
    company.value.companyLocation.road.trim().length > 0 &&
    company.value.companyLocation.subDistrict.trim().length > 0 &&
    company.value.companyLocation.province.trim().length > 0 &&
    company.value.companyLocation.country.trim().length > 0 &&
    company.value.companyLocation.zipcode.trim().length > 0 &&
    company.value.companyEmployee > 0
  );
};
</script>
