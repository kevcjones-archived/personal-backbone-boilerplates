/** @jsx React.DOM */
/*global testBb, Backbone*/

var ExampleComponent = ctx.get('ExampleComponent');
var PhotoswipeGallery = ctx.get('PhotoswipeGallery');
var PhotoswipeGallery2 = ctx.get('PhotoswipeGallery');
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

        var arr = [
            { url: 'http://placehold.it/500x400/ff0000/', caption: 'Image 001'},
            { url: 'http://placehold.it/500x400/ff0000/', caption: 'Image 001'},
            { url: 'http://placehold.it/500x400/ff0000/', caption: 'Image 001'},
            { url: 'http://placehold.it/500x400/ff0000/', caption: 'Image 001'},
            { url: 'http://placehold.it/500x400/ff0000/', caption: 'Image 001'},
            { url: 'http://placehold.it/500x400/ff0000/', caption: 'Image 001'},
        ];


        React.renderComponent(
            <div>
                <ExampleComponent model={ExampleModel} title="First Example" />
                <ExampleComponent model={ExampleModel} title="Second Example" />
                <PhotoswipeGallery images={arr} />
                <PhotoswipeGallery images={arr} />
            </div>, document.getElementById("wrapper")
        );

    },

    showTestWorked: function () {

        Backbone.history.navigate("/", {trigger: true});
    }

});

//ctx
ctx.register("ExampleRouter", ExampleRouter,{});

