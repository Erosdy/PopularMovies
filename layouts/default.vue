<template>
    <div>
        <div class="header">
            <h1>Popular movies</h1>
        </div>
        <slot />
    </div>
</template>

<script setup>
useSeoMeta({
    title: 'Popular movies',
});
</script>

<style>
html, body, * {
    margin: 0;
}

* {
    padding: 0;
    font-family: Helvetica, Arial, sans-serif;
}

.header {
    padding-top: 10px;
    width: 100%;
    height: 10%;
    background-color: #920716;
}

h1 {
    color: #ffffff;
    font-size:26px; 
    font-weight:700;  
    letter-spacing:1px; 
    text-transform:uppercase; 
    width:300px; 
    text-align:center; 
    margin:auto; 
    white-space:nowrap; 
    padding-bottom:13px;
}

h1:before {
    background-color: #fffabc;
    content: '';
    display: block;
    height: 3px;
    width: 75px;
    margin-bottom: 5px;
}

h1:after {
    background-color: #fffabc;
    content: '';
    display: block;
    position: relative; 
    left:225px;
    height: 3px;
    width: 75px;
    margin-bottom: 0.25em;
}

tr:hover {
    cursor: pointer;
}

</style>