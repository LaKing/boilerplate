npm install vue

npm install vue-router

npm install vuex

npm install @vue/cli
npm install @vue/cli-service-global

npm install axios

npm install material-design-icons-iconfont
npm install vue-template-compiler

npm install @fortawesome/fontawesome-free

echo "POSTINSTALL sed -i 's/followSymlinks: false/followSymlinks: true/g' node_modules/watchpack/lib/DirectoryWatcher.js"
## we must address an issue with our way of working with symlinks. Hot reload needs to be aware that files may be symlinked.
## watchpack issue 61, https://github.com/webpack/watchpack/issues/61
sed -i 's/followSymlinks: false/followSymlinks: true/g' node_modules/watchpack/lib/DirectoryWatcher.js