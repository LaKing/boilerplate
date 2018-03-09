# ßoilerplate

ßoiler is a modular framework for Javascript based projects, mainly NodeJS web applications

## What is it good for? Why should I need this? Why am I reading this?

Think of this as two things: ß and a boilerplate.

### ß - I usually say "the boiler-variable", or it can be called Eszett (IPA: [ɛsˈtsɛt]) or "sharp S" - is a global variable and a directory structure.

Yes, yes, I know, global variables are bad, and pollute the scope. Yes, so we pollute the scope with this singe special character.
We attach functions and some objects to that variable, and this will run a modular structure to build up our project(s).

### The boilerplate itself is a modular structure to start a project with. 

The current default framework-project is a bit MEAN, but rather friendly. It uses MongoDB, Express, AngularJS, NodeJS, Passport, and many others. Take a look at the modules to get the idea. So once the whole thing is started you actually have something you can extend, override, and build further.

## Getting Started

Clone the repo into folder where you want to start your project. I usually use /srv/codepad-project, since we are workin with the etherpad based ep_codepad. 
You can make, no you should make the boilerplate folder readonly, and create a modules folder to put your own modules and to override existing modules or parts of existing modules.
Please do not modify the boilerplate content in your project! Any file that is present outside of the boilerplate folder, in the project folder will override.
So, an example of the structure would be:
```
/srv/codepad-project  # the project folder
/srv/codepad-project/boilerplate   # the readonly skeleton
/srv/codepad-project/modules   # the custom modules for the project
...
```
Take a look at the project_scripts, you may want to move it to the project, edit it eventually and run a few of them.

## Running the installer

Well, I use red Hat based systems so if you know what DNF is, you can run the installer.
You will need NodeJS and npm of course. There are some npm.sh files in the modules, these will install the node_modules of the modules.
NOTE: modules are ßoilerplat modules, and node_modules are npm packaged modules. Unfortunatley npm has no standard for example for location of publicly visible files. Some npm modules use a /dist folder, some others some different folders, so we crate wrapper modules to define express routes. 

### Other files to consider

You can start your project with server.js that you copy from the project_scripts folder. There is not much in there:
This should be sufficient if your folder structure is ok.

```
require("./boilerplate");

```
## What modules are used.

Generally, all modules are used, except if they are blacklisted, or the module-condition.js file evalutes to false. 

## My code style

Sorry, I dont like camel case so much. My variables contain some underscores and are longer. My bad.

## Others

if you see this:
```
ł(this);
Ł(some_variable, or_two_variables);
```
Don't panik. These two are just logging functions, mainly used in development.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Documentation
# The global ßoiler mechanism

## THE ß-variable
This is the primary global variable, visible in the global scope. 
Frequently used node_modules can be attached directly.
for example ß.fs is reference to the fs-extra

# The global ßoilerplate modules

## admin - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.

  boiler-lib-functions:
```javascript
    ß.lib.admin.check_if_admin(id);
    ß.lib.admin.is_master_password(password);
```
  hook.functions:
```javascript
    adminsocket.delete-user(socket);
    adminsocket.get-users(socket);
    adminsocket.save-user-profile(socket);
    adminsocket.save-user(socket);
```

## angularjs - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.


## animate - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.


## bootstrap3 - boilerplate module

- uses npm packages.
- contains static frontend assets.
- contains route definitions for the frontend.


## debug - boilerplate module


  hook.functions:
```javascript
    socket.test(socket);
```

## favicon - boilerplate module

- uses npm packages.
- contains static frontend assets.
- backend start process functions.


## fontawesome4 - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.


## frontend - boilerplate module

- contains multilingual public frontend files.
- contains route definitions for the frontend.


## googleapis - boilerplate module

- activation based on a condition.
- uses npm packages.

  exposes into the global ß scope:
```javascript
    ß.google
const
if
ß.jwtClient
```
  boiler-lib-functions:
```javascript
    ß.lib.googleapis.calendar_list_events(calendarId, callback);
    ß.lib.googleapis.calendar_update_event(calendarId, eventId, resource, callback);
    ß.lib.googleapis.spreadsheets_list(spreadsheetId, range, callback);
```

## jquery - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.


## language - boilerplate module

- backend init process functions.
- backend server process functions.
- backend start process functions.

  boiler-lib-functions:
```javascript
    ß.lib.language.change_handler();
    ß.lib.language.development();
    ß.lib.language.get_by_req(req);
    ß.lib.language.render_file(lang, file);
    ß.lib.language.request_handler();
    ß.lib.language.transpile(folder);
```

## logging - boilerplate module

- uses npm packages.
- backend start process functions.


## moment - boilerplate module

- uses npm packages.

  exposes into the global ß scope:
```javascript
    ß.moment
```

## mongoose - boilerplate module

- uses npm packages.
- backend init process functions.

  exposes into the global ß scope:
```javascript
    ß.mongoose
```
  boiler-lib-functions:
```javascript
    ß.lib.mongoose.config_mongodb();
    ß.lib.mongoose.define(name);
```
  hook.functions:
```javascript
```

## nodemailer - boilerplate module

- uses npm packages.
- backend init process functions.


## offline - boilerplate module

- contains static frontend assets.


## passport - boilerplate module

- uses npm packages.
- defines keys the user model.
- defines methods for the user model.
- contains multilingual public frontend files.
- contains route definitions for the frontend.
- backend init process functions.

  exposes into the global ß scope:
```javascript
    ß.passport
ß.bcrypt
```
  boiler-lib-functions:
```javascript
    ß.lib.passport.isLoggedIn(req, res, next);
```

## passport_facebook - boilerplate module

- uses npm packages.
- defines keys the user model.
- contains route definitions for the frontend.

  boiler-lib-functions:
```javascript
    ß.lib.passport_facebook.config_auth();
```

## passport_google - boilerplate module

- uses npm packages.
- defines keys the user model.
- contains route definitions for the frontend.

  boiler-lib-functions:
```javascript
    ß.lib.passport_google.config_auth();
```

## passport_hash - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.

  boiler-lib-functions:
```javascript
    ß.lib.passport_hash.hash(str);
    ß.lib.passport_hash.send(id);
    ß.lib.passport_hash.verify(req, res, callback);
```

## payment - boilerplate module

- defines keys the user model.
- defines methods for the user model.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.
- backend init process functions.
- backend start process functions.

  boiler-lib-functions:
```javascript
    ß.lib.payment.calculate_parameters(session, q);
    ß.lib.payment.initialize_payment(session, callback);
    ß.lib.payment.payment_success(ref);
    ß.lib.payment.paymentlibmodule.exports = that;;
    ß.lib.payment.purge(user);
    ß.lib.payment.render_page(req, res, next);
```
  calling hooks:
```javascript
    ß.run_hooks('payment_success',ref);
```

## payment_barion - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains route definitions for the frontend.
- backend init process functions.

  boiler-lib-functions:
```javascript
    ß.lib.payment_barion.get_payment_items(p);
    ß.lib.payment_barion.process_callback(ref, paymentId, callback);
    ß.lib.payment_barion.render_page(req, res, next);
```

## payment_braintree - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.
- backend init process functions.

  exposes into the global ß scope:
```javascript
    ß.braintree
```
  boiler-lib-functions:
```javascript
    ß.lib.payment_braintree.prepare_token(req, res, next, callback);
    ß.lib.payment_braintree.render_page(req, res, next);
```

## payment_simplepay - boilerplate module

- contains multilingual public frontend files.
- contains route definitions for the frontend.
- backend init process functions.

  boiler-lib-functions:
```javascript
    ß.lib.payment_simplepay.check_ipn_validation(data);
    ß.lib.payment_simplepay.generate_formdata(p);
    ß.lib.payment_simplepay.make_ipn_response(data);
    ß.lib.payment_simplepay.render_page(req, res, next);
```

## profile - boilerplate module

- defines keys the user model.
- contains multilingual public frontend files.

  hook.functions:
```javascript
    socket.save-profile(socket);
```

## promo - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains route definitions for the frontend.

  hook.functions:
```javascript
    adminsocket.add_handler(socket);
```

## server - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.
- backend init process functions.
- backend server process functions.
- backend start process functions.

  exposes into the global ß scope:
```javascript
    ß.express
    ß.socketiostream
```
  boiler-lib-functions:
```javascript
    ß.lib.server.config_mongodb();
    ß.lib.server.serve_static(folder);
```
  hook.functions:
```javascript
```
  calling hooks:
```javascript
    ß.run_hooks('socket',socket);
ß.run_hooks('adminsocket',socket);
```

## session - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains route definitions for the frontend.

  exposes into the global ß scope:
```javascript
    ß.session
```
  boiler-lib-functions:
```javascript
    ß.lib.session.update_user(session, user);
```
  hook.functions:
```javascript
    socket.session-data(socket);
```
  calling hooks:
```javascript
    ß.run_hooks("session_update_user",session,user);
```

## settings - boilerplate module

- backend init process functions.

  boiler-lib-functions:
```javascript
    ß.lib.settings.readSync();
```
  hook.functions:
```javascript
    adminsocket.get-settings(socket);
    adminsocket.save-settings(socket);
```

## smartforms - boilerplate module

- uses npm packages.
- contains multilingual public frontend files.
- contains static frontend assets.
- contains route definitions for the frontend.
- backend start process functions.

  boiler-lib-functions:
```javascript
    ß.lib.smartforms.get_smartform_schema(file);
```

## szamlazz - boilerplate module

- uses npm packages.
- contains route definitions for the frontend.
- backend init process functions.

  exposes into the global ß scope:
```javascript
    ß.szamlazz
```
  boiler-lib-functions:
```javascript
    ß.lib.szamlazz.get_client(payment);
    ß.lib.szamlazz.get_seller(payment);
    ß.lib.szamlazz.makeInvoice(userid, paymentid);
```
  hook.functions:
```javascript
    payment_success.make_invoice(ref);
```
  calling hooks:
```javascript
    ß.run_hooks('invoice_created',{
```

## verify - boilerplate module

- uses npm packages.

  boiler-lib-functions:
```javascript
    ß.lib.verify.email(address, callback);
```

