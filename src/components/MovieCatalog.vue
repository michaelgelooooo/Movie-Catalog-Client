<script setup>
defineProps({
	movies: {
		type: Array,
		required: true,
	},
});
</script>

<template>
	<div>
		<div class="mb-4">
			<h2 class="fw-bold mb-1">FILM CATALOG</h2>
			<p class="text-secondary mb-0">Discover movies. Explore stories. Find your next favorite.</p>
		</div>

		<div class="row g-4">
			<div v-for="movie in movies" :key="movie._id" class="col-md-6 col-lg-4 col-xl-3">
				<div class="card h-100 border-0 shadow-sm">
					<div class="card-body d-flex flex-column">
						<span class="badge bg-primary align-self-start mb-3">
							{{ movie.genre }}
						</span>

						<h5 class="card-title fw-bold">
							{{ movie.title }}
						</h5>

						<p class="text-secondary small mb-2">{{ movie.director }} · {{ movie.year }}</p>

						<p class="card-text text-secondary">
							{{ movie.description }}
						</p>

						<div class="mt-auto pt-3">
							<router-link :to="{ name: 'Movie Details', params: { id: movie._id } }" class="btn btn-outline-primary w-100">
								View Details
								<i class="bi bi-arrow-right ms-2"></i>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
