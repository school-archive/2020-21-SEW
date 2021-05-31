<template>
    <router-link :to="'/post/' + postData.id" class="wrapper">
        <p class="title">{{ postData.title }}</p>
        <p class="date">vor {{ postData.time }}</p>
    </router-link>
</template>

<script>
export default {
name: "Beitrag",
    props: {
        postData: Object
    },
    computed: {
    }
}
</script>

<style scoped>
     .wrapper {
        color: unset !important;
         text-decoration: none !important;
    }
    .wrapper {
        display: flex;
        width: 100%;
        flex-grow: 1;
        padding: 0 14px 0 14px;
    }

    .date {
        display: inline-block;
    }

    .title {
        display: inline-block;
        flex-grow: 1;
    }
</style>