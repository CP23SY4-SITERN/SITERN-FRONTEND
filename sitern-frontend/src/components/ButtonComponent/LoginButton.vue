<!-- LoginButton.vue -->
<template>
  <button @click="handleLogin" :class="thisClasses">Login</button>
</template>

<script setup>
const emit = defineEmits(["login"]);
const props = defineProps(["logincresdentials"]);

const handleLogin = () => {
  emit("login", props.logincresdentials);
};

const thisClasses =
  "inline-block px-4 py-2 text-sm leading-none text-white bg-blue-500 rounded hover:bg-blue-600";
</script>
