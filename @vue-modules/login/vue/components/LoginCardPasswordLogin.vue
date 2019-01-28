<template>
    <v-card-text>
        <v-container grid-list-md>
            <transition name="component-fade" mode="out-in"> <component :is="selected" @return="action" v-bind:btn_title="get_btn_title()" /> </transition>
        </v-container>
        <v-container>
            <v-alert v-show="msg" :value="true" type="error" color="rgba(255, 0, 0, 0.5)" class="text-sm-left">{{ msg }}</v-alert>
            <v-progress-circular v-show="progress" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-container>
    </v-card-text>
</template>

<script>
import axios from "axios";
import form_for_email from "@/components/FormForEmail.vue";
import form_for_password from "@/components/FormForPassword.vue";

export default {
    props: ["rem"],
    data() {
        return {
            email: null,
            registered: false,
            rememberme: true,
            selected: "form_for_email",
            progress: false,
            msg: false
        };
    },
    components: {
        form_for_email,
        form_for_password
    },
    methods: {
        get_btn_title() {
            if (this.selected === "form_for_password")
                if (this.registered) return "LOGIN";
                else return "REGISTER";
            return "NEXT";
        },
        action(arg) {
            //this.$refs.form.validate();
            this.progress = true;
            this.msg = false;
            if (this.selected === "form_for_email") this.post_email(arg);
            if (this.selected === "form_for_password") this.post_login(arg);
        },
        post_email(email) {
            // eslint-disable-next-line
            var URL = process.env.VUE_APP_BASE_URL || "";
            URL += "/post-email.json";

            var _this = this;
            axios({
                method: "post",
                url: URL,
                data: { email: email }
            })
                .then(function(response) {
                    _this.progress = false;

                    if (response.data === "OK") _this.registered = true;
                    if (response.data === "GOODFORMAT" || response.data === "OK") {
                        _this.selected = "form_for_password";
                        _this.email = email;
                        return;
                    }
                    _this.msg = response.data;
                })
                .catch(error => {
                    _this.progress = false;
                    _this.message =  "##&en Network error. ##&hu Hálózati hiba ##";
                    // eslint-disable-next-line
                    console.log(error);
                });
        },
        post_login(password) {
            // eslint-disable-next-line
            var URL = process.env.VUE_APP_BASE_URL || "";
            URL += "/post-login.json";

            var _this = this;
            axios({
                method: "post",
                url: URL,
                data: { email: this.email, password: password, rem: this.rem }
            })
                .then(function(response) {
                    _this.progress = false;

                    if (response.data === "OK") {
                        // user logged in
                        _this.$store.dispatch("load_session");
                        //_this.$router.push('/welcome');
                        _this.$emit("dialog_handler", "selector");

                        return;
                    }
                    if (response.data === "NO") _this.msg = "##&en Sorry. Wrong password. ##&hu Sajnos ez nem a megfelelő jelszó ##";
                    else _this.msg = response.data;
                    _this.progress = false;
                })
                .catch(error => {
                    _this.progress = false;
                    _this.message =  "##&en Network error. ##&hu Hálózati hiba ##";
                    // eslint-disable-next-line
                    console.log(error);
                });
        }
    },
    computed: {}
};
</script>
