<template>
  <div id="alertModal" :class="modalClasses">
    <UniversalModal :isOpen="props.showAlert" @close="showAlert = false">
      <template v-slot:header> <h2>Success</h2> </template>
      <span class="flex items-center inline m-5 text-green-500">
        <svg
            class="mr-2"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="24"
          height="24"
          viewBox="0 0 256 256"
          xml:space="preserve"
        >
          <defs></defs>
          <g
            style="
              stroke: none;
              stroke-width: 0;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 10;
              fill: none;
              fill-rule: nonzero;
              opacity: 1;
            "
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
          >
            <path
              d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z"
              style="
                stroke: none;
                stroke-width: 1;
                stroke-dasharray: none;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke-miterlimit: 10;
                fill: rgb(44, 198, 23);
                fill-rule: nonzero;
                opacity: 1;
              "
              transform=" matrix(1 0 0 1 0 0) "
              stroke-linecap="round"
            />
            <polygon
              points="37.33,69.32 37.33,69.32 37.33,47.17 37.33,47.17 66.85,33.97 77.93,45.05 "
              style="
                stroke: none;
                stroke-width: 1;
                stroke-dasharray: none;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke-miterlimit: 10;
                fill: rgb(36, 173, 21);
                fill-rule: nonzero;
                opacity: 1;
              "
              transform="  matrix(1 0 0 1 0 0) "
            />
            <polygon
              points="37.33,69.32 15.14,47.13 26.22,36.05 37.33,47.17 63.78,20.68 74.86,31.75 "
              style="
                stroke: none;
                stroke-width: 1;
                stroke-dasharray: none;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke-miterlimit: 10;
                fill: rgb(255, 255, 255);
                fill-rule: nonzero;
                opacity: 1;
              "
              transform="matrix(1 0 0 1 0 0)"
            />
          </g>
        </svg>
        <span>{{ props.alertText }}</span>
      </span>
    </UniversalModal>
  </div>
</template>

<script setup>
import UniversalModal from "../ModalComponent/UniversalModal.vue";
import { ref, computed } from "vue";

const props = defineProps({
  showAlert: {
    type: Boolean,
    default: false,
  },
  alertText: {
    type: String,
    default: "Notification text",
  },
});

const modalClasses = computed(() => [
  "fixed",
  "top-5",
  "right-5",
  "z-50",
  "animate-fade-in-out",
]);
</script>

<style>
/* AlertModal.vue or your main stylesheet */
#alertModal {
  position: fixed;
  top: 5px;
  right: 5px;
  z-index: 60; /* Higher z-index than UniversalModal */
}

.animate-fade-in-out {
  animation: fade-in-out 5s ease-in-out;
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
