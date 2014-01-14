;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
/** ctx is context for di-lite */

//var BackboneModelReactMixin = ctx.get('BackboneModelReactMixin');
var BackboneModelReactMixin = require('../../../app/components/mixins/BackboneModelReactMixin');

var ExampleComponent = React.createClass({displayName: 'ExampleComponent',

    mixins: [BackboneModelReactMixin],

    getBackboneModels: function() {
        return [this.props.model];
    },

    render: function() {
        return (

            React.DOM.div( {class:"testStyle"}, 
                React.DOM.h2(null, this.props.title),
                React.DOM.a( {href:"void(0);", onClick:this.handleClick}, "Pull the model - ", this.props.model.get("counter")),
                React.DOM.p( {onClick:this.handleRedirectClick}, "Redirect Test")
            )

            );
    },

    componentDidMount: function() {
        // Additional functionality for todomvc: fetch() the collection on init
        this.props.model.fetch();
    },

    handleClick: function(event) {
        var counter = this.props.model.get("counter");
        counter++;
        this.props.model.set("counter",counter);
        this.props.model.save();
        return false;
    },

    handleRedirectClick: function(event) {
        Backbone.history.navigate("test", {trigger: true});
        return false;
    },

    attachToDOM: function(id,props) {
        React.renderComponent(

            ExampleComponent( {model:props.model, title:props.title}),

            document.getElementById(id)
        );
    }

});


module.exports = ExampleComponent;
//ctx.register("ExampleComponent").object(ExampleComponent);


/*

 @Usage

 React.renderComponent(
 ExampleComponent( {model:myApp.models.example} ), document.getElementById(myApp.rootEl)
 );

*/

},{"../../../app/components/mixins/BackboneModelReactMixin":3}],2:[function(require,module,exports){
/** @jsx React.DOM */

var SetIntervalMixin = require('../../../app/components/mixins/SetIntervalMixin');


var HelloBootstrap = React.createClass({displayName: 'HelloBootstrap',

    mixins: [SetIntervalMixin],

    getInitialState: function() {
        return {
            style:{
                width: "20%"
            },
            percent: 20
        };
    },

    componentDidMount: function() {
        this.setInterval(this.tick, 2000); // Call a method on the mixin
    },

    tick: function() {

        this.setState({
            percent: Math.random() * 100,
            style:{
                width:this.state.percent + "%"
            }

        });
    },


    render: function() {

        return (
                React.DOM.div( {class:"container theme-showcase"}, 

                    React.DOM.div( {class:"jumbotron"}, 
                        React.DOM.h1(null, "Hello, world!"),
                        React.DOM.p(null, "This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique."),
                        React.DOM.p(null, React.DOM.a( {href:"#", class:"btn btn-primary btn-lg", role:"button"}, "Learn more »"))
                    ),



                    React.DOM.div( {class:"page-header"}, 
                        React.DOM.h1(null, "Buttons")
                    ),
                    React.DOM.p(null, 
                        React.DOM.button( {type:"button", class:"btn btn-lg btn-default"}, "Default"),
                        React.DOM.button( {type:"button", class:"btn btn-lg btn-primary"}, "Primary"),
                        React.DOM.button( {type:"button", class:"btn btn-lg btn-success"}, "Success"),
                        React.DOM.button( {type:"button", class:"btn btn-lg btn-info"}, "Info"),
                        React.DOM.button( {type:"button", class:"btn btn-lg btn-warning"}, "Warning"),
                        React.DOM.button( {type:"button", class:"btn btn-lg btn-danger"}, "Danger"),
                        React.DOM.button( {type:"button", class:"btn btn-lg btn-link"}, "Link")
                    ),
                    React.DOM.p(null, 
                        React.DOM.button( {type:"button", class:"btn btn-default"}, "Default"),
                        React.DOM.button( {type:"button", class:"btn btn-primary"}, "Primary"),
                        React.DOM.button( {type:"button", class:"btn btn-success"}, "Success"),
                        React.DOM.button( {type:"button", class:"btn btn-info"}, "Info"),
                        React.DOM.button( {type:"button", class:"btn btn-warning"}, "Warning"),
                        React.DOM.button( {type:"button", class:"btn btn-danger"}, "Danger"),
                        React.DOM.button( {type:"button", class:"btn btn-link"}, "Link")
                    ),
                    React.DOM.p(null, 
                        React.DOM.button( {type:"button", class:"btn btn-sm btn-default"}, "Default"),
                        React.DOM.button( {type:"button", class:"btn btn-sm btn-primary"}, "Primary"),
                        React.DOM.button( {type:"button", class:"btn btn-sm btn-success"}, "Success"),
                        React.DOM.button( {type:"button", class:"btn btn-sm btn-info"}, "Info"),
                        React.DOM.button( {type:"button", class:"btn btn-sm btn-warning"}, "Warning"),
                        React.DOM.button( {type:"button", class:"btn btn-sm btn-danger"}, "Danger"),
                        React.DOM.button( {type:"button", class:"btn btn-sm btn-link"}, "Link")
                    ),
                    React.DOM.p(null, 
                        React.DOM.button( {type:"button", class:"btn btn-xs btn-default"}, "Default"),
                        React.DOM.button( {type:"button", class:"btn btn-xs btn-primary"}, "Primary"),
                        React.DOM.button( {type:"button", class:"btn btn-xs btn-success"}, "Success"),
                        React.DOM.button( {type:"button", class:"btn btn-xs btn-info"}, "Info"),
                        React.DOM.button( {type:"button", class:"btn btn-xs btn-warning"}, "Warning"),
                        React.DOM.button( {type:"button", class:"btn btn-xs btn-danger"}, "Danger"),
                        React.DOM.button( {type:"button", class:"btn btn-xs btn-link"}, "Link")
                    ),



                    React.DOM.div( {class:"page-header"}, 
                        React.DOM.h1(null, "Thumbnails")
                    ),
                    React.DOM.img( {'data-src':"holder.js/200x200", class:"img-thumbnail", alt:"A generic square placeholder image with a white border around it, making it resemble a photograph taken with an old instant camera"} ),



                        React.DOM.div( {class:"page-header"}, 
                            React.DOM.h1(null, "Dropdown menus")
                        ),
                        React.DOM.div( {class:"dropdown theme-dropdown clearfix"}, 
                            React.DOM.a( {id:"dropdownMenu1", href:"#", role:"button", class:"sr-only dropdown-toggle", 'data-toggle':"dropdown"}, "Dropdown ", React.DOM.b( {class:"caret"})),
                            React.DOM.ul( {class:"dropdown-menu", role:"menu", 'aria-labelledby':"dropdownMenu1"}, 
                                React.DOM.li( {class:"active", role:"presentation"}, React.DOM.a( {role:"menuitem", tabindex:"-1", href:"#"}, "Action")),
                                React.DOM.li( {role:"presentation"}, React.DOM.a( {role:"menuitem", tabindex:"-1", href:"#"}, "Another action")),
                                React.DOM.li( {role:"presentation"}, React.DOM.a( {role:"menuitem", tabindex:"-1", href:"#"}, "Something else here")),
                                React.DOM.li( {role:"presentation", class:"divider"}),
                                React.DOM.li( {role:"presentation"}, React.DOM.a( {role:"menuitem", tabindex:"-1", href:"#"}, "Separated link"))
                            )
                        ),




                        React.DOM.div( {class:"page-header"}, 
                            React.DOM.h1(null, "Navbars")
                        ),

                        React.DOM.div( {class:"navbar navbar-default"}, 
                            React.DOM.div( {class:"container"}, 
                                React.DOM.div( {class:"navbar-header"}, 
                                    React.DOM.button( {type:"button", class:"navbar-toggle", 'data-toggle':"collapse", 'data-target':".navbar-collapse"}, 
                                        React.DOM.span( {class:"sr-only"}, "Toggle navigation"),
                                        React.DOM.span( {class:"icon-bar"}),
                                        React.DOM.span( {class:"icon-bar"}),
                                        React.DOM.span( {class:"icon-bar"})
                                    ),
                                    React.DOM.a( {class:"navbar-brand", href:"#"}, "Project name")
                                ),
                                React.DOM.div( {class:"navbar-collapse collapse"}, 
                                    React.DOM.ul( {class:"nav navbar-nav"}, 
                                        React.DOM.li( {class:"active"}, React.DOM.a( {href:"#"}, "Home")),
                                        React.DOM.li(null, React.DOM.a( {href:"#about"}, "About")),
                                        React.DOM.li(null, React.DOM.a( {href:"#contact"}, "Contact")),
                                        React.DOM.li( {class:"dropdown"}, 
                                            React.DOM.a( {href:"#", class:"dropdown-toggle", 'data-toggle':"dropdown"}, "Dropdown ", React.DOM.b( {class:"caret"})),
                                            React.DOM.ul( {class:"dropdown-menu"}, 
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Action")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Another action")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Something else here")),
                                                React.DOM.li( {class:"divider"}),
                                                React.DOM.li( {class:"dropdown-header"}, "Nav header"),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Separated link")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "One more separated link"))
                                            )
                                        )
                                    )
                                )
                            )
                        ),

                        React.DOM.div( {class:"navbar navbar-inverse"}, 
                            React.DOM.div( {class:"container"}, 
                                React.DOM.div( {class:"navbar-header"}, 
                                    React.DOM.button( {type:"button", class:"navbar-toggle", 'data-toggle':"collapse", 'data-target':".navbar-collapse"}, 
                                        React.DOM.span( {class:"sr-only"}, "Toggle navigation"),
                                        React.DOM.span( {class:"icon-bar"}),
                                        React.DOM.span( {class:"icon-bar"}),
                                        React.DOM.span( {class:"icon-bar"})
                                    ),
                                    React.DOM.a( {class:"navbar-brand", href:"#"}, "Project name")
                                ),
                                React.DOM.div( {class:"navbar-collapse collapse"}, 
                                    React.DOM.ul( {class:"nav navbar-nav"}, 
                                        React.DOM.li( {class:"active"}, React.DOM.a( {href:"#"}, "Home")),
                                        React.DOM.li(null, React.DOM.a( {href:"#about"}, "About")),
                                        React.DOM.li(null, React.DOM.a( {href:"#contact"}, "Contact")),
                                        React.DOM.li( {class:"dropdown"}, 
                                            React.DOM.a( {href:"#", class:"dropdown-toggle", 'data-toggle':"dropdown"}, "Dropdown ", React.DOM.b( {class:"caret"})),
                                            React.DOM.ul( {class:"dropdown-menu"}, 
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Action")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Another action")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Something else here")),
                                                React.DOM.li( {class:"divider"}),
                                                React.DOM.li( {class:"dropdown-header"}, "Nav header"),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Separated link")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "One more separated link"))
                                            )
                                        )
                                    )
                                )
                            )
                        ),



                        React.DOM.div( {class:"page-header"}, 
                            React.DOM.h1(null, "Alerts")
                        ),
                        React.DOM.div( {class:"alert alert-success"}, 
                            React.DOM.strong(null, "Well done!"), " You successfully read this important alert message. "
                        ),
                        React.DOM.div( {class:"alert alert-info"}, 
                            React.DOM.strong(null, "Heads up!"), " This alert needs your attention, but it's not super important. "
                        ),
                        React.DOM.div( {class:"alert alert-warning"}, 
                            React.DOM.strong(null, "Warning!"), " Best check yo self, you're not looking too good. "
                        ),
                        React.DOM.div( {class:"alert alert-danger"}, 
                            React.DOM.strong(null, "Oh snap!"), " Change a few things up and try submitting again. "
                        ),



                        React.DOM.div( {class:"page-header"}, 
                            React.DOM.h1(null, "Progress bars")
                        ),
                        React.DOM.div( {class:"progress"}, 
                            React.DOM.div( {class:"progress-bar", role:"progressbar", 'aria-valuenow':"60", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style} , React.DOM.span( {class:"sr-only"}, "60% Complete"))
                        ),
                        React.DOM.div( {class:"progress"}, 
                            React.DOM.div( {class:"progress-bar progress-bar-success", role:"progressbar", 'aria-valuenow':"40", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style}, React.DOM.span( {class:"sr-only"}, "40% Complete (success)"))
                        ),
                        React.DOM.div( {class:"progress"}, 
                            React.DOM.div( {class:"progress-bar progress-bar-info", role:"progressbar", 'aria-valuenow':"20", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style}, React.DOM.span( {class:"sr-only"}, "20% Complete"))
                        ),
                        React.DOM.div( {class:"progress"}, 
                            React.DOM.div( {class:"progress-bar progress-bar-warning", role:"progressbar", 'aria-valuenow':"60", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style}, React.DOM.span( {class:"sr-only"}, "60% Complete (warning)"))
                        ),
                        React.DOM.div( {class:"progress"}, 
                            React.DOM.div( {class:"progress-bar progress-bar-danger", role:"progressbar", 'aria-valuenow':"80", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style}, React.DOM.span( {class:"sr-only"}, "80% Complete (danger)"))
                        ),
                        React.DOM.div( {class:"progress"}, 
                            React.DOM.div( {class:"progress-bar progress-bar-success", style:this.state.style}, React.DOM.span( {class:"sr-only"}, "35% Complete (success)")),
                            React.DOM.div( {class:"progress-bar progress-bar-warning", style:this.state.style}, React.DOM.span( {class:"sr-only"}, "20% Complete (warning)")),
                            React.DOM.div( {class:"progress-bar progress-bar-danger", style:this.state.style}, React.DOM.span( {class:"sr-only"}, "10% Complete (danger)"))
                        ),



                        React.DOM.div( {class:"page-header"}, 
                            React.DOM.h1(null, "List groups")
                        ),
                        React.DOM.div( {class:"row"}, 
                            React.DOM.div( {class:"col-sm-4"}, 
                                React.DOM.ul( {class:"list-group"}, 
                                    React.DOM.li( {class:"list-group-item"}, "Cras justo odio"),
                                    React.DOM.li( {class:"list-group-item"}, "Dapibus ac facilisis in"),
                                    React.DOM.li( {class:"list-group-item"}, "Morbi leo risus"),
                                    React.DOM.li( {class:"list-group-item"}, "Porta ac consectetur ac"),
                                    React.DOM.li( {class:"list-group-item"}, "Vestibulum at eros")
                                )
                            ),
                            React.DOM.div( {class:"col-sm-4"}, 
                                React.DOM.div( {class:"list-group"}, 
                                    React.DOM.a( {href:"#", class:"list-group-item active"}, 
                                    " Cras justo odio "
                                    ),
                                    React.DOM.a( {href:"#", class:"list-group-item"}, "Dapibus ac facilisis in"),
                                    React.DOM.a( {href:"#", class:"list-group-item"}, "Morbi leo risus"),
                                    React.DOM.a( {href:"#", class:"list-group-item"}, "Porta ac consectetur ac"),
                                    React.DOM.a( {href:"#", class:"list-group-item"}, "Vestibulum at eros")
                                )
                            ),
                            React.DOM.div( {class:"col-sm-4"}, 
                                React.DOM.div( {class:"list-group"}, 
                                    React.DOM.a( {href:"#", class:"list-group-item active"}, 
                                        React.DOM.h4( {class:"list-group-item-heading"}, "List group item heading"),
                                        React.DOM.p( {class:"list-group-item-text"}, "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.")
                                    ),
                                    React.DOM.a( {href:"#", class:"list-group-item"}, 
                                        React.DOM.h4( {class:"list-group-item-heading"}, "List group item heading"),
                                        React.DOM.p( {class:"list-group-item-text"}, "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.")
                                    ),
                                    React.DOM.a( {href:"#", class:"list-group-item"}, 
                                        React.DOM.h4( {class:"list-group-item-heading"}, "List group item heading"),
                                        React.DOM.p( {class:"list-group-item-text"}, "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.")
                                    )
                                )
                            )
                        ),



                        React.DOM.div( {class:"page-header"}, 
                            React.DOM.h1(null, "Panels")
                        ),
                        React.DOM.div( {class:"row"}, 
                            React.DOM.div( {class:"col-sm-4"}, 
                                React.DOM.div( {class:"panel panel-default"}, 
                                    React.DOM.div( {class:"panel-heading"}, 
                                        React.DOM.h3( {class:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {class:"panel-body"}, 
                                    " Panel content "
                                    )
                                ),
                                React.DOM.div( {class:"panel panel-primary"}, 
                                    React.DOM.div( {class:"panel-heading"}, 
                                        React.DOM.h3( {class:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {class:"panel-body"}, 
                                    " Panel content "
                                    )
                                )
                            ),
                            React.DOM.div( {class:"col-sm-4"}, 
                                React.DOM.div( {class:"panel panel-success"}, 
                                    React.DOM.div( {class:"panel-heading"}, 
                                        React.DOM.h3( {class:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {class:"panel-body"}, 
                                    " Panel content "
                                    )
                                ),
                                React.DOM.div( {class:"panel panel-info"}, 
                                    React.DOM.div( {class:"panel-heading"}, 
                                        React.DOM.h3( {class:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {class:"panel-body"}, 
                                    " Panel content "
                                    )
                                )
                            ),
                            React.DOM.div( {class:"col-sm-4"}, 
                                React.DOM.div( {class:"panel panel-warning"}, 
                                    React.DOM.div( {class:"panel-heading"}, 
                                        React.DOM.h3( {class:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {class:"panel-body"}, 
                                    " Panel content "
                                    )
                                ),
                                React.DOM.div( {class:"panel panel-danger"}, 
                                    React.DOM.div( {class:"panel-heading"}, 
                                        React.DOM.h3( {class:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {class:"panel-body"}, 
                                    " Panel content "
                                    )
                                )
                            )
                        ),



                        React.DOM.div( {class:"page-header"}, 
                            React.DOM.h1(null, "Wells")
                        ),
                        React.DOM.div( {class:"well"}, 
                            React.DOM.p(null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.")
                        )


                    )

            );
    },




    attachToDOM: function(id,props) {
        React.renderComponent(

            HelloBootstrap(null ),

            document.getElementById(id)
        );
    }

});


module.exports = HelloBootstrap;
//ctx.register("HelloBootstrap").object(HelloBootstrap);


/*

 @Usage

 React.renderComponent(
 HelloBootstrap( {model:myApp.models.example} ), document.getElementById(myApp.rootEl)
 );

*/

},{"../../../app/components/mixins/SetIntervalMixin":4}],3:[function(require,module,exports){
/**
 * Created by user on 02/11/2013.
 */
// An example generic Mixin that you can add to any component that should react
// to changes in a Backbone component. The use cases we've identified thus far
// are for Collections -- since they trigger a change event whenever any of
// their constituent items are changed there's no need to reconcile for regular
// models. One caveat: this relies on getBackboneModels() to always return the
// same model instances throughout the lifecycle of the component. If you're
// using this mixin correctly (it should be near the top of your component
// hierarchy) this should not be an issue.

/** ctx is context for di-lite */


var BackboneModelReactMixin = {
    componentDidMount: function() {
        // Whenever there may be a change in the Backbone data, trigger a reconcile.
        this.getBackboneModels().forEach(function(model) {
            model.on('add change remove', this.forceUpdate.bind(this, null), this);
        }, this);
    },

    componentWillUnmount: function() {
        // Ensure that we clean up any dangling references when the component is
        // destroyed.
        this.getBackboneModels().forEach(function(model) {
            model.off(null, null, this);
        }, this);
    }
};

module.exports = BackboneModelReactMixin;
//ctx.register("BackboneModelReactMixin").object(BackboneModelReactMixin);
},{}],4:[function(require,module,exports){
/**
 * Created by user on 06/11/2013.
 */

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};

module.exports = SetIntervalMixin;

},{}],5:[function(require,module,exports){
/*global backboneTemplate, $, window*/


var router = require('./routers/ExampleRouter.jsx');


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	if(!window.cordova)
    		 app.receivedEvent('skipped-device-ready');
    	else
        	document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        

        console.log('Received Event: ' + id);
        var routerInstance = new router();
    }
};

app.initialize();




},{"./routers/ExampleRouter.jsx":7}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
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
            React.DOM.div(null
            ), document.getElementById("appContainer")
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
                 React.DOM.div(null, 
                    ExampleComponent( {model:model, title:"First Example"} ),
                    ExampleComponent( {model:model, title:"Second Example"} )
                 )
//                , document.body
                  , document.getElementById("appContainer")
          );

    }

});

//ctx
module.exports = ExampleRouter;
//ctx.register("ExampleRouter", ExampleRouter,{});


},{"../../components/ExampleComponent/ExampleComponent.jsx":1,"../../components/HelloBootstrap/HelloBootstrap.jsx":2,"../models/Example-model":6}]},{},[5])
;