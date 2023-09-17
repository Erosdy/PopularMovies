<template>
  <table v-if="!isPending">
    <MoviesTableHeader :filterBy="filterBy" :asc="asc" @sortBy="filterByColumn"/>
    <MoviesTableRow v-for="movie in moviesList" :key="movie.id" :movie="movie" @showDescription="showDescription"/>
  </table>
</template>

<script lang="ts">
import MoviesTableHeader from './MoviesTableHeader.vue';
import MoviesTableRow from './MoviesTableRow.vue';
import { IMovie } from '~/utils/IMovie';

export default {
    components: { MoviesTableHeader, MoviesTableRow },
    name: 'MoviesTable',
    data() {
      return {
        filterBy: 'title',
        asc: true
      };
    },
    props: {
        isPending: { type: Boolean, required: true },
        movies: { type: Array as () => IMovie[], required: true }
    },
    methods: {
      showDescription(movie: IMovie) {
        this.$emit('showDescription', movie);
      },
      filterByColumn(colunmName: string) {
        if (colunmName === this.filterBy){
          this.asc = !this.asc;
        } else {
          this.filterBy = colunmName;
          this.asc = true;
        }
      }
    },
    computed: {
      moviesList() {
        return this.movies.sort((a: IMovie, b: IMovie) => {
          if (!this.asc) {
            const tmp = a;
            a = b;
            b = tmp;
          }
          return this.filterBy === 'title' ? 
            a.title.localeCompare(b.title) : 
            new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        });
      }
    }
}
</script>

<style>

table {
  border-collapse: separate;
  border-spacing: 0 15px;
  table-layout: fixed;
  width: 40%;
  text-align: left;
}

</style>