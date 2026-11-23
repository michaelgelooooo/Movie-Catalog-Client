import 'bootswatch/dist/lumen/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "notyf/notyf.min.css";
import "./style.css"

import { createRouter, createWebHistory } from "vue-router";
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue';

import Home from "./pages/Home.vue";
import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";
import Logout from "./pages/Logout.vue";
import Movies from "./pages/Movies.vue";
import MovieDetails from './pages/MovieDetails.vue';
import AddMovie from "./pages/AddMovie.vue";
import EditMovie from './pages/EditMovie.vue';
import ErrorPage from "./pages/ErrorPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/logout",
            name: "Logout",
            component: Logout,
        },
        {
            path: "/movies",
            name: "Movies",
            component: Movies,
        },
        {
            path: "/movies/details/:id",
            name: "Movie Details",
            component: MovieDetails,
        },
        {
            path: "/movies/addMovie",
            name: "Add Movie",
            component: AddMovie,
        },
        {
            path: "/movies/editMovie/:id",
            name: "Edit Movie",
            component: EditMovie,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "Not Found",
            component: ErrorPage,
        }
    ]
});

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.mount('#app');
