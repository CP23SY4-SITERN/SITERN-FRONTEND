<template>
  <nav class="flex items-center justify-between flex-wrap p-6 bg-white">
    <div class="flex items-center flex-shrink-0 ml-6 mr-20">
      <router-link to="/" class="font-semibold text-4xl tracking-tight">
        SITern
      </router-link>
    </div>
    <div class="navigator text-sm lg:flex-grow">
      <router-link
        to="/Internships"
        class="block mt-4 lg:inline-block lg:mt-0 hover:font-semibold ml-20 link"
      >
        Intern Search
      </router-link>
      <router-link
        to="/Profile"
        class="block mt-4 lg:inline-block lg:mt-0 hover:font-semibold ml-20 link"
      >
        Profile
      </router-link>
      <router-link
        to="/Status"
        class="block mt-4 lg:inline-block lg:mt-0 hover:font-semibold ml-20 link"
      >
        Status
      </router-link>
      <router-link
        to="/Dashboard"
        class="block mt-4 lg:inline-block lg:mt-0 hover:font-semibold ml-20 link"
      >
        Dashboard
      </router-link>
    </div>
    <div>
      <router-link
        to="/Login"
        class="inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-500 hover:bg-blue-600"
      >
        Log in
      </router-link>
      <router-link
        to="/Register"
        class="inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-500 hover:bg-blue-600 ml-4"
      >
        Register
      </router-link>
    </div>
  </nav>
</template>

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
