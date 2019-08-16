<template>
    <v-app-bar app>
        <v-toolbar-items>
            <v-btn text to="/">HOME</v-btn>
            <v-btn text to="/boilerplate">Boilerplate</v-btn>
            <v-btn text to="/vue">Vue</v-btn>
            <v-btn text to="/vuetify">Vuetify</v-btn>
            <v-btn text to="/session">Session</v-btn>
            <v-btn text to="/socket-io">Socket.io</v-btn>
          
            <v-btn v-on:click="$root.login_dialog.open();">##&en Login ##&hu Bejelentkezés ##</v-btn>
            <language_selector></language_selector>
          
        </v-toolbar-items>
    </v-app-bar>
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
