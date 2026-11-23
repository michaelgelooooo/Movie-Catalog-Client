<script setup>
import { Notyf } from "notyf";
import api from "../api";

const props = defineProps({
	movies: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(["movie-deleted"]);

const notyf = new Notyf();

async function deleteMovie(movieId) {
	if (!window.confirm("Are you sure you want to delete this movie?")) {
		return;
	}

	try {
		await api.delete(`/movies/deleteMovie/${movieId}`);

		notyf.success("Movie deleted successfully!");

		emit("movie-deleted", movieId);
	} catch (error) {
		console.error("Delete Movie Error:", error);

		notyf.error(error.response?.data?.error?.message || error.response?.data?.error || "Unable to delete movie. Please try again.");
	}
}
</script>

<template>
	<div>
		<div class="d-flex justify-content-between align-items-center mb-4">
			<div>
				<h2 class="fw-bold mb-1">MOVIE MANAGEMENT</h2>
				<p class="text-secondary mb-0">Manage and organize your movie collection.</p>
			</div>

			<router-link :to="{ name: 'Add Movie' }" class="btn btn-primary">
				<i class="bi bi-plus-lg me-2"></i>
				Add Movie
			</router-link>
		</div>

		<div class="table-responsive">
			<table class="table table-hover align-middle">
				<thead class="table-primary">
					<tr>
						<th>Title</th>
						<th>Director</th>
						<th>Genre</th>
						<th>Year</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="movie in movies" :key="movie._id">
						<td class="fw-semibold">
							{{ movie.title }}
						</td>

						<td>{{ movie.director }}</td>
						<td>{{ movie.genre }}</td>
						<td>{{ movie.year }}</td>

						<td>
							<div class="d-flex gap-2">
								<router-link :to="{ name: 'Edit Movie', params: { id: movie._id } }" class="btn btn-sm btn-outline-primary">
									<i class="bi bi-pencil-square"></i>
								</router-link>

								<button @click="deleteMovie(movie._id)" class="btn btn-sm btn-outline-danger">
									<i class="bi bi-trash"></i>
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
