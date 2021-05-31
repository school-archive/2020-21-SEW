<template>
    <md-app id="app">
        <md-app-content>
            <md-field :class="{'md-invalid': url_invalid}">
                <label>Hostname</label>
                <md-input v-model="hostname"></md-input>
                <span class="md-error">Ungültige Adresse / IP</span>
            </md-field>
            <md-button class="md-raised md-primary" @click="get_hostname_info">Go</md-button>

            <div v-if="requested">
                <p><b>IP-Adresse:</b> {{ ip_info.query }}</p>
                <p><b>Ort:</b> {{ ip_info.city }}, {{ ip_info.regionName }}, {{ ip_info.country }} </p>
                <p><b>Längengrad:</b> {{ ip_info.lon }}</p>
                <p><b>Breitengrad:</b> {{ ip_info.lat }} </p>
                <p><b>Sonnenaufgang:</b> {{ time_info.results.sunrise }}</p>
                <p><b>Sonnenuntergang:</b> {{ time_info.results.sunset }}</p>
                <p><b>Wetter:</b> {{ weather_info.weather[0].description }}</p>
            </div>
            <p v-else>No information yet</p>
        </md-app-content>
    </md-app>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
    data() {
      return {
          hostname: 'htl.rennweg.at',
          url_invalid: false,
          ip_info: {},
          weather_info: {weather: [{}]},
          time_info: { results: {}},
          requested: false,
      }
    },
    methods: {
      get_hostname_info() {

          axios.get(`http://ip-api.com/json/${this.hostname}`)
          .catch(() => this.url_invalid = true)
          .then(response => {
              this.ip_info = response.data;
              this.url_invalid = false;
              console.log(response);

              if (response.data.status === "fail") {
                  this.url_invalid = true;
                  throw response.data;
              }

              const weather_key = ""; // TODO add weather key

              return Promise.all([
                  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.ip_info.lat}&lon=${this.ip_info.lon}&appid=${weather_key}`),
                  axios.get(`https://api.sunrise-sunset.org/json?lat=${this.ip_info.lat}&lng=${this.ip_info.lon}`)
              ]);
          })
          .catch(console.error)
          .then(values => {
              console.log(values)
              for (let v of values) {
                  if (v.data.weather)
                      this.weather_info = v.data;
                  else
                      this.time_info = v.data;
              }
              this.requested = true;
          });
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
