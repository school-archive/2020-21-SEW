<template>
    <div class="beitrag">
        <beitrag :post-data="current_post"/>
    </div>
</template>

<script>
import Beitrag from "@/components/Beitrag";
export default {
name: "PostPage",
    components: {Beitrag},
    computed: {
        current_post() {
            for (let post of this.$store.getters.get_posts)
                if (post.id == this.$route.params.postid)
                    return post;
            return undefined;
        }
    }
}
</script>

<style scoped>

.beitrag:nth-child(2n - 1) {
    background-color: #fffaf0 !important;
}

.beitrag:nth-child(2n) {
    background-color: #f0f8ff !important;
}
</style>