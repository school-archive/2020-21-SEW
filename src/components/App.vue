<template>
  <md-app
      v-cloak
      md-mode="fixed"
      md-waterfall
  >
    <md-app-toolbar class="md-primary md-dense md-layout md-alignment-center-space-between">
      <router-link to="/">
        <div class="md-layout-item md-title">
          Secure Registration
        </div>
      </router-link>
    </md-app-toolbar>

    <md-app-content>
      <md-vuelidated :disabled="is_loading" class="email-wrapper">
        <label for="email">Email *</label>
        <md-input id="email" v-model="email" @input="email_valid = true"></md-input>
        <md-vuelidated-msg constraint="email">
          Invalid email address
        </md-vuelidated-msg>
        <md-vuelidated-msg constraint="required">
          Required field
        </md-vuelidated-msg>
        <md-vuelidated-msg constraint="valid_email">
          This email does not exist
        </md-vuelidated-msg>
      </md-vuelidated>

      <md-vuelidated :disabled="is_loading" class="password-wrapper">
        <label for="password">Password</label>
        <md-input id="password" v-model="password" @input="password_compromised = false"></md-input>
        <md-vuelidated-msg constraint="required">
          Required field
        </md-vuelidated-msg>
        <md-vuelidated-msg constraint="compromised_check">
          This password was compromised and is unsafe
        </md-vuelidated-msg>
      </md-vuelidated>

      <div class="submit">
        <md-button :disabled="is_loading || $v.$invalid" class="md-primary md-raised" @click="check_credentials">
          Register
        </md-button>
        <md-progress-spinner v-show="is_loading" :md-diameter="28" :md-stroke="3"
                             md-mode="indeterminate"></md-progress-spinner>
      </div>

      <md-dialog-alert
          :md-active.sync="show_alert"
          md-content="You have successfully registered"
          md-title="Registration successful"
      />
    </md-app-content>
  </md-app>
</template>

<script>
import {email, required} from "vuelidate/lib/validators";
import {sha1} from "../sha1";

export default {
  name: 'App',
  components: {},
  data() {
    return {
      email: '',
      email_valid: true,
      password: '',
      password_compromised: false,
      is_loading: false,
      show_alert: false,
    }
  },
  methods: {
    check_credentials() {
      this.is_loading = true;
      const api_key = "9fd330081b67f22e669b19db919a39ae";

      sha1(this.password)
          .then(hash => {
            Promise.all([this.axios.get(`https://api.pwnedpasswords.com/range/${hash.substring(0, 5)}`),
              this.axios.get(`http://apilayer.net/api/check?access_key=${api_key}&email=${this.email}&smtp=1&format=1`)])
                .then(res => {
                  this.password_compromised = false;
                  this.email_valid = res[1].data.smtp_check === true;
                  const lines = res[0].data.split("\n");
                  for (let l of lines) {
                    const hash_end = l.split(":")[0];
                    if (hash.substring(hash.length - hash_end.length) === hash_end) {
                      this.password_compromised = true;
                      break;
                    }
                  }
                  console.log(this.password_compromised)
                  this.is_loading = false;

                  if (!this.$v.$invalid) {
                    this.show_alert = true;
                  }
                })
          })
    }
  },
  validations: {
    email: {
      required, email,
      valid_email: (x, vm) => vm.email_valid
    },
    password: {
      required,
      compromised_check: (x, vm) => !vm.password_compromised
    }
  }
}
</script>

<style scoped>
.submit {
  display: inline-flex;
  align-items: center;
  width: auto;
}
</style>
