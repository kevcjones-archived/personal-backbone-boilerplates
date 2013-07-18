Backbone Snapshots
====================================

Getting a little complicateed now to manage so i'm going to use the root readme to explain a little better.

Originally i've used yeoman to get my boilerplate code up and running and since then, i've been adding/changin things
sometimes because of bugs being ironed out by other 3rd parties as things change quickly and sometimes because the
cocktail of tech i want isn't quite out there as i want it...

As i update each branch i'll add a new link here now with what makes it different from the original master branch.

Master branch tech cocktail :

- Yeoman + Grunt + Bower generating the Backbone Generator
- Handlebars templating
- Mocha + Chai + PhantomJS
- Twitter Bootstrap for styling with Compass/SCSS configured
 

Branches
========

Foundation - https://github.com/KevCJones/yo-backbone-handlebars-personalsetup/tree/foundation
- Removed Bootstrap , added Foundation (Compass standalone version)
 
JasmineFoundation - https://github.com/KevCJones/yo-backbone-handlebars-personalsetup/tree/jasminefoundation
- Removed Mocha+Chai , added Jasmine for testing

JasmineCasper - https://github.com/KevCJones/yo-backbone-handlebars-personalsetup/tree/jasminecasper
- Added support for Casper JS as well as Jasmine. Casper JS has better screen shot and navigation testing from what i've played with so far.



Setup
=============

Follow Yeoman.io's setup first for the Yeoman, Bower, Grunt Stack. Also be sure you have installed Compass (using the compass gem) and for later branches the CasperJS (via brew i recommend)

To add and prep
```zsh  
  git clone https://github.com/KevCJones/yo-backbone-handlebars-personalsetup.git - branchnamehere './.' && npm install && bower install
```
To make sure you have installed the bower modules inside test as well

```zsh  
  cd test && bower install && cd ..
```
OR (after Casper Branch)

```zsh  
  cd test/jasmine && bower install  && cd .. && cd ..
```
To test it runs
```zsh  
  grunt server
```
To test
```zsh  
  grunt test
```
OR if using CasperJS branches 

Jasmine tests
```zsh  
  grunt test-jasmine
```
```zsh  
  grunt test-casperjs
```


To publish
```zsh  
  grunt build
```
