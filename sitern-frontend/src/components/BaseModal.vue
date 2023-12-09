<template>
    <div class="absolute top-0 left-0 flex justify-center w-full h-full px-8 bg-black bg-opacity-30">
      <div class="self-start max-w-screen-md p-4 mt-32 bg-white">
        <slot />
        <button class="px-4 py-2 mt-8 text-white bg-blue-500 rounded-md">Close</button>
      </div>
    </div>
</template>
<script setup>
</script>

<style scoped></style>