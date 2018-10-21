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

