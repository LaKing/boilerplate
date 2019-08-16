import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// changes for vuetify 2.0.7: moved to plugins; import from lib;
//import 'vuetify/dist/vuetify.min.css';
//Vue.use(Vuetify, ß.VUETIFY || {});

Vue.use(Vuetify);


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

// added for vuetify 2.0.7
export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});