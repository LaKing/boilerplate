<template>
    <v-content id="main">
            <neutrino v-for="e in list" :ctl="e"/>    
    </v-content>
</template>

<script>
  
import neutrino from "@/components/neutrino.vue";

export default {
    name: "app",
    data: function() {
      
      	// list locations/prefixes
      	var list = [];
        Object.keys(ß.NEUTRINO_PROJECT).forEach(function(device) {
            Object.keys(ß.NEUTRINO_PROJECT[device]).forEach(function(control) {
              	let e = control.split('-')[0];
              	if (list.indexOf(e) < 0) list.push(e);
            });
        });
      
        return {
        	list: list
        };
    },
    components: {
		neutrino
    },
    methods: {
        at: function(arg) {
            return this.$route.path === "/" + arg;
        }
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
