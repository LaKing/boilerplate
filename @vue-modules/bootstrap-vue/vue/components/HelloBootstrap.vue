<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
		<b-jumbotron header="Bootstrap Vue" lead="Bootstrap 4 Components for Vue.js 2" >
  			<p>For more information visit website</p>
  			<b-btn variant="primary" href="#">More Info</b-btn>
		</b-jumbotron>
    </div>
</template>

<script>
    import Vue from 'vue';
    import BootstrapVue from 'bootstrap-vue';
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';
  
    Vue.use(BootstrapVue);
  
    export default {
        name: 'HelloBootstrap',
        props: {
            msg: String
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>