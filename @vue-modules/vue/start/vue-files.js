const fs = ß.fs;
const path = require('path');

// write an optional set of bash files for directly operating on the frontend

var br = "\n";
let sh = "#!/bin/bash";
sh += br + "su codepad -s /bin/bash -c 'node " + ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js --mode development build'";
fs.writeFileSync(ß.VAR + '/vue/vue-development-build.sh', sh);

sh = "#!/bin/bash";
sh += br + "su codepad -s /bin/bash -c 'node " + ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js build'";
fs.writeFileSync(ß.VAR + '/vue/vue-production-build.sh', sh);

sh = "#!/bin/bash";
sh += br + "su codepad -s /bin/bash -c 'node " + ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js --mode development serve'";
fs.writeFileSync(ß.VAR + '/vue/vue-serve.sh', sh);