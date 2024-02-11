<!-- DeleteButton.vue -->
<template>
  <button :class="thisClasses" @click="handleDelete">Delete</button>
</template>

<script setup>
const emit = defineEmits(["delete"]);
const props = defineProps(["itemToDelete"]);

const handleDelete = () => {
  emit("delete", props.itemToDelete);
};

const thisClasses =
  "absolute bg-red-500 text-white cursor-pointer px-2.5 py-[5px] rounded-[3px] border-[none] z-10";
</script>
