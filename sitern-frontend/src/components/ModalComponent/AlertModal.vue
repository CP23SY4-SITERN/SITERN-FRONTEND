<template>
  <div id="alertModal">
    <UniversalModal :isOpen="props.showAlert" @close="showAlert = false;" :modalClass="modalClasses">
      <template v-slot:header> <h2>Success</h2> </template>
      <div v-if="props.alertType === 'success'">
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
      </div>
      <div v-else-if="props.alertType === 'error'">
        <span class="flex items-center inline m-5 text-red-500">
          <svg
            class="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            height="24"
            width="24"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <path
              style="fill: #ff7855"
              d="M0,256c0,141.384,114.615,256,256,256l22.261-256L256,0C114.615,0,0,114.615,0,256z"
            />
            <path
              style="fill: #ff562b"
              d="M256,0v512c141.384,0,256-114.616,256-256S397.384,0,256,0z"
            />
            <polygon
              style="fill: #ffffff"
              points="161.555,114.333 114.333,161.555 208.778,256 114.333,350.445 161.555,397.667 256,303.222   278.261,256 256,208.778 "
            />
            <polygon
              style="fill: #ffeac3"
              points="397.667,161.555 350.445,114.333 256,208.778 256,303.222 350.445,397.667 397.667,350.445   303.222,256 "
            />
          </svg>
          <span>{{ props.alertText }}</span>
        </span>
      </div>
      <div v-else-if="props.alertType === 'warning'">
        <span class="flex items-center inline m-5 text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24"
            height="24"
            viewBox="0 0 128 128"
            aria-hidden="true"
            role="img"
            class="mr-2 iconify iconify--noto"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M57.16 8.42l-52 104c-1.94 4.02-.26 8.85 3.75 10.79c1.08.52 2.25.8 3.45.81h104c4.46-.04 8.05-3.69 8.01-8.15a8.123 8.123 0 0 0-.81-3.45l-52-104a8.067 8.067 0 0 0-14.4 0z"
              fill="#f2a600"
            ></path>
            <path
              d="M53.56 15.72l-48.8 97.4c-1.83 3.77-.25 8.31 3.52 10.14c.99.48 2.08.74 3.18.76h97.5a7.55 7.55 0 0 0 7.48-7.62a7.605 7.605 0 0 0-.78-3.28l-48.7-97.4a7.443 7.443 0 0 0-9.93-3.47a7.484 7.484 0 0 0-3.47 3.47z"
              fill="#ffcc32"
            ></path>
            <g opacity=".2" fill="#424242">
              <path
                d="M64.36 34.02c4.6 0 8.3 3.7 8 8l-3.4 48c-.38 2.54-2.74 4.3-5.28 3.92a4.646 4.646 0 0 1-3.92-3.92l-3.4-48c-.3-4.3 3.4-8 8-8"
              ></path>
              <path
                d="M64.36 98.02c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6s2.69-6 6-6"
              ></path>
            </g>
            <linearGradient
              id="IconifyId17ecdb2904d178eab21432"
              gradientUnits="userSpaceOnUse"
              x1="68"
              y1="-1808.36"
              x2="68"
              y2="-1887.05"
              gradientTransform="matrix(1 0 0 -1 -3.64 -1776.09)"
            >
              <stop offset="0" stop-color="#424242"></stop>

              <stop offset="1" stop-color="#212121"></stop>
            </linearGradient>
            <path
              d="M64.36 34.02c4.6 0 8.3 3.7 8 8l-3.4 48c-.38 2.54-2.74 4.3-5.28 3.92a4.646 4.646 0 0 1-3.92-3.92l-3.4-48c-.3-4.3 3.4-8 8-8z"
              fill="url(#IconifyId17ecdb2904d178eab21432)"
            ></path>
            <linearGradient
              id="IconifyId17ecdb2904d178eab21433"
              gradientUnits="userSpaceOnUse"
              x1="64.36"
              y1="-1808.36"
              x2="64.36"
              y2="-1887.05"
              gradientTransform="matrix(1 0 0 -1 0 -1772.11)"
            >
              <stop offset="0" stop-color="#424242"></stop>
              <stop offset="1" stop-color="#212121"></stop>
            </linearGradient>
            <circle
              cx="64.36"
              cy="104.02"
              r="6"
              fill="url(#IconifyId17ecdb2904d178eab21433)"
            ></circle>
            <path
              d="M53.56 23.02c-1.2 1.5-21.4 41-21.4 41s-1.8 3 .7 4.7c2.3 1.6 4.4-.3 5.3-1.8s19.2-36.9 19.9-38.6c.6-1.87.18-3.91-1.1-5.4c-1.3-1.2-2.6-1-3.4.1z"
              fill="#fff170"
            ></path>
            <circle cx="31.36" cy="75.33" r="3.3" fill="#fff170"></circle>
          </svg>
          <span>{{ props.alertText }}</span>
        </span>
      </div>
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
  alertType: {
    type: String,
    default: "success",
  },
});

const modalClasses = computed(() => 
  'fixed top-5 right-5 z-50 animate-fade-in-out'
);

</script>

<style>
/* AlertModal.vue or your main stylesheet */
#alertModal {
  position: fixed;
  top: 5px;
  right: 5px;
  z-index: 60; /* Higher z-index than UniversalModal */
  background-color: transparent;
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
