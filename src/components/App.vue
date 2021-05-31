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
      <div class="md-layout">
        <span>{{  }}</span>
        <login
        title="Anmelden bei Fakebook"
        mail_ph="Email"
        pass_ph="Passwort"
        button_text="Anmelden"/>
        <login
        title="Anmelden bei Friendbook"
        mail_ph=":) Email"
        pass_ph=":) Passwort"
        button_text="Ummelden"/>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
  import Login from "./Login";
    export default {
        name: 'App',
        components: {
          Login
        },
      mounted() {
        this.$http.get('https://jsonplaceholder.typicode.com/posts/1').then(function(response){
          if(response.status == "200"){
            console.log(response.body);
          }


        })
      }
    }
</script>

<style scoped>
</style>
