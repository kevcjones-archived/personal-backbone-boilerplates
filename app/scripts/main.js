/*global backboneTemplate, $*/


window.backboneTemplate = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        console.log('Hello from Backbsone!!!!');
    }
};

/* Order and include as you please. */
require('.tmp/scripts/templates');
require('app/scripts/views/*');
require('app/scripts/models/*');
require('app/scripts/controllers/*');
require('app/scripts/routers/*');

$(document).ready(function () {
    backboneTemplate.init();
    $('div.hero-unit').append(JST.test2());
});
