<script setup>
import { onBeforeMount } from "vue";
import { useGlobalStore } from "../stores/global";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";

const router = useRouter();
const { getUserDetails } = useGlobalStore();
const notyf = new Notyf();

onBeforeMount(() => {
	localStorage.removeItem("token");
	getUserDetails(null);

	notyf.success("Logged out successfully!");

	router.push({ path: "/login" });
});
</script>
