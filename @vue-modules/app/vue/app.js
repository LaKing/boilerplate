import Vue from "vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";

import router from "@/router.js";
import store from "@/store.js";

// eslint-disable-next-line
import vuetify from "@/vuetify.js";

import App from "@/App.vue";

import io from "socket.io-client";
import VueSocketio from "vue-socket.io-extended";

//import ß from "ß";

if (ß.USE_SOCKETIO) {
    const socket = io("https://" + ß.HOSTNAME, { autoConnect: false });
    Vue.use(VueSocketio, socket, { store });
}

if (ß.DEBUG) console.log(ß.BUILD_VERSION, BUILD_MODULE, LANG);

// eslint-disable-next-line
if (ß.DEBUG) Vue.config.devtools = true;

var vm = new Vue({
    el: "#app",
    data: {test: "this is a test"},
    store,
    router,
    mounted() {
        //console.log('mounted()');
        this.$store.dispatch("load_session");
    },
    render: h => h(App)
});

