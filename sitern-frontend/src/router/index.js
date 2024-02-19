// Import necessary dependencies
import { createRouter, createWebHistory } from "vue-router";

// Import your components
import Homepage from "../views/Homepage.vue";
import Dashboard from "../views/Dashboard.vue";
import Internships from "../views/Internships.vue";
import Status from "../views/Status.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";

// Create router history
const history = createWebHistory("/sy4/");

// Define routes
const routes = [
  {
    path: "/",
    name: "home",
    component: Homepage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/internships",
    name: "internships",
    component: Internships,
  },
  {
    path: "/status",
    name: "status",
    component: Status,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/:catchNotMatchPath(.*)",
    name: "notfound",
    component: NotFound,
  },
];

// Create router instance
const router = createRouter({
  history,
  routes,
});

// // Navigation guard to handle search query
// router.beforeEach((to, from, next) => {
//   // Check if the route has a search query parameter
//   if (to.query.search) {
//     // If so, set it in the route's meta field
//     to.meta.searchQuery = to.query.search;
//   }

//   // Continue with the navigation
//   next();
// });

// Export the router
export default router;
