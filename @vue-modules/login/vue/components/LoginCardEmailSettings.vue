<template>
    <v-card-text>
        <v-container grid-list-md> <form_for_email @return="action" v-bind:btn_title="get_btn_title()" /> </v-container>
        <v-container>
            <v-alert v-show="msg" :value="true" type="error" color="rgba(255, 0, 0, 0.5)" class="text-sm-left">{{ msg }}</v-alert>
            <v-progress-circular v-show="progress" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-container>
    </v-card-text>
</template>

<script>
import axios from "axios";
import form_for_email from "@/components/FormForEmail.vue";

export default {
    data() {
        return {
            email: null,
            progress: false,
            msg: false
        };
    },
    components: {
        form_for_email
    },
    methods: {
      get_btn_title() {
            if (this.msg) return null;
            return "UPDATE";
        },
        action(arg) {
            //this.$refs.form.validate();
            this.progress = true;
            this.msg = false;
            this.post_email(arg);
        },
        post_email(email) {
            // eslint-disable-next-line
            var URL = process.env.VUE_APP_BASE_URL || "";
            URL += "/post-email-update.json";

            var _this = this;
            axios({
                method: "post",
                url: URL,
                data: { email: email }
            })
                .then(function(response) {
                    _this.progress = false;

                    console.log(response.data);
                    if (response.data === "OK") _this.msg = "##&en Please check your mailbox ##&hu Ellenőrizze póstafiókját ##";
                    else _this.msg = response.data;
                })
                .catch(error => {
                    _this.progress = false;
                    _this.message = "##&en Network error. ##&hu Hálózati hiba ##";
                    // eslint-disable-next-line
                    console.log(error);
                });
        }
    },
    computed: {}
};
</script>
