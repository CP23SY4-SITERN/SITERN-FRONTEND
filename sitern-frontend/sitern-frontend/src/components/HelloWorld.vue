<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
    <title>SITern</title>
</head>
<body class="bg-gray-100">
    <header class="bg-blue-600 text-white p-4">
        <h1 class="text-center">SITern</h1>
    </header>
    <nav class="bg-gray-200 p-4">
        <ul class="flex space-x-4">
            <li><a href="#" class="hover:text-blue-600">Home</a></li>
            <li><a href="#" class="hover:text-blue-600">Intern Search</a></li>
            <li><a href="#" class="hover:text-blue-600">Profile</a></li>
            <li><a href="#" class="hover:text-blue-600">Latest Post</a></li>
            <li><a href="#" class="hover:text-blue-600">Dashboard</a></li>
            <li><a href="#" class="hover:text-blue-600">Find internship</a></li>
            <li><a href="#" class="hover:text-blue-600">Login</a></li>
            <li><a href="#" class="hover:text-blue-600">Register</a></li>
        </ul>
    </nav>
    <main class="p-4">
        <h2 class="text-2xl font-semibold mb-2">Status Dashboard</h2>
        <div class="bg-white p-4 rounded-md shadow-sm">
 <div class="relative">
    <input type="text" placeholder="Search" class="bg-white text-gray-900 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
    <button class="absolute top-0 right-0 mt-2 mr-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700">
      Find Internship
    </button>
 </div>
</div>
    </main>
    <footer class="bg-blue-600 text-white p-4">
        <p>&copy; 2022 SITern. All rights reserved.</p>
    </footer>
</body>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
