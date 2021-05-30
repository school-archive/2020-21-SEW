<template>
  <md-app
    v-cloak
    md-waterfall
    md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense md-layout md-alignment-center-space-between">
      <router-link to="/">
        <div class="md-layout-item md-title">
          {{ $t('title') }}
        </div>
      </router-link>
    </md-app-toolbar>

    <md-app-content>
      <wasserwaage :size="200"/>
    </md-app-content>
  </md-app>
</template>

<script>
    import Wasserwaage from "@/components/Wasserwaage";
    export default {
        name: 'App',
        components: {
          Wasserwaage
        },
    }
</script>

<style scoped>
</style>
