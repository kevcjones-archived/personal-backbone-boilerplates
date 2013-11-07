/** @jsx React.DOM */
/*global testBb, Backbone*/

//var ExampleComponent = ctx.get('ExampleComponent');
//var PhotoswipeGallery = ctx.get('PhotoswipeGallery');
//var PhotoswipeGallery2 = ctx.get('PhotoswipeGallery');
//var ExampleModel = ctx.get('ExampleModel');


var ExampleComponent = require('../../components/ExampleComponent/ExampleComponent.jsx');
var PhotoswipeGallery = require('../../components/PhotoswipeGalleryComponent/PhotoswipeGallery.jsx');
var HelloBootstrap = require('../../components/HelloBootstrap/HelloBootstrap.jsx');
var ExampleModel = require('../models/Example-model');



var ExampleRouter = Backbone.Router.extend({

    routes: {
        "":             "showIndex",
        "test":         "showTestWorked"
    },

    initialize: function() {
        //ctx.register("history").object(Backbone.history);
        //ctx.get("history").start();
        Backbone.history.start();
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

        var model = new ExampleModel();


        React.renderComponent(
            <div>
                <HelloBootstrap title="Hello World Demo" />
                <ExampleComponent model={model} title="First Example" />
                <ExampleComponent model={model} title="Second Example" />
                <PhotoswipeGallery images={arr} />
                <PhotoswipeGallery images={arr} />
            </div>, document.getElementById("container")
        );

    },

    showTestWorked: function () {

        Backbone.history.navigate("/", {trigger: true});
    }

});

//ctx
module.exports = ExampleRouter;
//ctx.register("ExampleRouter", ExampleRouter,{});

