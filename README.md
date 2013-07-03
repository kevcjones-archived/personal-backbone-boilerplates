yo-backbone-handlebars-personalsetup
====================================

My personal version of the yeoman backbone generated project which also supports shorter template names, 
live reloads of template edits and sub folder template support.

Get Yeoman installed along with grunt-cli and bower first

To add and prep
  git clone https://github.com/KevCJones/yo-backbone-handlebars-personalsetup.git ./ && npm install && bower install

To test it works
  grunt server
  
To test
  grunt test
  
To publish
  grunt build
  
  
Notes 
=====

- The handlebars generator didn't hook 100% for me so i finished it off, probably will be fixed later
- The live editing of a template didn't seem to update, added neuter to the tasks on the watch, seemed to fix
- The handlebars templates full path was used as the compiled template key, i didn't like this so i made it a sub directory of the templates root folder and removed the extension too
