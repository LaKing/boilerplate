// @DOC The `Ł` debug function has been implemented for the vue frontend!

// write a debuglog.js with a default export to use Ł();
var es6_debuglog_file = ß.VAR + "/debuglog.js";
var es6_debuglog = "";
es6_debuglog += "// extract the file wich may be the caler\n";
es6_debuglog += "function link_code(arg) {\n";
es6_debuglog += "   var e = arg.split('./src').pop().split('?')[0];\n";
es6_debuglog += "   if (e) return '@' + e; \n";
es6_debuglog += "   return arg; \n";
es6_debuglog += "}\n\n";
es6_debuglog += "// the debuglog function from boilerplate\n";
es6_debuglog += "export default function Ł(){ \n";
es6_debuglog += "   var stack = new Error().stack;\n";
es6_debuglog += "   var from = link_code(stack.split('\\n')[2]);\n";
es6_debuglog += "   console.log('┏━━━ ŁOG', new Date().toTimeString());\n";
es6_debuglog += "   for (let arg in arguments) {\n";
es6_debuglog += "       console.log('┠─  ', arguments[arg]);\n";
es6_debuglog += "       }\n";
es6_debuglog += "   console.log('┗━━━━', from);\n";
es6_debuglog += "};\n\n";

if (ß.MODE === "production") ß.fs.writeFileSync(es6_debuglog_file, "export default function Ł(){ console.log('DEBUGLOG is disabled in production') };");
else ß.fs.writeFileSync(es6_debuglog_file, es6_debuglog);
ß.fs.chownSync(es6_debuglog_file, ß.UID, ß.GID);
