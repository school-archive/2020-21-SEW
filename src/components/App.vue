<template>
  <md-app
    v-cloak
    md-waterfall
    md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense md-layout md-alignment-center-space-between">
      <router-link to="/">
        <div class="md-layout-item md-title">
          Filmguru
        </div>
      </router-link>
    </md-app-toolbar>

    <md-app-content>
      <div class="searchbar">

        <md-field class="searchtext-wrapper">
          <label for="searchtext">Suchen nach *</label>
          <md-input id="searchtext" v-model="search_text" @input="search_omdb"></md-input>
        </md-field>

        <div>
          <md-radio v-model="type" value="">Alle</md-radio>
          <md-radio v-model="type" value="movie">Film</md-radio>
          <md-radio v-model="type" value="series">Serie</md-radio>
          <md-radio v-model="type" value="episode">Folge</md-radio>
          <md-radio v-model="type" value="game">Spiel</md-radio>
        </div>

        <md-field class="page-wrapper">
          <label for="page">Seite *</label>
          <md-input id="page" v-model="page" @change="search_omdb"></md-input>
        </md-field>

        <md-button class="md-primary md-raised" @click="search_omdb">Suchen</md-button>

      </div>

      <div class="results">
        <omdb-result v-for="r in results" :key="r.imdbID" :omdb-obj="r"/>
      </div>

      <p v-if="results.length == 0">Keine Ergebnisse <span v-if="error_msg">({{ error_msg }})</span></p>

    </md-app-content>
  </md-app>
</template>

<script>
    import axios from "axios";
    import OmdbResult from "@/components/OmdbResult";

    export default {
        name: 'App',
      components: {OmdbResult},
      data() {
          return {
            search_text: '',
            type: '',
            page: 1,
            results: [],
            error_msg: null,
          }
      },
      methods: {
          search_omdb() {
            let api_key = "c8e34730";
            if (this.search_text.length > 2)
            axios.get(`http://www.omdbapi.com/?apikey=${api_key}&s=${this.search_text}&page=${this.page}&type=${this.type}`)
            .then(response => {
              console.log(response.data)
              if (response.data.Response === "True") {
                this.results = response.data.Search;
              } else this.results = [];
              this.error_msg = response.data.Error;

            })
          }
      }
    }
</script>

<style scoped>
  .md-app-content {
    padding: 0;
  }

  .results > div:nth-child(2n) {
    background-color: #e8e8e8;
  }
  .searchbar {
    padding: .5rem;
  }
  .searchbar > * {
    display: inline-block;
  }
  .searchtext-wrapper {
    width: 9rem;
    margin-right: 1em;
  }
  .page-wrapper {
    width: 5em;
  }
</style>
