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
        <teilnehmer :name="contestant.name" :place-count="contestants.length" ref="contestants" v-on:select-placement="updateLockedPlacements"/>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import Teilnehmer from "./Teilnehmer";
export default {
  name: 'App',
  components: {
    Teilnehmer
  },
  data: () => ({
    contestants: [
      {
        name: "Peggi Petera"
      },
      {
        name: "Leesa Stife"
      },
      {
        name: "Guido Paddington"
      },
      {
        name: "Salomo Hitzke"
      },
      {
        name: "Betta Nannizzi"
      }
    ]
  }),
  methods: {
    updateLockedPlacements() {
      let locked = new Array(this.contestants.length);
      locked.fill(false)

      this.$refs.contestants.forEach(c => {
        if (c.placement !== false)
          locked[c.placement - 1] = true;
      });

      this.$refs.contestants.forEach(c => {
        c.lockPlacements(locked);
      });
    }
  }

}
//$refs.x.lockPlacements([true, true])
</script>

<style scoped>

</style>