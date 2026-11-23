<template>
    <section id="landing" class="d-flex align-items-center">
        <div class="container">
            <div class="row align-items-center py-5">
                <div class="col-lg-6 text-center text-lg-start">
                    <span class="badge bg-primary mb-3 px-3 py-2">
                        YOUR NEXT FAVORITE FILM STARTS HERE
                    </span>

                    <h1 class="display-3 fw-bold mb-3">
                        Discover Movies.
                        <span class="text-primary">Explore Stories.</span>
                        Find Your Next Favorite.
                    </h1>

                    <p class="lead text-secondary mb-4">
                        Explore the world of cinema with Flickbase. Discover movies,
                        browse different genres, and find your next favorite film
                        all in one place.
                    </p>

                    <router-link :to="{ name: 'Movies' }" class="btn btn-primary btn-lg px-4">
                        Browse Catalog
                        <i class="bi bi-arrow-right ms-2"></i>
                    </router-link>
                </div>

                <div class="col-lg-6 mt-5 mt-lg-0">
                    <img
                        src="https://images.unsplash.com/photo-1623475329493-889804e377f8"
                        alt="Cinema"
                        class="img-fluid rounded-4 shadow"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style>
#landing {
    min-height: 95vh;
}
</style>