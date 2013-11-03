Backbone Snapshots
====================================

Getting a little complicateed now to manage so i'm going to use the opening part of the readme to explain a little better.

Originally i've used yeoman to get my boilerplate code up and running and since then, i've been adding/changin things
sometimes because of bugs being ironed out by other 3rd parties as things change quickly and sometimes because the
cocktail of tech i want isn't quite out there as i want it...

As i update each branch i'll add a new link here now with what makes it different from the original master branch.

Master branch tech cocktail :

- Handlebars templating
- Mocha + Chai + PhantomJS
- Twitter Bootstrap for styling with Compass/SCSS configured
 

Branches
========

Foundation - 
- Removed Bootstrap , added Foundation (Compass standalone version)
 
JasmineFoundation - 
- Removed Mocha+Chai , added Jasmine for testing

JasmineCasper - 
- Added support for Casper JS as well as Jasmine. Casper JS has better screen shot and navigation testing from what i've played with so far.

ReactBacbone -
- I removed Foundation, killed the Backbone view system to try out ReactJS. This is all in a build step automatically.


JasmineCasper Setup
======================

Follow Yeoman.io's setup first for the Yeoman, Bower, Grunt Stack. Also be sure you have installed Compass (using the compass gem) and for later branches the CasperJS (via brew i recommend)

To add and prep
```zsh  
  git clone -b jasminecasper https://github.com/KevCJones/yo-backbone-handlebars-personalsetup.git './.' && npm install && bower install
```
To make sure you have installed the bower modules inside test as well

```zsh  
  cd test/jasmine && bower install  && cd .. && cd ..
```
To test it runs
```zsh  
  grunt server
```
To test

Jasmine tests
```zsh  
  grunt test-jasmine
```
Casper tests
```zsh  
  grunt test-casperjs
```


To publish
```zsh  
  grunt build
```
