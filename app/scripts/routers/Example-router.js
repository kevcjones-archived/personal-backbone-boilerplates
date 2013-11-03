/*global testBb, Backbone*/

var ExampleComponent = ctx.get('ExampleComponent');
var ExampleComponent2 = ctx.get('ExampleComponent');
var ExampleModel = ctx.get('ExampleModel');


var ExampleRouter = Backbone.Router.extend({

    routes: {
        "":             "showIndex",
        "test":         "showTestWorked"
    },

    initialize: function() {
        ctx.register("history").object(Backbone.history);
        ctx.get("history").start();
    },

    showIndex: function () {

        ExampleComponent.originalSpec.attachToDOM("appwrap",{
            model:  ExampleModel,
            title:  "First Instance"
        });

        ExampleComponent2.originalSpec.attachToDOM("appwrap2",{
            model:  ExampleModel,
            title:  "Second Instance"
        });
    },

    showTestWorked: function () {
        alert("This link triggered a URL change to #test but i will send you back now!!!");
        Backbone.history.navigate("/", {trigger: true});
    }

});

//ctx
ctx.register("ExampleRouter", ExampleRouter,{});

