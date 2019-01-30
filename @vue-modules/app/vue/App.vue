<template>
    <div id="app" data-app>
        <v-toolbar app>
            <v-toolbar-items>
                <v-btn flat to="/boilerplate">Boilerplate</v-btn>
                <v-btn flat to="/vue">Vue</v-btn>
                <v-btn flat to="/vuetify">Vuetify</v-btn>
                <v-btn flat to="/session">Session</v-btn>
                <v-btn flat to="/login">##&en Login ##&hu Bejelentkezés ##</v-btn>
                <v-btn flat to="/socket-io">Socket.io</v-btn>
           
				<language_selector></language_selector>
            </v-toolbar-items>
        </v-toolbar>
      <br>
        <transition name="component-fade" mode="out-in">
            <img v-if="at('') || at('boilerplate') || at('session')" alt="ßoilerplate logo" src="@/assets/boilerplate.png" key="a"/>
            <img v-if="at('vuetify')" alt="Vuetify logo" src="./assets/vuetify.png" /> <img v-if="at('vue')" alt="Vue logo" src="@/assets/vue.png" key="b"/>
            <img v-if="at('socket-io')" alt="socket.io logo" src="@/assets/socketio.png" key="a"/>
        </transition>
        <transition name="component-fade" mode="out-in">
            <hello_boilerplate v-if="at('') || at('boilerplate')" msg="##&en Welcome to the ßoilerplate Vue.js stack ##&hu A ßoilerplate Vue stack ##" />
            <hello_vue v-if="at('vue')" msg="##&en The ##&hu A ## ßoilerplate Vue.js module" /> 
            <hello_vuetify v-if="at('vuetify')" msg="##&en The ##&hu A ## ßoilerplate Vuetify module" />
            <hello_session v-if="at('session')" msg="##&en The ##&hu A ## ßoilerplate Session module" /> 
            <hello_socket_io v-if="at('socket-io')" msg="##&en The ##&hu A ## ßoilerplate Socket-io module" /> 
            <login_dialog v-if="at('login')" />
        </transition>
    </div>
</template>

<script>
import language_selector from "@/components/LanguageSelector.vue";
  
import hello_boilerplate from "./components/HelloBoilerplate.vue";
import hello_vue from "./components/HelloVue.vue";
import hello_vuetify from "./components/HelloVuetify.vue";
import hello_session from "./components/HelloSession.vue";

import login_dialog from "./components/LoginDialog.vue";

import hello_socket_io from "./components/HelloSocketIo.vue";
//import hello_bootstrap from './components/HelloBootstrap.vue';

export default {
    name: "app",
    data: function() {
    	return {};
    },
    components: {
        language_selector,
        hello_boilerplate,
        hello_vue,
        hello_vuetify,
        hello_session,
        login_dialog,
        hello_socket_io
        //hello_bootstrap
    },
    methods: {
        at: function(arg) {
            return this.$route.path === "/" + arg;
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.1s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0.2;
}
</style>
