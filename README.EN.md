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
