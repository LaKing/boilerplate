<template>
    <v-app-bar app>
        <v-toolbar-items>
            <v-btn text to="/">HOME</v-btn>
            <v-btn text to="/boilerplate">Boilerplate</v-btn>
            <v-btn text to="/vue">Vue</v-btn>
            <v-btn text to="/vuetify">Vuetify</v-btn>
            <v-btn text to="/session">Session</v-btn>
            <v-btn text to="/socket-io">Socket.io</v-btn>
            <v-btn text to="/payment">Payment</v-btn>
            <v-btn text to="/hello_login">##&en Login ##&hu Bejelentkezés ##</v-btn>
            <v-btn v-on:click="$root.login_dialog.open()">##&en Login Dialog ##&hu login Dialogus ##</v-btn>
            <language_selector></language_selector>
            <v-btn v-if="$store.state.server.session.is_admin" text @click="open_admin()">Admin</v-btn>
            <v-btn v-if="debug" text @click="open_editor()">Editor</v-btn>
            <v-btn text @click="open_readme()">README</v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import language_selector from "@/components/LanguageSelector.vue";
export default {
    name: "navigation",
    data: function() {
        return {
            debug: ß.DEBUG
        };
    },
    components: {
        language_selector
    },
    methods: {
        open_editor: function() {
            window.open(ß.EDITOR_SITELINK, "_blank");
        },
        open_admin: function() {
            window.open("https://" + ß.HOSTNAME + "/admin", "_blank");
        },
        open_readme: function() {
            window.open("https://" + ß.HOSTNAME + "/README.html", "_blank");
        },
      /*
      	Tested logic function here ...
      
      	<v-btn text @click="run_test()">TEST</v-btn>

      	
      	run_test: function() {
            ß.getTest("Hello", "World");
        }
        
        */
    }
};
</script>

<style></style>
