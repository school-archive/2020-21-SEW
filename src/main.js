import Vue from 'vue'
import options from '@/config'
import App from '@/components/App.vue'
import '@/main.css'
import Vuex from 'vuex';

Vue.use(require('vue-resource'));

new Vue({
    ...options(Vue),
    el: '#app',
    beforeCreate() {
        this.$store.commit("init_store");
    },
    render: h => h(App),
})
