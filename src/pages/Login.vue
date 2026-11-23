<script setup>
import { watch, ref, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";
import api from "../api";

const notyf = new Notyf();
const router = useRouter();

const { getUserDetails, user } = useGlobalStore();

const email = ref("");
const password = ref("");
const isEnabled = ref(false);
const isSubmitting = ref(false);

watch([email, password], (currentValue) => {
	isEnabled.value = currentValue.every((input) => input !== "");
});

async function login() {
	isSubmitting.value = true;

	try {
		const { data } = await api.post("/users/login", {
			email: email.value,
			password: password.value,
		});

		const token = data.access;

		if (!token) {
			throw new Error("The server did not return an authentication token.");
		}

		localStorage.setItem("token", token);

		await getUserDetails(token);
		notyf.success("Login Successful");

		await router.push({ name: "Home" });
	} catch (error) {
		notyf.error(error.response?.data?.error || error.message || "Unable to log in.");
	} finally {
		isSubmitting.value = false;
	}
}

onBeforeMount(() => {
	if (user.token) {
		router.push({ path: "/" });
	}
});
</script>

<template>
	<section id="login" class="d-flex align-items-center">
		<div class="container">
			<div class="row justify-content-center align-items-center py-5">
				<div class="col-md-8 col-lg-5 col-xl-4">
					<div class="card border-0 shadow rounded-4">
						<div class="card-body p-4 p-md-5">
							<div class="text-center mb-4">
								<h2 class="fw-bold text-primary">Flickbase.</h2>
								<h4 class="fw-bold mt-3">Welcome Back!</h4>
								<p class="text-secondary">Log in to discover and explore your favorite movies.</p>
							</div>

							<form @submit.prevent="login">
								<div class="mb-3">
									<label for="email" class="form-label fw-semibold"> Email Address </label>
									<input type="email" id="email" class="form-control form-control-lg" placeholder="Enter your email" v-model="email" required />
								</div>

								<div class="mb-4">
									<label for="password" class="form-label fw-semibold"> Password </label>
									<input type="password" id="password" class="form-control form-control-lg" placeholder="Enter your password" v-model="password" required />
								</div>

								<button type="submit" class="btn btn-primary btn-lg w-100" :disabled="!isEnabled || isSubmitting">
									<span v-if="isSubmitting">
										<span class="spinner-border spinner-border-sm me-2"></span>
										Logging in...
									</span>

									<span v-else>
										<i class="bi bi-box-arrow-in-right me-1"></i>
										LOGIN
									</span>
								</button>
							</form>

							<div class="text-center mt-4">
								<p class="text-secondary mb-0">
									Don't have an account?
									<router-link :to="{ name: 'Register' }" class="text-primary fw-semibold text-decoration-none"> Register </router-link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>


<style>
#login {
    min-height: 95vh;
}
</style>