<template>
    <md-app id="app">
        <md-app-toolbar class="md-primary">
            <span class="md-title">Indiskrete Registrierung</span>
        </md-app-toolbar>

        <md-app-content>
            <p>Pflichtfelder sind mit * gekennzeichnet.</p>

            <div class="form-items">

                <div class="row">
                    <md-field>
                        <label for="academic-title">Titel</label>
                        <md-select v-model="title" id="academic-title">
                            <md-option value="none" selected><i>Keiner</i></md-option>
                            <md-option value="mag">Mag.</md-option>
                            <md-option value="dr">Dr.</md-option>
                            <md-option value="dipl-ing">Dipl.-Ing.</md-option>
                            <md-option value="prof">Prof.</md-option>
                            <md-option value="univ-prof">Univ.-Prof.</md-option>
                        </md-select>
                    </md-field>

                    <md-field :class="{'md-invalid': $v.name.$error}">
                        <label for="name">Name *</label>
                        <md-input v-model="$v.name.$model" id="name"/>
                        <span class="md-error">Name ist zu kurz!</span>
                    </md-field>
                </div>

                <div class="row">
                    <md-field :class="{'md-invalid': $v.email.$error}">
                        <label for="email">Email *</label>
                        <md-input v-model="$v.email.$model" id="email"/>
                        <span class="md-error">Ungültige Email!</span>
                    </md-field>

                    <md-field :class="{'md-invalid': $v.phone.$error}">
                        <label for="phone">Telefon</label>
                        <md-input v-model="$v.phone.$model" id="phone"/>
                    </md-field>
                </div>

                <div class="row">
                    <md-field :class="{'md-invalid': $v.birthdate.$error}">
                        <md-icon>event</md-icon>
                        <label for="birthdate">Geburtsdatum *</label>
                        <md-input v-model="$v.birthdate.$model" id="birthdate"/>
                        <span class="md-error" v-if="!$v.birthdate.valid_birthdate">Gültiges Format: dd/mm/yyyy</span>
                    </md-field>
                </div>

                <div class="row">
                    <md-field class="satisfaction">
                        <label for="satisfaction">Zufriedenheit</label>
                        <vue-material-slider :min="0" :max="10"
                                             v-model="satisfaction" id="satisfaction"/>
                    </md-field>

                    <md-field :class="{'md-invalid': $v.homepage.$error}">
                        <label for="homepage">Homepage</label>
                        <md-input v-model="$v.homepage.$model" id="homepage"/>
                        <span class="md-error">Ungültige Adresse!</span>
                    </md-field>
                </div>

                <div class="row">
                    <md-field :class="{'md-invalid': $v.password.$error}">
                        <label for="password">Passwort *</label>
                        <md-input v-model="$v.password.$model" id="password" type="password"/>
                        <span class="md-error">Zu kurz! (min 8 Zeichen)</span>
                    </md-field>

                    <md-field :class="{'md-invalid': $v.password_repeat.$error}">
                        <label for="password_repeat">Passwort nochmals *</label>
                        <md-input v-model="$v.password_repeat.$model" id="password_repeat" type="password"/>
                        <span class="md-error">Passwörter nicht gleich!</span>
                    </md-field>
                </div>

            </div>

            <md-button class="md-raised md-primary" @click="$v.$touch()">{{$v.$invalid}}Jetzt Anmelden</md-button>
        </md-app-content>
    </md-app>
</template>

<script>
import { required, minLength, email, sameAs, helpers } from 'vuelidate/lib/validators';

const matches = regex => value => value.match(regex) !== null;

export default {
    name: 'App',
    components: {},
    data() {
        return {
            title: 'none',
            name: '',
            email: '',
            phone: '',
            birthdate: '',
            satisfaction: 5,
            homepage: '',
            password: '',
            password_repeat: '',
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(5)
        },
        email: {
            required,
            email
        },
        phone: {

        },
        birthdate: {
            required,
            valid_birthdate: matches(/([1-2]*[0-9]|3[0-1])\/(1[0-2]|[0-9])\/\d{4}/)
        },
        homepage: {
            valid_url: (val) => !helpers.req(val) ||
                matches(/^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/)(val)
        },
        password: {
            required,
            minLength: minLength(8)
        },
        password_repeat: {
            required,
            sameAsPassword: sameAs('password')
        }
    }
}
</script>

<style>
/*.form-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}*/

.row > div, .form-items > * > div {
    max-width: 20rem;
    margin: 1rem;
    display: inline-block;
}

.row > .satisfaction:after {
    background-color: transparent !important;
}

.row > .satisfaction .slider {
    width: 100%;
}

.row {
    display: block;
    width: 100%;
}
</style>
