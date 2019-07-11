import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

const vuetify_options = ß.VUETIFY || {};

Vue.use(Vuetify, vuetify_options);


/*
Vue.use(Vuetify, {
    iconfont: "fa",
    options: {
        customProperties: true
    },
    theme: {
        primary: "#ffffcc",
        secondary: "#477272",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
    }
});
*/