<template>
  <div>
    <button @click="handleAlert">Show Alert</button>
    <AlertModal :showAlert="showAlert" :alertText="'Login Successful'" /> 
  </div>
</template>

<script setup>
import AlertModal from "../components/ModalComponent/AlertModal.vue";
import { ref } from "vue";

const showAlert = ref(false);

const handleAlert = () => {
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
};

</script>

