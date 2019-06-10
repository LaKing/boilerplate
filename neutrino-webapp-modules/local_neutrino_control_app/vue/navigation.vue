<template>
    <v-toolbar app>
        <v-toolbar-items>
            <v-btn flat to="/">HOME</v-btn>
            <v-btn flat to="/boilerplate">Boilerplate</v-btn>

            <v-btn flat v-on:click="$root.login_dialog.open()">##&en Login ##&hu Bejelentkezés ##</v-btn>
        </v-toolbar-items>
      
        <v-spacer></v-spacer>
        <v-icon v-if="$store.state.isConnected" color="green">check_circle</v-icon>
        <v-icon v-if="!$store.state.isConnected" color="red">block</v-icon>

  </v-toolbar>
</template>

<script>
export default {
    name: "navigation",
    data: function() {
        return {};
    },
    components: {}
};
</script>

<style></style>
