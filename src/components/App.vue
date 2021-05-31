<template>
  <md-app
      v-cloak
      md-waterfall
      md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense md-layout md-alignment-center-space-between">
      <router-link to="/">
        <div class="md-layout-item md-title">
          Reihung
        </div>
      </router-link>
    </md-app-toolbar>

    <md-app-content>
      <div v-for="contestant in contestants">
        <teilnehmer :name="contestant.name" :place-count="contestants.length" ref="contestants"/>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import Teilnehmer from "./Teilnehmer";
import json from "./participants.json";
export default {
  name: 'App',
  components: {
    Teilnehmer
  },
  data: () => ({
    contestants: [ ],
    mockupContestants: json
  }),
  mounted() {
    let rnd = Math.random() * 10 + 5;
    for (let i = 0; i < rnd; i++) {
      this.$set(this.contestants, i, {"name": this.mockupContestants[i]["first_name"] + " " + this.mockupContestants[i]["last_name"]});
    }
    console.log(this.contestants)
  }
}
</script>

<style scoped>

</style>