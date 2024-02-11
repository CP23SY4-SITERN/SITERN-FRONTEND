<!-- RegisterButton.vue -->
<template>
    <button @click="handleRegister" :class="thisClass">
        Register
    </button>
</template>

<script setup>
const emit = defineEmits(["search"]);

const handleRegister = () => {
    emit("search");
};
const thisClass = "inline-block px-4 py-2 ml-4 text-sm leading-none text-white bg-blue-500 rounded hover:bg-blue-600";
</script>
