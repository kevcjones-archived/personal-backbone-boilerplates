/*global testBb, Backbone*/

myApp.classes.routers.ExampleRouter = Backbone.Router.extend({
    routes: {
        "":                     "showIndex",
        "test":                 "showTestWorked"
    },

    initialize: function() {
        Backbone.history.start();
    },

    showIndex: function () {
        myApp.views.example.render();
    },

    showTestWorked: function () {
        alert("This link triggered a URL change to #test but i will send you back now!!!");
        Backbone.history.navigate("/", {trigger: true});
    }

});
