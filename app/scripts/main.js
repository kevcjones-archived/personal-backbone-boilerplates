/*global backboneTemplate, $, window*/


window.myApp = new (Backbone.View.extend({

    /**
     * this is the namespace scoping for your Backbone extended classes
     */
    classes:{
        models: {},
        collections: {},
        views: {},
        routers: {}
    },

    /**
     * these are the instances of your objects in memory when you create them
     */
    models: {},
    collections: {},
    views: {},
    routers: {},


    /**
     * Initialise the app, load what needs to be loaded now and render that, decide accordingly what needs preloading and what does not.
     * @param options contains settings you want to pass to the app
     */
    start: function () {

        myApp.models.example = new myApp.classes.models.ExampleModel({});

        myApp.views.example = new myApp.classes.views.myApp({
            el : this.el,
            model: myApp.models.example
        });

        myApp.routers.appRouter  = new myApp.classes.routers.ExampleRouter({
             //nothing to set here - yet much
        });
    },


    events:{
        'click a[data-internal]' : function(e) {
            e.preventDefault();
            Backbone.history.navigate(e.currentTarget.pathname, {trigger: true});
        },

        'click a[data-confirm]' : function(e) {
            e.preventDefault();
            if(confirm("You are going to "+e.currentTarget+" - Are you sure?"))
            {
                //save anything here
                window.open(e.currentTarget,"_blank");
            }
        }

    }



}))({el:'#appwrap'});

/* Order and include as you please. */
require('.tmp/scripts/templates');
require('app/scripts/views/**/*');
require('app/scripts/models/**/*');
require('app/scripts/collections/**/*');
require('app/scripts/routers/**/*');

$(function () {
    myApp.start();
});
