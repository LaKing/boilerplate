# ßoilerplate.JS

A modular framework for NodeJS based applications.

## What is it good for? Why should I need this? Why am I reading this?

Think of it as two things: 
    ß - the modular mechanism.
    Boilerplate - the stack you start with.

### ß - I usually say "the boiler-variable", or it can be called Eszett (IPA: [ɛsˈtsɛt]) or "sharp S" - is a global variable on the server side.

Yes, yes, I know, global variables are bad, and pollute the scope. Yes, so we pollute the scope with this special character, propably never used anywhere else.
We attach functions and some objects to that variable, and this will run a modular structure to build up our project(s).

### The boilerplate itself is a modular structure to start a project with. 

The current default framework-project is a bit MEAN, but rather friendly. It uses MongoDB, Express, AngularJS, NodeJS, Passport, and many others. 
Take a look at the modules to get the idea. So once the whole thing is started you actually have something you can extend, override, and build further.

## Getting Started

Clone the repo into folder where you want to start your project. I usually use /srv/codepad-project, since we are workin with the etherpad based ep_codepad. 
You can make, no you should make the boilerplate folder readonly, and create a modules folder to put your own modules and to override existing modules or parts of existing modules.
Please do not modify the boilerplate content in your project! Any file that is placed properly outside of the boilerplate folder in the project folder, will override the file while loading.
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
NOTE: modules are ßoilerplat modules, and node_modules are npm packaged modules. Unfortunatley npm has no standard for example for location of publicly visible files in a web project. Some npm modules use a /dist folder, some others some different folders, so we need to crate wrapper modules to define express routes. 

### Other files to consider

You can start your project with server.js that you copy from the project_scripts folder. There is not much in there:
This should be sufficient if your folder structure is ok.

```
require("./boilerplate");

```
## What modules are used.

In addition to the modules folder, all folders in the working directory that have '-modules' in their name will be considered as a set of modules.
They are processed sequentially, however if a -modules folder is prefixed with @ it will be considered a boilerplate factory module, and has lower priority as othe modules. 
The module-condition.js file if present, has to evalute to true. 

## My code style

Sorry, I dont like camel case so much. My variables contain some underscores and are longer. My bad.

## Other special characters

if you see this:
```
ł(some_vairable, or_tow_variables);
Ł(some_variable, or_two_variables); // logs with info on where it happened
```
Don't panik. These two are just logging functions, mainly used in development.

```
đ(err); // not so fatal, log and continiue
Đ(error); // fatal error, log and throw
```

Don't panik either. These two are determinator functions, that handle errors.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
