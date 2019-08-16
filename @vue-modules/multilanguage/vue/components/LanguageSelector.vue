<template>
    <v-btn text @click="set_language('##&en hu ##&hu en ##')">##&en hu ##&hu en ##</v-btn>
</template>

<script>
import ß from "ß";
import axios from "axios";

export default {
    data: () => ({
        app_languages: Object.keys(ß.APP_LANGUAGES)
    }),
    methods: {
        set_language: function(lang) {
            // eslint-disable-next-line
            var url = "https://" + ß.HOSTNAME + "/post-lang-" + lang + ".json";
          console.log(lang);
            axios({
                method: "post",
                url: url
            })
                .then(function(response) {
                    console.log(response);
              location.reload();

                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
