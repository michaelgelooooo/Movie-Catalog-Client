
<script setup>
import { ref, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import api from "../api";

const props = defineProps({
    movieId: {
        type: String,
        required: true,
    },
});

const notyf = new Notyf();

const comments = ref([]);
const comment = ref("");

const isLoading = ref(false);
const isSubmitting = ref(false);

async function getComments() {
    isLoading.value = true;

    try {
        const { data } = await api.get(
            `/movies/getComments/${props.movieId}`
        );

        comments.value = data.comments;
    } catch (error) {
        console.error("Get Comments Error:", error);
        notyf.error("Unable to retrieve comments.");
    } finally {
        isLoading.value = false;
    }
}

async function addComment() {
    if (!comment.value.trim()) {
        return;
    }

    isSubmitting.value = true;

    try {
        await api.patch(
            `/movies/addComment/${props.movieId}`,
            {
                comment: comment.value.trim(),
            }
        );

        notyf.success("Comment submitted successfully!");

        comment.value = "";

        await getComments();
    } catch (error) {
        console.error("Add Comment Error:", error);

        notyf.error(
            error.response?.data?.error?.message ||
            error.response?.data?.error ||
            "Unable to submit comment."
        );
    } finally {
        isSubmitting.value = false;
    }
}

onBeforeMount(() => {
    getComments();
});
</script>

<template>
    <div>
        <h4 class="fw-bold mb-3">LEAVE A COMMENT</h4>

        <form @submit.prevent="addComment" class="mb-5">
            <div class="mb-3">
                <textarea
                    v-model="comment"
                    class="form-control"
                    rows="3"
                    placeholder="Share your thoughts about this movie..."
                    required
                ></textarea>
            </div>

            <div class="text-end">
                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="!comment.trim() || isSubmitting"
                >
                    <span
                        v-if="isSubmitting"
                        class="spinner-border spinner-border-sm me-2"
                    ></span>

                    <i v-else class="bi bi-send me-2"></i>

                    {{ isSubmitting ? "Submitting..." : "Submit Comment" }}
                </button>
            </div>
        </form>

        <hr class="mb-4" />

        <h4 class="fw-bold mb-3">
            COMMENTS
            <span class="text-secondary fs-6">
                ({{ comments.length }})
            </span>
        </h4>

        <div v-if="isLoading" class="text-center py-4">
            <div class="spinner-border spinner-border-sm text-primary"></div>
            <p class="text-secondary mt-2 mb-0">
                Loading comments...
            </p>
        </div>

        <div v-else-if="comments.length">
            <div
                v-for="item in comments"
                :key="item._id"
                class="border rounded-3 p-3 mb-3"
            >
                <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-person-circle fs-4 text-secondary me-2"></i>

                    <span class="fw-semibold">
                        User {{ item.userId }}
                    </span>
                </div>

                <p class="text-secondary mb-0">
                    {{ item.comment }}
                </p>
            </div>
        </div>

        <div v-else class="text-center py-4">
            <i class="bi bi-chat-square-text display-5 text-secondary"></i>

            <p class="text-secondary mt-3 mb-0">
                No comments yet. Be the first to share your thoughts!
            </p>
        </div>
    </div>
</template>
