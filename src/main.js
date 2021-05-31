import Vue from 'vue'
import App from './App.vue'

import VueMaterial from "vue-material";

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import 'vue-material-slider/dist/vue-material-slider.css';
import VueMaterialSlider from 'vue-material-slider';
Vue.use(VueMaterialSlider);

Vue.use(VueMaterial)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
