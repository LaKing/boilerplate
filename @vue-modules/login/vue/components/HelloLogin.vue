<template>
    <div id="login_layout_frame" class="center"><login_layout/></div>
</template>

<script>
import login_layout from "@/components/LoginLayout.vue";

export default {
    name: "HelloLogin",
    components: {
        login_layout
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login_layout_frame {
  height: 200px;
  width: 400px;
  max-width:100%;
  background-color: powderblue;
}
  
  .center {
  margin: auto;
  width: 50%;
}
</style>
