import { createRouter, createWebHistory } from "vue-router";

const history = createWebHistory();
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Homepage.vue"),
    },
    {
        path: "/Dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
    },
    {
        path: "/Internships",
        name: "Internships",
        component: () => import("../views/Internships.vue"),
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