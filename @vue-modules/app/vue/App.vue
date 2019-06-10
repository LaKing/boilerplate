 <template>
    <v-app id="app" data-app> 
      <app_navigation></app_navigation> 
      <app_main></app_main> 
      <login_dialog ref="login_dialog" />
    </v-app>
</template>

<script>
import app_navigation from "@/navigation.vue";
import app_main from "@/main.vue";
import login_dialog from "@/components/LoginDialog.vue";

export default {
    name: "app",
    data: function() {
        return {};
    },
    components: {
        app_navigation,
        app_main,
        login_dialog
    },
    mounted() {
        this.$root.login_dialog = this.$refs.login_dialog;
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
