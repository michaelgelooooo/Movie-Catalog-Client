<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { Notyf } from "notyf";
import { useGlobalStore } from "../stores/global";
import api from "../api";
import MovieComments from "../components/MovieComments.vue";

const { user } = useGlobalStore();

const route = useRoute();
const notyf = new Notyf();

const movie = ref(null);
const isLoading = ref(false);

async function getMovieDetails() {
	isLoading.value = true;

	try {
		const { data } = await api.get(`/movies/getMovie/${route.params.id}`);

		movie.value = data;
	} catch (error) {
		console.error("Get Movie Details Error:", error);

		notyf.error("Unable to retrieve movie details.");
	} finally {
		isLoading.value = false;
	}
}

onBeforeMount(() => {
	getMovieDetails();
});
</script>

<template>
	<section id="movie-details">
		<div class="container py-5">
			<div v-if="isLoading" class="text-center py-5">
				<div class="spinner-border text-primary"></div>
				<p class="text-secondary mt-2 mb-0">Loading movie details...</p>
			</div>

			<div v-else-if="movie">
				<div class="mb-4">
					<router-link :to="{ name: 'Movies' }" class="text-secondary text-decoration-none">
						<i class="bi bi-arrow-left me-2"></i>
						Back to Movie Catalog
					</router-link>
				</div>

				<div class="card border-0 shadow-sm rounded-4">
					<div class="card-body p-4 p-md-5">
						<div class="mb-4">
							<span class="badge bg-primary px-3 py-2 mb-3">
								{{ movie.genre }}
							</span>

							<h1 class="display-5 fw-bold mb-2">
								{{ movie.title }}
							</h1>

							<p class="text-secondary mb-0">
								<i class="bi bi-calendar3 me-2"></i>
								{{ movie.year }}
								<span class="mx-2">|</span>
								<i class="bi bi-camera-reels me-2"></i>
								Directed by {{ movie.director }}
							</p>
						</div>

						<hr />

						<div class="mb-5">
							<h4 class="fw-bold mb-3">ABOUT THE FILM</h4>

							<p class="text-secondary lh-lg mb-0">
								{{ movie.description }}
							</p>
						</div>

						<div v-if="user.email">
							<MovieComments :movie-id="movie._id" />
						</div>

						<div v-else class="text-center py-4">
							<i class="bi bi-lock display-5 text-secondary"></i>

							<h5 class="fw-bold mt-3">Join the Conversation</h5>

							<p class="text-secondary mb-3">Log in to view and share your thoughts about this movie.</p>

							<router-link :to="{ name: 'Login' }" class="btn btn-primary">
								<i class="bi bi-box-arrow-in-right me-2"></i>
								Log In
							</router-link>
						</div>
					</div>
				</div>
			</div>

			<div v-else class="text-center py-5">
				<i class="bi bi-film display-3 text-secondary"></i>

				<h4 class="fw-bold mt-3">Movie Not Found</h4>

				<p class="text-secondary">We couldn't find the movie you're looking for.</p>

				<router-link :to="{ name: 'Movies' }" class="btn btn-primary"> Back to Movie Catalog </router-link>
			</div>
		</div>
	</section>
</template>
