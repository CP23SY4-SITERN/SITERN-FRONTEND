<template>
  <div class="searchbox flex items-center justify-center w-full">
    <input
      type="text"
      placeholder="Find your position or your desired company"
      class="rounded-md border-gray-300 focus:border-blue-500 py-2 px-3 w-full"
    />
    <button type="submit" class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-md">
      Search
    </button>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';

defineComponent({
  name: 'Searchbox',
});
</script>

<style scoped>
.searchbox {
  display: flex;
  align-items: center;
  width: 50%;
}

.searchbox input {
  flex: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.searchbox button {
  margin: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: #ffffff;
  width: 80px;
  border-radius: 5px;
}
</style>
