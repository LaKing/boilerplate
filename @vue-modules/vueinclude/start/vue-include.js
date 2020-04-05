var v = "";

Object.keys(ß.vue_include_files).forEach(function(key) {
    v += "import '@/vue-include/" + key + "';\n";
});

ß.fs.writeFileSync(ß.VAR + '/vue/src/vue-include-files.js', v);
