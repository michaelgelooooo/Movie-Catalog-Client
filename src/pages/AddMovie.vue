<script setup>
import { ref, watch } from "vue";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import api from "../api";

const notyf = new Notyf();
const router = useRouter();

const title = ref("");
const director = ref("");
const year = ref("");
const description = ref("");
const genre = ref("");

const isEnabled = ref(false);
const isSubmitting = ref(false);

watch([title, director, year, description, genre], (currentValue) => {
	isEnabled.value = currentValue.every((input) => input.toString().trim() !== "") && Number(year.value) > 0;
});

async function addMovie() {
	isSubmitting.value = true;

	try {
		await api.post("/movies/addMovie", {
			title: title.value,
			director: director.value,
			year: year.value,
			description: description.value,
			genre: genre.value,
		});

		notyf.success("Movie added successfully!");

		await router.push({ name: "Movies" });
	} catch (error) {
		console.error("Add Movie Error:", error);

		notyf.error(error.response?.data?.error?.message || error.response?.data?.error || "Unable to add movie. Please try again.");
	} finally {
		isSubmitting.value = false;
	}
}
</script>

<template>
	<section id="add-mo">
		<div class="container">
			<div class="row justify-content-center align-items-center py-5">
				<div class="col-md-8 col-lg-5 col-xl-4">
					<div class="card border-0 shadow rounded-4">
						<div class="card-body p-4 p-md-5">
							<div class="text-center mb-4">
								<h2 class="fw-bold text-primary">ADD MOVIE</h2>
							</div>

							<form @submit.prevent="addMovie">
								<div class="mb-3">
									<label for="title" class="form-label fw-semibold"> Movie Title </label>

									<input type="text" id="title" class="form-control form-control-lg" placeholder="Enter movie title" v-model="title" required />
								</div>

								<div class="mb-3">
									<label for="director" class="form-label fw-semibold"> Director </label>

									<input type="text" id="director" class="form-control form-control-lg" placeholder="Enter director's name" v-model="director" required />
								</div>

								<div class="mb-3">
									<label for="year" class="form-label fw-semibold"> Release Year </label>

									<input type="number" id="year" class="form-control form-control-lg" placeholder="Enter release year" v-model="year" min="1" required />
								</div>

								<div class="mb-3">
									<label for="genre" class="form-label fw-semibold"> Genre </label>

									<input type="text" id="genre" class="form-control form-control-lg" placeholder="Enter movie genre" v-model="genre" required />
								</div>

								<div class="mb-4">
									<label for="description" class="form-label fw-semibold"> Description </label>

									<textarea id="description" class="form-control form-control-lg" rows="3" placeholder="Enter movie description" v-model="description" required></textarea>
								</div>

								<button type="submit" class="btn btn-primary btn-lg w-100" :disabled="!isEnabled || isSubmitting">
									<span v-if="isSubmitting">
										<span class="spinner-border spinner-border-sm me-2"></span>
										Adding Movie...
									</span>

									<span v-else>
										<i class="bi bi-plus-lg me-1"></i>
										ADD MOVIE
									</span>
								</button>
							</form>

							<div class="text-center mt-4">
								<router-link :to="{ name: 'Movies' }" class="text-secondary text-decoration-none">
									<i class="bi bi-arrow-left me-1"></i>
									Back to Movie Dashboard
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
