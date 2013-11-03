/*global backboneTemplate, $, window*/

window.ctx = di.createContext();

/* Order and include as you please., this builds you a single file */

require('.tmp/scripts/templates');
require('app/components/mixins/**/*.js');
require('.tmp/components/**/*.js');
require('app/scripts/models/**/*');
require('app/scripts/collections/**/*');
require('app/scripts/routers/**/*');


ctx.initialize();




