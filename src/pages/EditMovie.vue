<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import { useRoute, useRouter } from "vue-router";
import api from "../api";

const notyf = new Notyf();
const route = useRoute();
const router = useRouter();

const title = ref("");
const director = ref("");
const year = ref("");
const description = ref("");
const genre = ref("");

const isEnabled = ref(false);
const isLoading = ref(false);
const isSubmitting = ref(false);

watch([title, director, year, description, genre], (currentValue) => {
	isEnabled.value = currentValue.every((input) => input.toString().trim() !== "") && Number(year.value) > 0;
});

async function getMovieDetails() {
	isLoading.value = true;

	try {
		const { data } = await api.get(`/movies/getMovie/${route.params.id}`);

		title.value = data.title;
		director.value = data.director;
		year.value = data.year;
		description.value = data.description;
		genre.value = data.genre;
	} catch (error) {
		console.error("Get Movie Details Error:", error);
		notyf.error("Unable to retrieve movie details.");
	} finally {
		isLoading.value = false;
	}
}

async function editMovie() {
	isSubmitting.value = true;

	try {
		await api.patch(`/movies/updateMovie/${route.params.id}`, {
			title: title.value,
			director: director.value,
			year: Number(year.value),
			description: description.value,
			genre: genre.value,
		});

		notyf.success("Movie updated successfully!");
	} catch (error) {
		console.error("Edit Movie Error:", error);

		notyf.error(error.response?.data?.error?.message || error.response?.data?.error || "Unable to update movie. Please try again.");

		isSubmitting.value = false;
		return;
	}

	isSubmitting.value = false;
	router.push({ name: "Movies" });
}

onBeforeMount(() => {
	getMovieDetails();
});
</script>

<template>
	<section id="edit-movie">
		<div class="container py-5">
			<div v-if="isLoading" class="text-center py-5">
				<div class="spinner-border text-primary"></div>
				<p class="text-secondary mt-2 mb-0">Loading movie details...</p>
			</div>

			<div v-else>
				<div class="mb-4">
					<router-link :to="{ name: 'Movies' }" class="text-secondary text-decoration-none">
						<i class="bi bi-arrow-left me-2"></i>
						Back to Movies
					</router-link>
				</div>

				<div class="row justify-content-center">
					<div class="col-lg-8">
						<div class="card border-0 shadow-sm rounded-4">
							<div class="card-body p-4 p-md-5">
								<div class="mb-4">
									<h2 class="fw-bold mb-1">EDIT MOVIE</h2>
									<p class="text-secondary mb-0">Update the details of this film.</p>
								</div>

								<form @submit.prevent="editMovie">
									<div class="mb-3">
										<label class="form-label fw-semibold"> Movie Title </label>
										<input type="text" class="form-control" v-model="title" placeholder="Enter movie title" required />
									</div>

									<div class="mb-3">
										<label class="form-label fw-semibold"> Director </label>
										<input type="text" class="form-control" v-model="director" placeholder="Enter director" required />
									</div>

									<div class="mb-3">
										<label class="form-label fw-semibold"> Release Year </label>
										<input type="number" class="form-control" v-model="year" placeholder="Enter release year" min="1" required />
									</div>

									<div class="mb-3">
										<label class="form-label fw-semibold"> Genre </label>
										<input type="text" class="form-control" v-model="genre" placeholder="Enter movie genre" required />
									</div>

									<div class="mb-4">
										<label class="form-label fw-semibold"> Description </label>
										<textarea class="form-control" v-model="description" rows="5" placeholder="Enter movie description" required></textarea>
									</div>

									<div class="d-flex justify-content-end gap-2">
										<router-link :to="{ name: 'Movies' }" class="btn btn-outline-secondary"> Cancel </router-link>

										<button type="submit" class="btn btn-primary" :disabled="!isEnabled || isSubmitting">
											<span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>

											{{ isSubmitting ? "Updating Movie..." : "Save Changes" }}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
