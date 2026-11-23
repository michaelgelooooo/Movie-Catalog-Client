<script setup>
import { useGlobalStore } from "../stores/global";

const store = useGlobalStore();
const { user } = store;
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
		<div class="container">
			<router-link class="navbar-brand fw-bold fs-3" :to="{ name: 'Home' }"> <i class="bi bi-film me-1"></i> Flickbase. </router-link>

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<router-link :to="{ name: 'Movies' }" class="nav-link text-uppercase me-2">
							<i class="bi bi-film me-1"></i>
							Movies
						</router-link>
					</li>
                    
					<template v-if="user.email">
						<li class="nav-item">
							<router-link :to="{ name: 'Logout' }" class="nav-link text-uppercase">
								<i class="bi bi-box-arrow-right me-1"></i>
								Logout
							</router-link>
						</li>
					</template>

					<template v-else>
						<li class="nav-item">
							<router-link :to="{ name: 'Login' }" class="nav-link text-uppercase me-2">
								<i class="bi bi-box-arrow-in-right me-1"></i>
								Login
							</router-link>
						</li>

						<li class="nav-item">
							<router-link :to="{ name: 'Register' }" class="nav-link text-uppercase">
								<i class="bi bi-person-plus me-1"></i>
								Register
							</router-link>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>
</template>
