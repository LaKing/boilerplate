<template>
    <v-toolbar app>
        <v-toolbar-items>
            <v-btn flat to="/">HOME</v-btn>
            <v-btn flat to="/boilerplate">Boilerplate</v-btn>
            <v-btn flat to="/vue">Vue</v-btn>
            <v-btn flat to="/vuetify">Vuetify</v-btn>
            <v-btn flat to="/session">Session</v-btn>
            <v-btn flat to="/socket-io">Socket.io</v-btn>
          
            <v-btn flat v-on:click="$root.login_dialog.open();">##&en Login ##&hu Bejelentkezés ##</v-btn>
            <language_selector></language_selector>
          
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import language_selector from "@/components/LanguageSelector.vue";

export default {
    name: "navigation",
    data: function() {
        return {};
    },
    components: {
        language_selector
    }
};
</script>

<style></style>
