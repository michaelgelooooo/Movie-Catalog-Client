<script setup>
import { onBeforeMount } from "vue";
import { useGlobalStore } from "./stores/global";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const { getUserDetails } = useGlobalStore();

onBeforeMount(async () => {
	await getUserDetails(localStorage.getItem("token"));
});
</script>

<template>
	<Navbar />

	<div id="main-container" class="bg-light">
		<router-view />
	</div>

	<Footer />
</template>
