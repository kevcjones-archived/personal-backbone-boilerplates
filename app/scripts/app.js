/*global backboneTemplate, $, window*/

window.ctx = di.createContext();

/* Order and include as you please., this builds you a single file */

require('.tmp/scripts/templates');
require('app/components/mixins/**/*.js');

//require('app/components/**/*.js'); // dependencies kept within components e.g. vendors it uses // conditional includes
require('.tmp/components/**/*.js'); //jsx => js files

require('app/scripts/models/**/*');
require('app/scripts/collections/**/*');
require('.tmp/scripts/routers/**/*');


ctx.initialize();




