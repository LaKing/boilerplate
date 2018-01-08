# ßoilerplate

ßoiler is a modular framework for Javascript based projects, mainly web applications

## What is it good for? Why should I need this? Why am I reading this?

Think of this as two things: ß and a boilerplate.

### ß - I usually say "the boiler-variable", or it can be called Eszett (IPA: [ɛsˈtsɛt]) or "sharp S" - is a global variable and a directory structure.

Yes, yes, I know, global variables are bad, and pollute the scope. Yes, so we pollute the scope with this singe special character.
We attach functions and some objects to that variable, and this will run a modular structure to build up our project(s).

### The boilerplate itself is a modular structure to start a project with. 

Take a look at the modules to get the idea. So once the whole thing is started you actually have something you can extend, override, and build further.

## Getting Started

Clone the repo into folder where you want to start your project. I usually use /srv/codepad-project.
You can make the boilerplate folder readonly, and create a modules folder to put your own modules and to override existing modules or parts of existing modules.
Please do not modify the boilerplate content in your project!
Take a look at the project_scripts, you may want to move it to the project, edit it eventually and run a few of them.

## Running the installer

Well, I use red Hat based systems so if you know what DNF is, you can run the installer.

You will need NodeJS and npm of course. There are some npm.sh files in th emodules, these will install the node_modules of the modules.

### Other files to consider

You can start your project with server.js that you copy from the project_scripts folder. There is not much in there:

```
require("./boilerplate");

```

## My code style

Sorry, I dont like camel case so much. My variables contain some underscores and are longer. My bad.

## Others

if you see this:
```
ł(this);
Ł(some_variable, or_two_variables);
```
Don't panik. These two are just logging functions.

## Documentation

Well, sorry, there is no documentation yet.

Just rush through the files of the global folder and bug me to write some. Sorry, I'm in a rush.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
