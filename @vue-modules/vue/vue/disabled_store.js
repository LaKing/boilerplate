/* jshint esversion: 9 */

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// vue socketio implementation used
// https://github.com/probil/vue-socket.io-extended

// @DOC UPDATE this._vm.$socket.emit has to be replaced with this._vm.$socket.client.emit

// eslint-disable-next-line
if (ß.DEBUG) Vue.config.devtools = true;
axios.defaults.withCredentials = true;

Vue.use(Vuex);

var store = new Vuex.Store({
    // you will access it with this.$store.state
    state: {
        isConnected: false,
        // if socketio is used

        // you may add additional sate variables here if you like, ...
        // main is a kind of default object
        MAIN: ß.MAIN,
      	// a secondary data storage to recive socket data
        DATA: {},

        // essentials
        session_data: {},
        console: {},
        runtime: {},
        passport: {},
        user: {},
        is_admin: false
    },
    mutations: {
        SOCKET_CONNECT(state) {
            state.isConnected = true;
        },

        SOCKET_DISCONNECT(state) {
            state.isConnected = false;

            // try to reconnect by script
            var _socket = this._vm.$socket;
            var i = setInterval(connect, 1000);
            function connect() {
                if (state.isConnected) return clearInterval(i);
                console.log("reconnect ...");
                _socket.client.open();
            }
        },
        SOCKET_MAIN(state, main) {
          	// the main message replaces the maiobject
            state.MAIN = main;
        },

        SOCKET_DATA(state, data) {
          	// socket data is an additiv operation
            state.DATA = { ...state.DATA, ...data };
        },
	
        set_session_data: (state, payload) => (state.session_data = payload),
        set_passport: (state, payload) => (state.passport = payload),
        set_user: (state, payload) => (state.user = payload),
        set_runtime: (state, payload) => (state.runtime = payload),
        set_admin: state => (state.is_admin = true),
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
            var url = "https://" + ß.HOSTNAME + "/session.json";
            var _socket = this._vm.$socket;
            //Ł(_socket);
            axios({
                method: "post",
                url: url
            }).then(function(response) {
                // eslint-disable-next-line
                //console.log("session.json", response.data);
                if (response.data.data) context.commit("set_session_data", response.data.data);
                if (response.data.user) context.commit("set_user", response.data.user);
                if (response.data.passport) {
                    context.commit("set_passport", response.data.passport);
                    if (ß.USE_SOCKETIO) {
                        if (!_socket.connected) _socket.client.open();
                    }
                }
                if (response.data.is_admin) context.commit("set_admin");
                //if (ß.DEBUG) Ł(response.data);
            });
        },
        save_session: function(context) {
            //console.log('save_session', this.state);
            // eslint-disable-next-line
            var url = "https://" + ß.HOSTNAME + "/post-session-data.json";

            axios({
                method: "post",
                url: url,
                data: this.state.session_data
            })
                .then(function(response) {
                    context.commit("console_log", "save_session " + response.data);
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

