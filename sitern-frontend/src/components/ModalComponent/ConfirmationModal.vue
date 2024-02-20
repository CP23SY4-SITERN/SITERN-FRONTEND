<template>
  <UniversalModal
    :class="['confirmation-modal', showConfirmModal ? 'no-transition' : '']"
    :isOpen="showConfirmModal"
    @close="showConfirmModal = false;loginService.confirmState.isOpen = false;"
  >
    <p class="m-5 text-white">{{ props.confirmText }}</p>

    <slot name="footer">
      <div class="flex items-center justify-center space-x-4">
        <button
          data-modal-toggle="deleteModal"
          type="button"
          @click="
            showConfirmModal = false;
            loginService.confirmState.isOpen = false;
          "
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
    </slot>
  </UniversalModal>
</template>

<script setup>
import UniversalModal from "../ModalComponent/UniversalModal.vue";
import { ref, computed } from "vue";
import { loginStore } from "../../services/loginData";

const props = defineProps({
  showConfirmModal: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "Are you sure?",
  },
});

const loginService = loginStore();
const modalClasses = computed(
  () =>
    "fixed top-0 left-0 right-0 z-50 items-center justify-center w-full h-full transition-none"
);

const emit = defineEmits(["confirm"]);

function confirmDelete() {
  emit("confirm"); // Emit event for parent component to handle deletion logic
  // You might not even need to manage 'showConfirmModal' here based on how parent uses it
}
</script>

<style>
/* In ConfirmationModal.vue or your relevant stylesheet */
.confirmation-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
}

.confirmation-modal .no-transition {
  transition: none;
}
</style>
