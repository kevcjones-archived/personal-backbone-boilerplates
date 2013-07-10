yo-grunt-bower-backbone-handlebars-foundation
====================================

Yeoman boiler plate started this off, from there, i've made minor changes to suit personal preferences and
made this snapshot to help me get new projects off the ground quicker.

NOTE : This is a new branch purely for those projects we use foundation for instead of bootstrap.

Get Yeoman installed along with grunt-cli and bower first

To add and prep
```zsh  
  git clone -b foundation https://github.com/KevCJones/yo-backbone-handlebars-personalsetup.git NewFolderHere && npm install && bower install
```
To test it works
```zsh  
  grunt server
```
To test
```zsh  
  grunt test
```
To publish
```zsh  
  grunt build
```
  
Notes 
=====

- The handlebars generator didn't hook 100% for me so i finished it off, probably will be fixed later
- The live editing of a template didn't seem to update, added neuter to the tasks on the watch, seemed to fix
- The handlebars templates full path was used as the compiled template key, i didn't like this so i made it a sub directory of the templates root folder and removed the extension too
