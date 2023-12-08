<template>
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-4">Internships</h1>
  
      <ul class="flex flex-col gap-4">
        <InternshipCardList :internships="internships" />
      </ul>
    </div>
  </template>
  
  <script setup>
  import { internshipsStore } from '../services/internships';
  import InternshipCardList from '../components/InternshipComponent/InternshipCardList.vue';
  
  const internships = [{ id: 1, title: 'Internship 1', company: 'Company 1', position: 'Position 1', description: 'Description 1', link: 'Link 1' }, { id: 2, title: 'Internship 2', company: 'Company 2', position: 'Position 2', description: 'Description 2', link: 'Link 2' }, { id: 3, title: 'Internship 3', company: 'Company 3', position: 'Position 3', description: 'Description 3', link: 'Link 3'}, { id: 4, title: 'Internship 4', company: 'Company 4', position: 'Position 4', description: 'Description 4', link: 'Link 4' }, { id: 5, title: 'Internship 5', company: 'Company 5', position: 'Position 5', description: 'Description 5', link: 'Link 5'}];
  </script>