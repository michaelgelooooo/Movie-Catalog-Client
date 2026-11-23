<script setup>
import { ref, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import { useGlobalStore } from "../stores/global";
import api from "../api";

import MovieCatalog from "../components/MovieCatalog.vue";
import MovieDashboard from "../components/MovieDashboard.vue";

const notyf = new Notyf();
const { user } = useGlobalStore();

const movies = ref([]);
const isLoading = ref(false);

async function getMovies() {
	isLoading.value = true;

	try {
		const { data } = await api.get("/movies/getMovies");

		movies.value = data.movies;
	} catch (error) {
		console.error("Get Movies Error:", error);

		notyf.error("Unable to retrieve movies.");
	} finally {
		isLoading.value = false;
	}
}

onBeforeMount(async () => {
	await getMovies();
});
</script>

<template>
	<section id="movies">
		<div class="container py-5">
			<div v-if="isLoading" class="text-center py-5">
				<div class="spinner-border text-primary"></div>
				<p class="text-secondary mt-2 mb-0">Loading films...</p>
			</div>

			<div v-else-if="movies.length === 0" class="text-center py-5">
				<i class="bi bi-film display-4 text-secondary"></i>

				<h5 class="fw-bold mt-3">
					{{ user.isAdmin ? "No Movies Yet" : "No Movies Available" }}
				</h5>

				<p class="text-secondary mb-0">
					{{ user.isAdmin ? "Start building your catalog by adding a movie." : "Check back later for new additions to our catalog." }}
				</p>
			</div>

			<MovieDashboard
    v-else-if="user.isAdmin"
    :movies="movies"
    @movie-deleted="(movieId) => {
        movies = movies.filter(movie => movie._id !== movieId)
    }"
/>

			<MovieCatalog v-else :movies="movies" />
		</div>
	</section>
</template>
