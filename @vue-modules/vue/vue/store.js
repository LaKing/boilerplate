import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import ß from "ß";

// eslint-disable-next-line
if (process.env.VUE_APP_DEBUG) Vue.config.devtools = true;
axios.defaults.withCredentials = true;

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        session_data: {},
        console: {},
        runtime: {},
        passport: {},
        user: {}
    },
    mutations: {
        set_session_data: (state, payload) => (state.session_data = payload),
        set_passport: (state, payload) => (state.passport = payload),
        set_user: (state, payload) => (state.user = payload),
        console_log: (state, payload) => {
            // eslint-disable-next-line
            console.log("console_log", payload);
            state.console.date = Date.now();
            state.console.log = payload;
        }
    },
    actions: {
        load_session: function(context) {
            //console.log('load_session', this.state);
            // eslint-disable-next-line
            var url = 'https://' + ß.HOSTNAME + "/session.json";
            var _socket = this._vm.$socket;
            axios.get(url).then(function(response) {
                // eslint-disable-next-line
                //console.log("session.json", response.data);
                if (response.data.data) context.commit("set_session_data", response.data.data);
                if (response.data.user) context.commit("set_user", response.data.user);
                if (response.data.passport) {
                    context.commit("set_passport", response.data.passport);
                    if (ß.USE_SOCKETIO) if (!_socket.connected) _socket.open();
                }
            });
        },
        save_session: function(context) {
            //console.log('save_session', this.state);
            // eslint-disable-next-line
            var url = 'https://' + ß.HOSTNAME +  "/session-data";

            axios({
                method: "post",
                url: url,
                data: this.state.session_data
            })
                .then(function(response) {
                    context.commit("console_log", 'save_session ' + response.data);
                })
                .catch(error => {
                    context.commit("console_log", error);
                });
        },
        clear_session: function(context) {
            // eslint-disable-next-line
            context.commit("set_session_data", {});
            context.commit("set_passport", {});
            context.commit("set_user", {});
        }
    }
});

export default store;
