<template>
  <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">SITern</span>
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0V15z" />
        </svg>
      </button>
    </div>
    <div class="text-sm lg:flex-grow">
      <a
        href="#"
        class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
      >
        Intern Search
      </a>
      <a
        href="#"
        class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
      >
        Profile
      </a>
      <a
        href="#"
        class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white ml-4"
      >
        Status
      </a>
      <a
        href="#"
        class="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white ml-4"
      >
        Dashboard
      </a>
    </div>
    <div>
      <a
        href="#"
        class="inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-500 hover:bg-blue-600"
      >
        Log in
      </a>
      <a
        href="#"
        class="inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-500 hover:bg-blue-600 ml-4"
      >
        Register
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style scoped>
.nav-link {
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.25s ease-in-out;
}

.nav-link:hover {
  color: #fff;
}

.slide-enter-active {
  transition: transform 0.3s ease-in-out;
}

.slide-leave-active {
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
