<template>
    <div>
        <div class="content">
            <beitrag class="beitrag" v-for="post in all_posts" :key="post.title" :post-data="post"/>
        </div>

        <md-dialog-prompt
            :md-active.sync="dialog_active"
            :key="dialog_key"
            md-title="Beitrag hinzufügen"
            md-input-maxlength="30"
            md-input-placeholder="Titel des Beitrags"
            md-confirm-text="Done"
            @md-confirm="add_post"
        />

        <md-button id="add-post" class="md-fab" @click="dialog_active = true">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>

<script>
import Beitrag from "@/components/Beitrag";

export default {
    name: "Main",
    components: {
        Beitrag
    },
    data() {
        return {
            dialog_active: false,
            dialog_key: 1,
        }
    },
    computed: {
        all_posts () {
            console.log(this.$store.getters.get_posts)
            return this.$store.getters.get_posts;
        }
    },
    methods: {
        add_post(event) {
            this.dialog_key++;
            console.log(this.dialog_value)
            this.$store.commit("add_post", {
                title: event,
                time: "5 Monaten"
            })
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

.md-content {
    padding: 0;
}

#add-post {
    position: absolute;
    right: 32px;
    bottom: 24px;
}
</style>