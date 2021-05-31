<template>
    <md-card>
        <md-card-header>
            <div class="md-title">{{ title }}</div>
        </md-card-header>

        <md-card-content>
            <md-field>
                <label>{{ mail_ph }}</label>
                <md-input type="email"></md-input>
            </md-field>
            <md-field>
                <label>{{ pass_ph }}</label>
                <md-input type="password" md-toggle-password></md-input>
            </md-field>
            <div>Vorschlag für Ihr Passwort: {{ passwortVorschlag }}</div>
        </md-card-content>
        <md-card-actions md-alignment="left">
            <md-button class="md-primary md-raised">{{ button_text }}</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
    export default {
        name: "Login",
        props: {
            title: String,
            mail_ph: String,
            pass_ph: String,
            button_text: String
        },
        data() {
            return {
                passwortVorschlag: Math.floor(Math.random() * 100000)
            };
        },
        methods: {
            zufallsPasswort() {
                return this.passwortVorschlag;
            }
        }
    }
</script>

<style scoped>
    .md-card-header {
        background-color: var(--md-theme-default-primary);
        color: white;
    }
</style>