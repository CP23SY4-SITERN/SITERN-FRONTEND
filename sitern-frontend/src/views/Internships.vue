<template>
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-4">Internships</h1>
  
      <ul class="flex flex-col gap-4">
        <InternshipCard v-for="internship in internships" :key="internship.id" :internship="internship" />
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineComponent } from 'vue';
  import { internshipsStore } from '../services/internships';
  import InternshipCard from '../components/InternshipComponent/InternshipCard.vue';
  
  const internships = internshipsStore.internships;
  </script>