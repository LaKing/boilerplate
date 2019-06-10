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
    const socket_options = ß.SOCKETIO_OPTIONS || {
        autoConnect: ß.SOCKETIO_AUTOCONNECT || false
    };
    const socket = io("https://" + ß.HOSTNAME, socket_options);
    console.log("Socketio options:", socket_options);
    Vue.use(VueSocketio, socket, { store });
}

if (ß.DEBUG) console.log(ß.BUILD_VERSION, BUILD_MODULE, LANG);

// eslint-disable-next-line

if (ß.DEBUG) Vue.config.devtools = true;

// we create $app via this plugin, to make the function $app.uri and the constant $app.url available globally.
// it might get extended with others. ...
import functions from "@/app-functions.js";
const plugin = {
    install(Vue, options) {
        Vue.prototype.$app = functions;
    }
};

Vue.use(plugin);

var vm = new Vue({
    el: "#app",
    data: { test: "this is a test" },
    store,
    router,
    mounted() {
        //console.log('mounted()');
        this.$store.dispatch("load_session");
    },
    render: h => h(App)
});

/* @DOC
 
 Use a /static file in a template
 <img :src="$app.uri('/some.svg')" height="200px">
 
 Use an asset file in a template
 <img :src="require('@/assets/some.svg')" height="200px">

*/
