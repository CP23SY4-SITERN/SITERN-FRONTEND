<!-- LoginButton.vue -->
<template>
  <button @click="handleLogout" :class="thisClasses">Logout</button>
</template>

<script setup>

const emit = defineEmits(["logout"]);

const handleLogout = () => {
  emit("logout");
};

const thisClasses =
  "inline-block px-4 py-2 text-sm leading-none text-white bg-blue-500 rounded hover:bg-blue-600";
</script>
