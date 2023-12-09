<template>
  <nav class="flex flex-wrap items-center justify-between p-6 bg-white">
    <div class="flex items-center flex-shrink-0 ml-6 mr-20">
      <router-link to="/" class="text-4xl font-semibold tracking-tight">
        SITern
      </router-link>
    </div>
    <div class="text-sm navigator lg:flex-grow">
      <router-link
        to="/Internships"
        class="block mt-4 ml-20 lg:inline-block lg:mt-0 hover:font-semibold link"
      >
        Intern Search
      </router-link>
      <router-link
        to="/Profile"
        class="block mt-4 ml-20 lg:inline-block lg:mt-0 hover:font-semibold link"
      >
        Profile
      </router-link>
      <router-link
        to="/Status"
        class="block mt-4 ml-20 lg:inline-block lg:mt-0 hover:font-semibold link"
      >
        Status
      </router-link>
      <router-link
        to="/Dashboard"
        class="block mt-4 ml-20 lg:inline-block lg:mt-0 hover:font-semibold link"
      >
        Dashboard
      </router-link>
    </div>
    <div>
      <router-link
        to="/Login"
        class="inline-block px-4 py-2 text-sm leading-none text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Log in
      </router-link>
      <router-link
        to="/Register"
        class="inline-block px-4 py-2 ml-4 text-sm leading-none text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Register
      </router-link>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navigator {
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
  text-decoration: none;
  transition: color 0.25s ease-in-out;
}

.link {
  display: inline-block;
  margin-bottom: 8px; /* Adjust the gap below the text */
}

.link:hover,
.link:focus,
.link.active {
  font-weight: 600;
  color: #333333;
  text-decoration: underline; /* Add underline only for hover, focus, and active states */
  margin-bottom: 4px; /* Adjust the gap for the hover, focus, and active states */
}
</style>
