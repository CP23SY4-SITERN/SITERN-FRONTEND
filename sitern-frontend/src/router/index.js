import { createRouter, createWebHistory } from "vue-router";

const history = createWebHistory();
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Homepage.vue"),
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
    },
    {
        path: "/internships",
        name: "Internships",
        component: () => import("../views/Internships.vue"),
    },
    {
        path: "/status",
        name: "Status",
        component: () => import("../views/Status.vue"),
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/Profile.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/:catchNotMatchPath(.*)",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
    },
]

const router = createRouter({ history, routes });
export default router;