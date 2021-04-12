<template>
  <div ref="result_div" class="result">
    <img class="poster" :src="omdbObj.Poster">
    <div class="text">

      <div class="title" @click="open_close_result">
        <p><b>{{ omdbObj.Title }} ({{ omdbObj.Year }})</b></p>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="451.846px" height="451.847px" viewBox="0 0 451.846 451.847" style="enable-background:new 0 0 451.846 451.847;"
             xml:space="preserve"><g><path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
		L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
		c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"/></g></svg>
      </div>

      <div v-if="details" class="details">
        <b>mit {{ details.Actors }}</b><br>
        <b>Regie: {{ details.Director }}</b>
        <p>{{ details.Plot }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "OmdbResult",
  props: {
    omdbObj: Object,
  },
  data() {
  return {
    details: null,
  }
  },
  methods: {
    open_close_result() {
      if (this.$refs["result_div"].classList.contains("result-open")) {
        this.$refs["result_div"].classList.remove("result-open");
      } else {
        this.$refs["result_div"].classList.add("result-open");
        if (!this.details) {
          let api_key = "c8e34730";
          axios.get(`http://www.omdbapi.com/?apikey=${api_key}&i=${this.omdbObj.imdbID}`)
            .then(response => {
              this.details = response.data;
              console.log(this.details)
            })
        }
      }
      console.log("clicked")
    }
  }
}
</script>

<style scoped>
  .result {
    display: flex;
    padding: 8px;
    flex-direction: row;
    align-items: center;
  }

  .poster {
    height: 100px;
  }

  .text {
    flex-grow: 1;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .title > p {
    color: black;
    text-decoration: none;
    display: inline;
    margin: 0;
  }

  .title > b :hover {
    text-decoration: none;
  }

  .title > svg {
    margin-left: 16px;
    height: 12px;
    width: 12px;
    transform: rotateZ(90deg);
    flex-grow: 0;
    transition: transform .1s;
  }

  .result-open .title svg {
    transform: rotateZ(270deg);
  }

  .result .details {
    display: none;
  }

  .result-open .details {
    display: initial;
  }

  .text .details b {
    font-size: smaller;
  }
</style>