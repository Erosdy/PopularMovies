<template>
    <div class="content">
        <input type="text" v-model="filter" placeholder="Search title" />
        <MoviesTable :isPending="isPending" :movies="getListMovies" @showDescription="showMovie"/>
        <MovieDescription v-if="movieToDescribe" :movie="movieToDescribe" :hidden="hideDescription" @hideMovie="hideDescription = true;"/>
    </div>
</template>

<script lang="ts">
import { IMovie } from '~/utils/IMovie';
import MoviesTable from '~/components/MoviesTable.vue';

export default {
    name: 'index',
    components: { MoviesTable },
    data() {
        return {
            isPending: false,
            movies: [] as IMovie[],
            filter: '',
            movieToDescribe: undefined as undefined | IMovie,
            hideDescription: true as boolean,
        };
    },
    async mounted() {
        await this.getGenreFromApi();
        await this.getMoviesFromApi();
    },
    methods: {
        async getMoviesFromApi() {
            this.isPending = true;
            try {
                const token = this.$config.public.bearerToken;
                const url = `${this.$config.public.baseUrl}/movie/popular`;
                const response = await fetch(url, { method: 'get', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }} );
                const data = await response.json();
                this.movies = (data.results as IMovie[]);
            } catch(err) {
                console.dir(err);
            } finally {
                this.isPending = false;
            }
        },
        async getGenreFromApi() {
            if (localStorage.getItem('genres') !== null) {
                return ;
            }
            this.isPending = true;
            try {
                const token = this.$config.public.bearerToken;
                const url = `${this.$config.public.baseUrl}/genre/movie/list`;
                const response = await fetch(url, { method: 'get', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }} );
                const data = (await response.json()) as { genres: IGenre[]};
                localStorage.setItem('genres', JSON.stringify(data.genres));
            } catch(err) {
                console.dir(err);
            } finally {
                this.isPending = false;
            }

        },
        showMovie(movie: IMovie) {
            this.hideDescription = false;
            this.movieToDescribe = movie;
        },
    },
    computed: {
        getListMovies(): IMovie[] {
            return this.movies.filter((movie: IMovie) => { return movie.title.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()) });
        },

    }
}
</script>

<style>
.content {
    display: block;
    text-align: center;
}

.content > * {
    margin-left: auto;
    margin-right: auto;
}
</style>

<style scoped>
input {
    background-image: url('/magnify.svg');
    background-repeat: no-repeat;
    padding-left: 35px;
    margin-top: 40px;
    width: 425px;
    height: 30px;
    border-radius: 15px;
}

.grey {
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
</style>