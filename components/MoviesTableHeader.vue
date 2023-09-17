<template>
    <thead>
        <tr>
            <th @click="$emit('sortBy', 'title')">Title <svg-icon class="icon" v-if="filterBy === 'title'" type="mdi" :path="getIcon" /></th>
            <th @click="$emit('sortBy', 'release_date')">Release Date <svg-icon class="icon" v-if="filterBy === 'release_date'" type="mdi" :path="getIcon" /></th>
        </tr>
    </thead>
</template>

<script lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiSortAscending, mdiSortDescending } from '@mdi/js';

export default {
    name: 'MoviesTableHeader',
    components: { SvgIcon },
    props: {
        asc: { type: Boolean, required: true },
        filterBy: { type: String, required: true },
    },
    computed: {
        getIcon() {
            return this.asc ? mdiSortAscending : mdiSortDescending;
        }
    }
}
</script>

<style scoped>

tr {
    line-height: 45px;
    box-shadow: 0px 0px 9px 0px;
    border-radius: 3px;
    background-color: #b64e4a;
}

th {
    padding-left: 10px;
    color: black;
    font-weight: normal;
}

.icon {
    margin-left: 5px;
    vertical-align: middle;
}

tr th:first-child {
    width: 70%;
}


</style>