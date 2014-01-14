/** @jsx React.DOM */
/*global testBb, Backbone*/


var ExampleComponent = require('../../components/ExampleComponent/ExampleComponent.jsx');
var HelloBootstrap = require('../../components/HelloBootstrap/HelloBootstrap.jsx');
var ExampleModel = require('../models/Example-model');

var ExampleRouter = Backbone.Router.extend({

    routes: {
        "":             "showIndex",
        "tbs":          "showTBS",
        "test":         "showTestWorked"
    },

    initialize: function() {
        //ctx.register("history").object(Backbone.history);
        //ctx.get("history").start();
        Backbone.history.start();
    },

    showTBS: function () {
        React.renderComponent(
            <div>
            </div>, document.getElementById("appContainer")
        );
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

        /*

         <ExampleComponent model={model} title="First Example" />
         <ExampleComponent model={model} title="Second Example" />
         <PhotoswipeGallery images={arr} />
         <PhotoswipeGallery images={arr} />
         */



          React.renderComponent(
                 <div>
                    <ExampleComponent model={model} title="First Example" />
                    <ExampleComponent model={model} title="Second Example" />
                 </div>
//                , document.body
                  , document.getElementById("appContainer")
          );

    }

});

//ctx
module.exports = ExampleRouter;
//ctx.register("ExampleRouter", ExampleRouter,{});

