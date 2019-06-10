<template>
    <v-list two-line>
        <v-list-tile v-for="(item, key) in methods" :key="item.title" avatar @click="click_action(item[is].action)">
            <v-list-tile-avatar>
                <v-icon :style="style_color(item.iconColor)" class="grey lighten-2">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title>{{ item[is].title || key }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item[is].subtitle || ''}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
                <v-btn icon ripple v-if="has_key(key)"> <v-icon color="green lighten-1">check_circle</v-icon> </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
</template>

<script>
import axios from "axios";
import LOGIN_METHODS from "@/components/LOGIN_METHODS.js";
export default {
    props: ["selected"],
    data() {
        return {
            methods: LOGIN_METHODS
        };
    },
    methods: {
        style_color: function(hex) {
            return "color:" + hex;
        },
        close() {
            this.$emit("dialog_handler", "close");
        },
        click_action: function(action) {
            //console.log(key, action);
            if (action.charAt(0) === "/") {
                window.location = "https://" + ß.HOSTNAME + action;
            } else this.$emit("dialog_handler", action);
        },
        has_key(key) {
            if (this.$store.state.user) {
                if (this.$store.state.user.local) {
                    if (key === "password") if (this.$store.state.user.local.password) return true;
                    if (key === "email") if (this.$store.state.user.local.email) return true;
                }
                if (this.$store.state.user[key]) return true;
            }
            return false;
        },
        noop() {}
    },
    computed: {
        is() {
            if (this.$store.state.passport.user) return "user";
            return "guest";
        },
        is_user() {
            if (this.$store.state.passport.user) return true;
            return false;
        }
    }
};
</script>
