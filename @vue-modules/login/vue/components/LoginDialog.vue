<template>
    <div class="text-xs-center">
        <v-dialog v-model="dialog" max-width="500">
            <v-btn slot="activator" color="red lighten-2" dark> ##&en LOGIN ##&hu BEJELENTKEZÉS ##</v-btn>

            <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="300px">
                <v-layout column fill-height>
                    <v-card-title>
                        <v-btn dark icon v-if="selected !== 'selector'" v-on:click="selected = 'selector'"> <v-icon>chevron_left</v-icon> </v-btn>
                        <v-btn dark icon v-if="selected === 'selector' && is_user" v-on:click="selected = 'settings'"> <v-icon>fas fa-cog</v-icon> </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn dark icon v-on:click="dialog = false"> <v-icon>cancel</v-icon> </v-btn>
                    </v-card-title>

                    <v-spacer></v-spacer>

                    <v-card-title class="white--text pl-5 pt-5">
                        <div class="headline">{{ title }}</div>
                        <v-spacer></v-spacer>
                        <v-btn v-if="is_user" dark icon v-on:click="logout()" title="Logout"> <v-icon>fas fa-sign-out-alt</v-icon> </v-btn>
                        <v-btn v-if="!is_user" dark icon v-on:click="toggle_rem()" title="##&en remember me on this computer ##&hu emlékezzem rám ez a gép ##"> 
                          <v-icon v-if="!rem">fas fa-square</v-icon> 
                        </v-btn>
                        
                    </v-card-title>
                </v-layout>
            </v-img>

            <v-layout row wrap>
                <v-flex xs12>
                    <v-card height="320">
                        <transition name="component-fade" mode="out-in"> <component :is="selected" @dialog_handler="set_dialog" v-bind:rem="rem"/> </transition>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-dialog>
    </div>
</template>

<script>

  // the selector list
import selector from "@/components/LoginSelector.vue";

// LoginCard contents
import password_login from "@/components/LoginCardPasswordLogin.vue";
import password_settings from "@/components/LoginCardPasswordSettings.vue";
import email_login from "@/components/LoginCardEmailLogin.vue";
import email_settings from "@/components/LoginCardEmailSettings.vue";
import settings from "@/components/LoginCardSettings.vue";

import axios from "axios";

import ß from "ß";
  
export default {
    data() {
        return {
            dialog: true,
            selected: "selector",
            rem: true
        };
    },
    components: {
        selector,
        password_login,
        password_settings,
        email_login,
        email_settings,
        settings
    },
    methods: {
        set_dialog(arg) {
            this.selected = "selector";
            if (arg === "close") {
                this.dialog = false;
                return;
            }
            this.selected = arg;
        },
        logout() {
          
          	this.$store.dispatch("clear_session");
            // eslint-disable-next-line
            var URL = process.env.VUE_APP_BASE_URL || "";
            URL += "/post-logout.json";

            var _this = this;
            axios({
                method: "post",
                url: URL,
                data: {}
            })
                .then(function(response) {
                    _this.$store.dispatch("clear_session");
                    _this.set_dialog("selector");
                })
                .catch(error => {
                    // eslint-disable-next-line
                    console.log(error);
                });
        },
        toggle_rem() {
        	this.rem = !this.rem;
        }
    },
    computed: {
        title() {
            if (this.$store.state.passport.user) {
                if (this.$store.state.user.local) if (this.$store.state.user.local.email) return this.$store.state.user.local.email.split("@")[0];
            }
            return "##&en Login to ## " + ß.HOSTNAME + "##&hu  - bejelentkezés ##";
        },
        is_user() {
            if (this.$store.state.passport.user) return true;
            return false;
        }
    }
};
</script>
<style>
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.1s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0.2;
}
</style>
