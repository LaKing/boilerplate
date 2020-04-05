module.exports = function() {
    const destination = ß.VAR + "/vue/src/store.js";
    const br = "\n";
    var str = "";

    str += "import Vue from 'vue'" + br;
    str += "import Vuex from 'vuex'" + br;

    Object.keys(ß.VUEX).forEach(function(key) {
        str += "import " + key + " from '" + ß.VUEX[key] + "'" + br;
    });

    str += "" + br;
    str += "Vue.use(Vuex)" + br;
    str += "export default new Vuex.Store({" + br;
    str += "strict: true," + br;

    // so lets collect our vuex modules
    str += "  modules: {" + br;

    Object.keys(ß.VUEX).forEach(function(key) {
        str += "	" + key + "," + br;
    });

    str += "	}" + br;
    str += "})" + br;

    ß.fs.writeFileSync(destination, str);
};
