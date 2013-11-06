/*global testBb, Backbone*/


var ExampleModel = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("ExampleModel"),
    defaults: {
        testVar:"This was loaded from the Example Model! - Click me FOOL!!!!!!",
        counter:0
    }

});

module.exports = ExampleModel;
//ctx.register("ExampleModel", ExampleModel);

