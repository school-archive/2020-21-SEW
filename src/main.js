import Vue from 'vue'
import App from './App.vue'


import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
