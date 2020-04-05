<template>
    <div>
        Hello payment<br />
        <v-btn text @click="start_payment()">{{ payment }} Payment</v-btn>
        <br />
        {{ response }}
        _____________________

        <paypal description="Some payment" :price="100" currency="EUR"></paypal>
    </div>
</template>

<script>
//import paypal from "@/components/paypal-checkout.vue";

import axios from "axios";

export default {
    name: "payment",
    data: function() {
        return {
            debug: ß.DEBUG,
            payment: ß.PAYMENT,
            response: ""
        };
    },
    components: {
        // use it if the paypal module is enabled
        //paypal
    },
    methods: {
        start_payment: function() {
            var _this = this;
            axios({
                method: "post",
                url: "/start-payment.json"
            })
                .then(function(response) {
                    _this.response = response.data;
                    if (response.data.redirect) {
                        window.location = response.data.redirect;
                    } else {
                        console.log(response);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style></style>
