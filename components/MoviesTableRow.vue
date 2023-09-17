<template>
    <tbody>
        <tr @click="$emit('showDescription', movie)">
            <td>{{ movie.title }}</td>
            <td>{{ getDate }}</td>
        </tr>
    </tbody>
</template>

<script lang="ts">
import { IMovie } from '~/utils/IMovie';

export default {
    name: 'MoviesTableRow',
    props: {
        movie: { type: Object as () => IMovie, required: true }
    },
    computed: {
        getDate() {
            return new Date(this.movie.release_date).toLocaleDateString();
        }
    }
}
</script>

<style scoped>

tr {
    line-height: 45px;
    box-shadow: 0px 0px 6px 0px;
    border-radius: 3px;
}

tr:hover {
    background-color: #f3c1c1;
}

td {
    padding-left: 10px;
}


</style>