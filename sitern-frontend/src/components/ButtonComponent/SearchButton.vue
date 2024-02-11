<!-- SearchButton.vue -->
<template>
  <button @click="$emit('click')" :class="thisClass" type="button" data-ripple-light="true">
    Search
  </button>
</template>

<script setup>
const thisClass =
  "!absolute right-1 top-1 z-1 select-none rounded bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none";
</script>
