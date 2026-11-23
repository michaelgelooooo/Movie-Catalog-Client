<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global.js";
import api from "../api";

const notyf = new Notyf();
const router = useRouter();

const { user } = useGlobalStore();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isEnabled = ref(false);
const isSubmitting = ref(false);

watch([email, password, confirmPassword], (currentValue) => {
	isEnabled.value = currentValue.every((input) => input.trim() !== "");
});

async function register() {
	if (password.value !== confirmPassword.value) {
		notyf.error("Passwords do not match.");
		return;
	}

	isSubmitting.value = true;

	try {
		await api.post("/users/register", {
			email: email.value,
			password: password.value,
		});

		notyf.success("Account created successfully!");

		await router.push({ name: "Login", query: { registered: "true" } });
	} catch (error) {
		console.error("Registration Error:", error);

		notyf.error(error.response?.data?.error?.message || error.response?.data?.error || "Unable to create your account. Please try again.");
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
	<section id="register" class="d-flex align-items-center">
		<div class="container">
			<div class="row justify-content-center align-items-center py-5">
				<div class="col-md-8 col-lg-5 col-xl-4">
					<div class="card border-0 shadow rounded-4">
						<div class="card-body p-4 p-md-5">
							<div class="text-center mb-4">
								<h2 class="fw-bold text-primary">Flickbase.</h2>
								<h4 class="fw-bold mt-3">Create an Account</h4>
								<p class="text-secondary">Start exploring the world of cinema with us.</p>
							</div>

							<form @submit.prevent="register">
								<div class="mb-3">
									<label for="email" class="form-label fw-semibold"> Email Address </label>
									<input type="email" id="email" class="form-control form-control-lg" placeholder="Enter your email" v-model="email" required />
								</div>

								<div class="mb-3">
									<label for="password" class="form-label fw-semibold"> Password </label>
									<input type="password" id="password" class="form-control form-control-lg" placeholder="Create a password" v-model="password" required />
								</div>

								<div class="mb-4">
									<label for="confirmPassword" class="form-label fw-semibold"> Confirm Password </label>
									<input type="password" id="confirmPassword" class="form-control form-control-lg" placeholder="Confirm your password" v-model="confirmPassword" required />
								</div>

								<button type="submit" class="btn btn-primary btn-lg w-100" :disabled="!isEnabled || isSubmitting">
									<span v-if="isSubmitting">
										<span class="spinner-border spinner-border-sm me-2"></span>
										Registering...
									</span>

									<span v-else>
										<i class="bi bi-person-plus me-1"></i>
										REGISTER
									</span>
								</button>
							</form>

							<div class="text-center mt-4">
								<p class="text-secondary mb-0">
									Already have an account?
									<router-link :to="{ name: 'Login' }" class="text-primary fw-semibold text-decoration-none"> Login </router-link>
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
#register {
    min-height: 95vh;
}
</style>