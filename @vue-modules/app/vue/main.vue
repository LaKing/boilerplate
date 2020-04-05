<template>
    <v-content id="main">
        <transition name="component-fade" mode="out-in">
            <img v-if="at('') || at('boilerplate') || at('session')" alt="ßoilerplate logo" :src="require('@/assets/boilerplate.png')" key="a" />
            <img v-if="at('vuetify')" alt="Vuetify logo" :src="require('@/assets/vuetify.png')" />
            <img v-if="at('vue')" alt="Vue logo" :src="require('@/assets/vue.png')" key="b" />
            <img v-if="at('socket-io')" alt="socket.io logo" :src="require('@/assets/socketio.png')" key="a" />
        </transition>
        <transition name="component-fade" mode="out-in">
            <hello_boilerplate v-if="at('') || at('boilerplate')" msg="##&en Welcome to the ßoilerplate Vue.js stack ##&hu A ßoilerplate Vue stack ##" />
            <hello_vue v-if="at('vue')" msg="##&en The ##&hu A ## ßoilerplate Vue.js module" />
            <hello_vuetify v-if="at('vuetify')" msg="##&en The ##&hu A ## ßoilerplate Vuetify module" />
            <hello_session v-if="at('session')" msg="##&en The ##&hu A ## ßoilerplate Session module" />
            <hello_socket_io v-if="at('socket-io')" msg="##&en The ##&hu A ## ßoilerplate Socket-io module" />
            <hello_login v-if="at('hello_login')" msg="##&en The ##&hu A ## ßoilerplate login module" />
            <hello_payment v-if="at('payment')" msg="##&en Payment ##&hu Fizetés ##" />
            <!--login_dialog ref="login_dialog_reference" v-if="at('login') || open_login_dialog" @finished="finish_login_dialog"/-->
        </transition>
    </v-content>
</template>

<script>
import hello_boilerplate from "@/components/HelloBoilerplate.vue";
import hello_vue from "@/components/HelloVue.vue";
import hello_vuetify from "@/components/HelloVuetify.vue";
import hello_session from "@/components/HelloSession.vue";

//import login_dialog from "@/components/LoginDialog.vue";
import hello_login from "@/components/HelloLogin.vue";

import hello_socket_io from "@/components/HelloSocketIo.vue";
  
import hello_payment from "@/components/HelloPayment.vue";
//import hello_paypal from "@/components/HelloPayPal.vue";

//import hello_bootstrap from '@/components/HelloBootstrap.vue';

/*

            <img v-if="at('') || at('boilerplate') || at('session')" alt="ßoilerplate logo" src="@/assets/boilerplate.png" key="a" />
            <img v-if="at('vuetify')" alt="Vuetify logo" src="@/assets/vuetify.png"/>
            <img v-if="at('vue')" alt="Vue logo" src="@/assets/vue.png" key="b" />
            <img v-if="at('socket-io')" alt="socket.io logo" src="@/assets/socketio.png" key="a" />

*/

export default {
    name: "app",
    data: function() {
        return {
            //open_login_dialog: false
        };
    },
    components: {
        hello_boilerplate,
        hello_vue,
        hello_vuetify,
        hello_session,
        hello_login,
        hello_socket_io,
        hello_payment,
        //hello_paypal
        //login_dialog
        //hello_bootstrap
    },
    methods: {
        at: function(arg) {
            let a = arg.toLowerCase();
            let p = this.$route.path.toLowerCase();
            if (p === "/" + a) return true;
            if (p === "/" + a + "/") return true;
            return false;
        } 
        /*,
        finish_login_dialog() {
        	this.open_login_dialog = false;
            //this.$router.go('/');
        }*/
    }
};
</script>
<style>
#main {
    margin-top: 70px;
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
