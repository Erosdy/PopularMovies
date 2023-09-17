<template>
    <div :class="`modal ${getHiddenClass}`" @click="$emit('hideMovie')">
        <div @click.stop.prevent :class="`modal_content ${getHiddenClass}`">
            <svg-icon class="icon" type="mdi" :path="path" @click="$emit('hideMovie')"/>
            <div class="header_movie">
                <h2>{{ movie.title }}</h2>
            </div>
            <div class="content">
                <img :src="getImgSrc" :alt="`${movie.title} poster`">
                <div class="description">
                    <p>{{ movie.overview }}</p>
                    <p>Genre: {{ getGenre }}</p>
                    <p>Released on {{ formatDate }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import { IMovie } from '~/utils/IMovie';
import { IGenre } from '~/utils/IGenre';

export default {
    name: 'MoviesDescription',
    components: { SvgIcon },
    props: {
        movie: { type: Object as () => IMovie, required: true },
        hidden: { type: Boolean, required: true }
    },
    data() {
        return {
            path: mdiClose,
        }
    },
    computed: {
        getHiddenClass() {
            return this.hidden ? 'hidden' : 'show';
        },
        getImgSrc() {
            return `${this.$config.public.imageBaseUrl}/${this.movie.poster_path}`;
        },
        getGenre() {
            const storeGenre = localStorage.getItem('genres');
            if (!storeGenre) { return ; }
            const genres = JSON.parse(storeGenre) as IGenre[];
            let result = ``;
            for (const g of this.movie.genre_ids) {
                const associatedGenre = genres.filter((genre: IGenre) => genre.id === g);
                if (associatedGenre.length !== 1){ continue; }
                if (result.length){ result = `${result} / `}
                result = `${result}${associatedGenre[0].name}`
            }
            return result;
        },
        formatDate() {
            return new Date(this.movie.release_date).toLocaleDateString();
        }
    }
}
</script>

<style scoped>

.hidden {
    display: none;
}

.show {
    display: block;
}

.modal {
    cursor: pointer;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.4);
}

.modal_content {
    cursor: auto;
    position: fixed;
    width: 50%;
    min-height: 200px;
    border: solid;
    border-radius: 10px;
    left: calc(50% - 25%);
    top: 10%;
    z-index: 2;
    background-color: white;
    overflow: auto;
}

.icon {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    color: white;
    font-weight: bold;
}

.content {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: left;
}

.description {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
}

img, content {
    margin-left: auto;
    margin-right: auto;
    max-height: 70%;
    max-width: 45%;
}

p {
    margin-top: 10%;
}

.header_movie {
    padding-top: 10px;
    width: 100%;
    height: 50px;
    background-color: #920716;
}

h2 {
    font-size: 30px;
    color: #ffffff
}


</style>