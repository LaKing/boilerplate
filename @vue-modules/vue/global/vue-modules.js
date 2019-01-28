// @DOC we create a `ß.vue_modules` object, which is a subset of `ß.modules`.

// this is how we determine what modules we actually need for vue
var vue_module_filter = function(module, dir) {
    // returns true if it is considered a vue module

    let name = ß.get_modulefolder_name(dir);
    // we need vue modules that either are in a vue -modules modulefolder
    if (name === "vue-modules" || name === "@vue-mmodules") return true;
    // or have a vue folder
    return ß.fs.existsSync(dir + "/vue");
};

ß.vue_modules = ß.modules_subset_by_filter(vue_module_filter);

