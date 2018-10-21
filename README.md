# ßoilerplate

A modular framework for NodeJS based applications.

## What kind of sorcery is this?

On one hand the `ß` object, the modular loader mechanism. The code is defined in the boilerplate/global folder.  
On the other hand the boilerplate for your application - the stack you start with, that will be customized. The modules in the boilerplate folder.  

## What is it good for? Why should I need this? Why am I reading this?

On one hand this is a method to reduce complexity, to organize code, to put it to a reuseable form, to create your own modules.
On the other hand a starting point with some common features already implemented.

You may need something like that if you have several projects that need to organised, that need to have a structure.

### ß - I usually say "the boiler-variable", or it can be called Eszett (IPA: [ɛsˈtsɛt]) or "sharp S" - is a global variable on the server side.

Yes, yes, I know, global variables are bad, and pollute the scope. Yes, so we pollute the scope with this special character, never used anywhere else.
We attach functions and some objects to that variable, and this will run a modular structure to build up our project(s).

### The boilerplate itself is a modular structure to start a project with. 

The current default framework-project is a bit MEAN, but rather friendly. It uses MongoDB, Express, AngularJS, NodeJS, Passport, and many others. 
Take a look at the modules to get the idea. So once the whole thing is started you actually have something you can extend, override, and build further.
There are certain ways things are achived, and you may need to look at it, but hey, you can override ANY part of the code, by design its just a skeleton.

To explain the philosophy a bit better, a project get's unique as files are re-defined.  
There are two kinds of modules, custom modules with priority and factory modules that have parent folders starting with the `@` character.
A project may have a module in both of these folders, in that case if a file is present in a custom module, it has priority over the factory module.

Let me give you an example. In project test we have a `modules` folder containing the `frontend` module which is also symlinked in `@-modules`, but the only file it contains is `public/main.html`.
In that case this main.html defins the main page for the project, overriding the default.

Every function, every hook, every frontend file, everything can be customized.

Note: CWD is a module itself as well.

## Getting Started

Download / mount / Clone the git repo into folder where you want to start your project. We usually use `/srv/codepad-project`, since we are working with codepad. 
By the way, the latest codepad implementation also uses the boilerplate but with a complete different set of modules. It implements a collaborative online code editor.

You can make, no you should make the boilerplate folder readonly, and create at least one `modules` folder to put your own modules and to override existing modules or parts of existing modules.
Please do not modify the boilerplate content in your project! Any file that is placed properly outside of the boilerplate folder in the project folder, will override the file while loading.
So, an example of the structure would be:
```
/srv/codepad-project  # the project folder (CWD)
/srv/codepad-project/boilerplate   # the readonly folder (BPD)
/srv/codepad-project/@-modules   # contains symlinks to the readonly modules used
/srv/codepad-project/modules   # the custom modules for the project (with priority over @-modules)
/srv/codepad-project/configs   # the project configuration files
/var/boilerplate   # runtime files
...
```
There is a folder called `boilerplate/project_scripts`, that contains bash scripts to achive this structure.  
Run the following to copy the scripts into the working directory. (You may edit these files if you have different folders)
``` 
cd /srv/codepad-project/boilerplate/project_scripts
bash install_project_scripts.sh
```
Once the scripts are placed in your working directory (CWD), you can run:
```
cd /srv/codepad-project 
bash install.sh
```

## Running the installer

Well, I use red Hat based systems so if you know what DNF is, you can run the installer.
You will need NodeJS and npm of course. There are some npm.sh files in the modules, these will install the node_modules of the ß-modules.
NOTE: `modules` are ßoilerplat modules, and `node_modules` are npm packaged modules. Unfortunatley npm has no standard for example for location of publicly visible files in a web project. Some npm modules use a `/dist` folder, while some others use some different folder, so we need to crate wrapper modules to define express routes for example. The point is, `node_modules` are not to be confused with ß-modules.

You can start your project with `start.sh` or `server.js` that you copy from the `project_scripts` folder, and add pre-defined constants or variables.

## What modules are used.

In addition to the modules folder, all folders in the working directory that have 'modules' in their name will be considered as a set of modules. (Except `node_modules`)
They are processed sequentially, however if a modules folder is prefixed with `@` it will be considered a boilerplate factory module, and has lower priority as the other modules. 
A module-condition.js file if present, has to evalute to true. A list of modules is printed into `/var/boilerplate/debug` 

## Other special characters

if you see this:
```
ł(some_vairable, or_two_variables); // same as console.log
Ł(that, or_what, something); // extended logs with info on where it happened
```
Don't panik. These two are just logging functions, mainly used in development.

```
đ(err); // not so fatal, log and continiue
Đ(error); // fatal error, log and throw
```

Don't panik either. These two are determinator/detonator functions, that handle errors.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details



[@/boilerplate/README.EN.md]

## THE ß object

The boilerplate module framework uses a "ß namespace" to store constants and references to functions across it's modules.  
This namespace is attached to the `ß` primary global variable, visible in the global scope. Frequently used node_modules can be attached directly.
You can pre-create the ß variable in your server.js file before loading the boilerplate, to pre-define global constants.

A custom `server.js` with debug-mode may look like this.  
```
// Pre-declare ß so constants and functions can be attached.
global.ß = {};
// Set the DEBUG constant to true
ß.DEBUG = true;
```
The entry point to boot the framework is then:
```
require("./boilerplate");
```


[@/boilerplate/global/bp.js line 3]

## Logging, Throwing
### Global logging  ```ł``` and ```Ł``` functions to be used in development
Place temporary ```console.log()``` functions with short special characters, they can be tracked down within the project.  
```ł()``` is an alias for a simple console-log.  
```Ł()``` is an enhanced console-log that prints arguments in seperate lines, and indicates where it has been called from.  
When codepad-style logging is enabled it is printed in html form.


[@/boilerplate/global/codepad.js line 84]

### Global  determinator ```đ``` and the detonator ```Đ``` error-handlers.
Should the determinator function ```đ(err);``` recieve an error as argument, it will log the error, then execution will continiue.
On the other hand the detonator ```Đ(err);``` will log the error and ```thow```, thus exit the current process.
Both functions can display codepad-styled html with link to the execution stack sourcefile.


[@/boilerplate/global/codepad.js line 115]

## Module hooks
Hooks are similar to lib-functions, however, multiple hooks from multiple modules are called when calling `ß.run_hook` or `ß.run_hooks`.
Hooks are defined with module.exports = function(arguments) within js files with the naming schema `module/hooks/hookname.function-name.js`
The hookname is the reference for the call, the function-name should be a descriptive custom name, programatically unused.
As always, hooks definied within the project-modules take precedence over @boilerplate-modules. Hooks may have multiple arguments.
A development-debug log is generated in the `ß.VAR` directory.


[@/boilerplate/global/hook.js line 7]

## Constants

`ß.DEBUG` is a boolean constant  
`ß.CWD` stands for the Current Work Directory  
`ß.BPD` is the Boilerplate Directory  
`ß.VAR` has the path for runtime variables  
`ß.HOSTNAME` should be the FQDN hostname  
`ß.MRD` is the module root directory


[@/boilerplate/global/index.js line 3]

## Lablib - builtin logging

There are four builtin logging functions in the ß namespace, that even have nice colors when codepad-formatted html logging is enabled.  
These logs are written to a file, and should contain business-logic logs.

`ß.log()` a gray logmessage
`ß.msg()` logs a green message  
`ß.ntc()` a yellow notice  
`ß.err()` red error  
`ß.debug()` only if debug mode is enabled, logs with a blue line


[@/boilerplate/global/lablib.js line 14]

## Module libs

Each module may have a `/lib` folder with js files, each file containing a single function automatically exposed on the `ß.lib` namespace. 
Such a function should be defined with `module.exports = function(arguments) {}`
These are then named by their filename and can be referred with `ß.lib.modulename.functionname` (namespaced with module names) or `ß.lib.functionname` (direct lib namespace)
lib-function files in `@-modules` have lower precedence over custom modules, thus if defined with priority, they will be overridden.
The function-defining js files may contain private local variables and functions, and any number of arguments.


[@/boilerplate/global/lib.js line 7]

## Module dir loading
There is a command to `require()` all files in a dir of all modules.  
This is done by passing a 'dir' name as an argument to `ß.load();`. 
It will load all the files in this, first in all the custom modules, then in the '@-modules' while honoring custom modules with priority.
```
/init
/server
/routes (via server/server.js)
/start
/debug (only if debug mode is on)
```


[@/boilerplate/global/load.js line 5]

## ßoilerplate timestamp functions
Simple date functions  
`ß.now()` returns yyyy-mm-dd hh:mm:ss format  
`ß.date()` returns yyyy-mm-dd format  
`ß.time()` returns dd hh:mm:ss format  
`ß.DATE` and `ß.TIME` are constant stamps created at bootup


[@/boilerplate/global/now.js line 3]

A note on logging. According to https://stackoverflow.com/questions/41502564/journalctl-user-units-output-disappears
user-services do not appear on unit logs. As a workaround use journalctl without unit definitions. For example jurnalctl -f


[@/boilerplate/global/process.js line 3]

# Module's Documentation

## The codepad-project module
#### 
<pre>
@-modules
 - admin
 - angularjs
 - animate
 - bootstrap3
 - favicon
 - fontawesome4
 - frontend
 - frontendlib
 - googleapis
 - jquery
 - language
 - logging
 - mobile_detect
 - moment
 - mongo_express
 - mongoose
 - nodemailer
 - offline
 - passport
 - passport_facebook
 - passport_google
 - passport_hash
 - payment
 - payment_barion
 - payment_braintree
 - payment_simplepay
 - profile
 - promo
 - readme
 - server
 - session
 - settings
 - smartforms
 - szamlazz
 - verify
boilerplate
 - .git
 - .gitignore
 - @admin-modules
 - @core-modules
 - @frontend-modules
 - @googleapis-modules
 - @javascript-modules
 - @marketing-modules
 - @passport-modules
 - @payment-modules
 - LICENSE.md
 - README.EN.md
 - README.HU.md
 - README.md
 - cli.js
 - cli.sh
 - global
 - index.js
 - project_scripts
 - version
config
 - admin-passports.json
 - admin-passwords.json
 - language.json
 - mongodb.json
 - passport_facebook.json
 - passport_google.json
 - payment_barion.debug.json
 - payment_barion.json
 - payment_braintree.json
 - payment_simplepay.json
 - sessions-mongodb.json
 - settings.json
 - szamlazz.json
log
 - 2018-10-20
 - 2018-10-21
var
 - boilerplate
 - debug
 - editor
 - local
 - log
</pre>



## The @admin module
#### /boilerplate/@admin-modules/admin
<pre>
hooks
 - adminsocket.delete-user.js
 - adminsocket.get-users.js
 - adminsocket.save-page.js
 - adminsocket.save-user-profile.js
 - adminsocket.save-user.js
lib
 - check_if_admin.js
 - is_master_password.js
public
 - admin-navigation.html
 - admin-settings.html
 - admin-users.html
 - admin.adminController.js
 - admin.editorController.js
 - admin.ejs
 - admin.promoController.js
 - admin.settingsController.js
 - admin.usersController.js
routes
 - admin-index.js
 - admin-jsoneditor.js
static
 - admin.css
</pre>



## The @angularjs module
#### /boilerplate/@core-modules/angularjs
<pre>
public
 - app.alertService.js
 - app.loginController.js
 - app.rootScope.js
 - app.socket.js
routes
 - angularjs.js
static
 - app.alertService.css
 - app.angularjs.css
</pre>



## The @animate module
#### /boilerplate/@frontend-modules/animate
<pre>
routes
 - animate.js
</pre>



## The @bootstrap3 module
#### /boilerplate/@frontend-modules/bootstrap3
<pre>
routes
 - bootstrap.js
static
 - common.css
</pre>



## The @favicon module
#### /boilerplate/@frontend-modules/favicon
<pre>
start
 - favicon.js
static
 - favicon.ico
</pre>



## The @fontawesome4 module
#### /boilerplate/@frontend-modules/fontawesome4
<pre>
routes
 - font-awesome.js
</pre>



## The @frontend module
#### /boilerplate/@core-modules/frontend
<pre>
public
 - app.mainController.js
 - index.ejs
 - main.html
 - maindata.json
 - navigation.html
routes
 - siteindex.js
</pre>



## The @frontendlib module
#### /boilerplate/@core-modules/frontendlib
<pre>
global
 - frontend_files.js
 - frontendlib.js
</pre>



## The @jquery module
#### /boilerplate/@frontend-modules/jquery
<pre>
routes
 - jquery.js
</pre>



## The @language module
#### /boilerplate/@core-modules/language
<pre>
init
 - functions.js
 - variable.js
lib
 - change_handler.js
 - development.js
 - get_by_req.js
 - render_editor_file.js
 - render_file.js
 - request_handler.js
 - transpile.js
 - update_user_lang.js
server
 - transpiling.js
start
 - development.js
 - handlers.js
user_model
 - keys
</pre>



## The @logging module
#### /boilerplate/@core-modules/logging
<pre>
hooks
 - adminsocket_log.data.js
lib
 - get_logs_json.js
public
 - admin-logs.html
 - admin.logsController.js
routes
 - admin-logs.js
start
 - morgan.js
</pre>



## The @mobile_detect module
#### /boilerplate/@core-modules/mobile_detect
<pre>
init
 - mobile_detect.js
routes
 - is_mobile.js
</pre>



## The @moment module
#### /boilerplate/@javascript-modules/moment
<pre>
global
 - moment.js
</pre>



## The @mongo_express module
#### /boilerplate/@admin-modules/mongo_express
<pre>
start
 - mongo_express.js
 - mongo_express_config.js
</pre>



## The @mongoose module
#### /boilerplate/@core-modules/mongoose
<pre>
global
 - mongoose.js
init
 - mongoose.js
lib
 - config_mongodb.js
 - define.js
mongo-scripts
 - dropall.js
 - showall.js
start
 - db.js
</pre>



## The @nodemailer module
#### /boilerplate/@core-modules/nodemailer
<pre>
init
 - transporter.js
</pre>



## The @offline module
#### /boilerplate/@frontend-modules/offline
<pre>
static
 - offline.css
 - offline.html
</pre>



## The @passport module
#### /boilerplate/@passport-modules/passport
<pre>
global
 - passport.js
hooks
 - user_registration.send_hash.js
init
 - serialization.js
 - user.js
lib
 - isLoggedIn.js
 - isLoggedInAdmin.js
passport
 - local-login.js
 - local-signup.js
public
 - app.loginDirective.js
 - connect-local.ejs
 - login-template.html
 - login.ejs
 - login.html
 - profile.ejs
 - signup.ejs
 - user.ejs
routes
 - connect_local.js
 - delete.js
 - login.js
 - logout.js
 - post-email.js
 - post-login.js
 - profile.js
 - request-email.js
 - signup.js
 - unlink_local.js
 - update-email.js
 - update-password.js
 - user.js
user_model
 - keys
 - methods
</pre>



## The @passport_facebook module
#### /boilerplate/@passport-modules/passport_facebook
<pre>
lib
 - config_auth.js
passport
 - facebook.js
routes
 - auth_facebook.js
 - connect_facebook.js
 - unlink_facebook.js
user_model
 - keys
</pre>



## The @passport_google module
#### /boilerplate/@passport-modules/passport_google
<pre>
lib
 - config_auth.js
passport
 - google.js
routes
 - auth_google.js
 - connect_google.js
 - unlink_google.js
user_model
 - keys
</pre>



## The @passport_hash module
#### /boilerplate/@passport-modules/passport_hash
<pre>
lib
 - hash.js
 - send.js
 - verify.js
passport
 - local-hash.js
routes
 - hash.js
</pre>



## The @payment module
#### /boilerplate/@payment-modules/payment
<pre>
init
 - payment.js
lib
 - calculate_parameters.js
 - initialize_payment.js
 - payment_success.js
 - paymentlib.js
 - purge.js
 - render_page.js
payment_model
 - keys
public
 - invoices.html
 - payment.ejs
routes
 - clearpayment.js
 - payment.js
start
 - currency.js
static
 - images
user_model
 - keys
 - methods
</pre>



## The @payment_barion module
#### /boilerplate/@payment-modules/payment_barion
<pre>
init
 - init.js
lib
 - get_payment_items.js
 - process_callback.js
 - render_page.js
public
 - barion.ejs
routes
 - barion-callback.js
 - barion-payment.js
 - barion-return.js
 - payment-barion.js
</pre>



## The @payment_braintree module
#### /boilerplate/@payment-modules/payment_braintree
<pre>
global
 - braintree.js
init
 - init.js
lib
 - prepare_token.js
 - render_page.js
public
 - braintree.ejs
routes
 - braintree-payment.js
 - payment-braintree.js
static
 - dropin.min.js
</pre>



## The @payment_simplepay module
#### /boilerplate/@payment-modules/payment_simplepay
<pre>
init
 - init.js
lib
 - check_ipn_validation.js
 - generate_formdata.js
 - make_ipn_response.js
 - render_page.js
public
 - simplepay.ejs
routes
 - payment-simplepay.js
 - simplepay-callback.js
 - simplepay-ipn.js
</pre>



## The @profile module
#### /boilerplate/@passport-modules/profile
<pre>
hooks
 - socket.save-profile.js
public
 - app.profileController.js
 - profile.html
 - profile.json
user_model
 - keys
</pre>



## The @promo module
#### /boilerplate/@marketing-modules/promo
<pre>
hooks
 - adminsocket.add_handler.js
public
 - admin-promo.form.json
 - admin-promo.html
 - promo.ejs
routes
 - promo-image.js
 - promo.js
</pre>



## The @readme module
#### /boilerplate/@core-modules/readme
The README for the project is served under the ```/README``` url.


[@/boilerplate/@core-modules/readme/routes/readme.js line 7]

This module generates a readme automatically from comments that are marked with the ```@DOC``` tag at start.
   Both, single-line and multiline comments can be used. When the project is started source files are parsed and marked document blocks extracted.


[@/boilerplate/@core-modules/readme/start/autodoc.js line 3]

<pre>
routes
 - readme.js
start
 - autodoc.js
static
 - github-markdown.css
</pre>



## The @server module
#### /boilerplate/@core-modules/server
## Express
Express is used by default in development mode, with the default Cache-Control max-age 0.  
If the ```ß.static_options``` is ```undefined``` at inicialization, it will set max-age to 24h if production env. var is set.  
It is recommended to use ```ß.static_options``` for express static server routes.


[@/boilerplate/@core-modules/server/global/express.js line 6]

Static assets like css files can be placed in any module or the project root, in a /static folder


[@/boilerplate/@core-modules/server/routes/serve_static.js line 3]

Data representing assets like json files can be placed in any module or the project root, in a /data folder


[@/boilerplate/@core-modules/server/routes/serve_static.js line 6]

<pre>
global
 - express.js
 - path.js
 - socketiostream.js
lib
 - config_mongodb.js
 - serve_files.js
 - serve_static.js
routes
 - serve_static.js
 - socketio-stream.js
server
 - server.js
start
 - socketio.js
</pre>



## The @session module
#### /boilerplate/@core-modules/session
<pre>
global
 - express-session.js
hooks
 - socket.session-data.js
lib
 - update_user.js
public
 - app.session.js
 - session-test.html
routes
 - session.js
</pre>



## The @settings module
#### /boilerplate/@core-modules/settings
<pre>
global
 - settings_file.js
hooks
 - adminsocket.get-settings.js
 - adminsocket.save-settings.js
init
 - init.js
lib
 - readSync.js
</pre>



## The @smartforms module
#### /boilerplate/@frontend-modules/smartforms
<pre>
lib
 - get_smartform_schema.js
public
 - smartforms-bootstrap3.html
 - smartforms-bootstrap4.html
 - smartforms.html
 - smartforms.js
routes
 - ng-file-upload.js
start
 - uploads.js
static
 - smartforms.css
</pre>



## The @szamlazz module
#### /boilerplate/@payment-modules/szamlazz
<pre>
global
 - szamlazz.js
hooks
 - payment_success.make_invoice.js
init
 - init.js
lib
 - get_client.js
 - get_seller.js
 - makeInvoice.js
routes
 - invoice-localdata.js
</pre>



## The @verify module
#### /boilerplate/@core-modules/verify
Email-verify via SMTP connection.
Fails if there is no address, etc, ..


[@/boilerplate/@core-modules/verify/lib/email.js line 3]

<pre>
lib
 - email.js
</pre>



