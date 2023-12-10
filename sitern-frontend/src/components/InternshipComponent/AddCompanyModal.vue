<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div class="p-8 overflow-y-auto bg-white rounded-lg max-h-[40rem] sm:w-1/2">
      <h2 class="mb-4 text-xl font-bold">Add Company</h2>

      <form>
        <div class="flex flex-col mb-4">
          <label for="name" class="mb-2 text-sm font-medium">Company Name:</label>
          <input
            type="text"
            id="name"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="company.companyName"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="description" class="mb-2 text-sm font-medium">Company Description:</label>
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
        <div class="flex flex-col mb-4">
          <label for="location" class="mb-2 text-sm font-medium">Company Location:</label>
          <input
            type="text"
            id="location"
            class="p-2 rounded-md shadow-sm focus:outline-none"
            v-model="company.companyLocation"
            required
          />
        </div>
        <div class="flex flex-col mb-4">
          <label for="employees" class="mb-2 text-sm font-medium">Number of employees:</label>
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
            @click="show = false, $emit('cancel', 'showAddCompanyModal')"
          >
            Cancel
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
import { ref } from 'vue';

defineEmits(['addCompany', 'cancel']);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const company = ref({
  name: '',
  website: '',
});

const addCompany = () => {
  $emit('addCompany', company.value);
  props.show = false;
  company.value = { name: '', website: '' };
};

</script>
