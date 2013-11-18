;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var EBookViewChapter = require('./EBookViewChapter.jsx');


var EBookView = React.createClass({displayName: 'EBookView',

    mixins: [],

    render: function() {
        return (

            React.DOM.div( {className:"frame"}, 
                React.DOM.div( {className:"chapterWrapper", ref:"chapterWrapper"}, 
                    React.DOM.div( {className:"chapterScroller", ref:"chapterScroller"}, 
                        this.props.children
                    )
                )
            )

        );
    },

    componentDidMount: function() {

        this.props.wrapperWidth = 0;
        this.props.$chapterWrapper = $(this.refs.chapterWrapper.getDOMNode());
        this.props.$chapterScroller = $(this.refs.chapterScroller.getDOMNode());
        // Additional functionality for todomvc: fetch() the collection on init
        this.props.chapterHScroller = new IScroll(this.refs.chapterWrapper.getDOMNode(), {
            snap: true,
            momentum: false,
            hScrollbar: false,
            vScrollbar: false,
            scrollX: true,
            lockDirection: true});

        this.updateLayout();

        //this.props.chapterHScroller.on('scrollStart', function () { console.log('scroll started'); });
        $(window).on("orientationchange", this.updateLayout);

    },

    componentWillUnmount : function(){
        //this.props.chapterHScroller.off('scrollStart');
        this.props.chapterHScroller.destroy();
        $(window).off("orientationchange");
    },

    updateLayout: function() {

        console.log("Init the EBOOK VIEW");
        this.props.currentPage = 0;

        if (this.props.wrapperWidth > 0) {
            this.props.currentPage = - Math.ceil( this.props.$chapterWrapper.position().left / this.props.wrapperWidth);
        }

        this.props.wrapperWidth = this.props.$chapterWrapper.width();

        this.props.$chapters = $('.chapter');
        //alert("chapters found "+this.props.$chapters.length);
        this.props.$chapterScroller.css('width', this.props.wrapperWidth * this.props.$chapters.length);
        this.props.$chapters.css('width', this.props.wrapperWidth);
        this.props.chapterHScroller.refresh();





    }

});


module.exports = EBookView;


/*

 @Usage

 React.renderComponent(
 EBookView( {model:myApp.models.example} ), document.getElementById(myApp.rootEl)
 );

*/

},{"./EBookViewChapter.jsx":2}],2:[function(require,module,exports){
/** @jsx React.DOM */

var EBookViewChapter = React.createClass({displayName: 'EBookViewChapter',

    render: function() {
        return (

            React.DOM.div( {className:"chapter"} , 
                React.DOM.div( {className:"articleWrapper", ref:"articleWrapper"}, 
                    React.DOM.div( {className:"articleScroller"}, 
                        this.props.children
                    )
                )
            )

        );
    },

    componentDidMount: function() {
        // Additional functionality for todomvc: fetch() the collection on init

        console.log("Init the EBOOK VIEW");
        var _this = this;
        setTimeout(function(){
            _this.props.myArticleWrapper = new IScroll(_this.refs.articleWrapper.getDOMNode(),{
                directionLockThreshold:15
            });
        },1);




    },

    componentWillUnmount : function(){
        this.props.myArticleWrapper.destroy();
    }





});


module.exports = EBookViewChapter;


/*

 @Usage

 React.renderComponent(
 EBookViewChapter( {model:myApp.models.example} ), document.getElementById(myApp.rootEl)
 );

*/

},{}],3:[function(require,module,exports){
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

            React.DOM.div( {className:"testStyle"}, 
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

},{"../../../app/components/mixins/BackboneModelReactMixin":8}],4:[function(require,module,exports){
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
                React.DOM.div( {className:"container theme-showcase"}, 

                    React.DOM.div( {className:"jumbotron"}, 
                        React.DOM.h1(null, "Hello, world!"),
                        React.DOM.p(null, "This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique."),
                        React.DOM.p(null, React.DOM.a( {href:"#", className:"btn btn-primary btn-lg", role:"button"}, "Learn more »"))
                    ),



                    React.DOM.div( {className:"page-header"}, 
                        React.DOM.h1(null, "Buttons")
                    ),
                    React.DOM.p(null, 
                        React.DOM.button( {type:"button", className:"btn btn-lg btn-default"}, "Default"),
                        React.DOM.button( {type:"button", className:"btn btn-lg btn-primary"}, "Primary"),
                        React.DOM.button( {type:"button", className:"btn btn-lg btn-success"}, "Success"),
                        React.DOM.button( {type:"button", className:"btn btn-lg btn-info"}, "Info"),
                        React.DOM.button( {type:"button", className:"btn btn-lg btn-warning"}, "Warning"),
                        React.DOM.button( {type:"button", className:"btn btn-lg btn-danger"}, "Danger"),
                        React.DOM.button( {type:"button", className:"btn btn-lg btn-link"}, "Link")
                    ),
                    React.DOM.p(null, 
                        React.DOM.button( {type:"button", className:"btn btn-default"}, "Default"),
                        React.DOM.button( {type:"button", className:"btn btn-primary"}, "Primary"),
                        React.DOM.button( {type:"button", className:"btn btn-success"}, "Success"),
                        React.DOM.button( {type:"button", className:"btn btn-info"}, "Info"),
                        React.DOM.button( {type:"button", className:"btn btn-warning"}, "Warning"),
                        React.DOM.button( {type:"button", className:"btn btn-danger"}, "Danger"),
                        React.DOM.button( {type:"button", className:"btn btn-link"}, "Link")
                    ),
                    React.DOM.p(null, 
                        React.DOM.button( {type:"button", className:"btn btn-sm btn-default"}, "Default"),
                        React.DOM.button( {type:"button", className:"btn btn-sm btn-primary"}, "Primary"),
                        React.DOM.button( {type:"button", className:"btn btn-sm btn-success"}, "Success"),
                        React.DOM.button( {type:"button", className:"btn btn-sm btn-info"}, "Info"),
                        React.DOM.button( {type:"button", className:"btn btn-sm btn-warning"}, "Warning"),
                        React.DOM.button( {type:"button", className:"btn btn-sm btn-danger"}, "Danger"),
                        React.DOM.button( {type:"button", className:"btn btn-sm btn-link"}, "Link")
                    ),
                    React.DOM.p(null, 
                        React.DOM.button( {type:"button", className:"btn btn-xs btn-default"}, "Default"),
                        React.DOM.button( {type:"button", className:"btn btn-xs btn-primary"}, "Primary"),
                        React.DOM.button( {type:"button", className:"btn btn-xs btn-success"}, "Success"),
                        React.DOM.button( {type:"button", className:"btn btn-xs btn-info"}, "Info"),
                        React.DOM.button( {type:"button", className:"btn btn-xs btn-warning"}, "Warning"),
                        React.DOM.button( {type:"button", className:"btn btn-xs btn-danger"}, "Danger"),
                        React.DOM.button( {type:"button", className:"btn btn-xs btn-link"}, "Link")
                    ),



                    React.DOM.div( {className:"page-header"}, 
                        React.DOM.h1(null, "Thumbnails")
                    ),
                    React.DOM.img( {'data-src':"holder.js/200x200", className:"img-thumbnail", alt:"A generic square placeholder image with a white border around it, making it resemble a photograph taken with an old instant camera"} ),



                        React.DOM.div( {className:"page-header"}, 
                            React.DOM.h1(null, "Dropdown menus")
                        ),
                        React.DOM.div( {className:"dropdown theme-dropdown clearfix"}, 
                            React.DOM.a( {id:"dropdownMenu1", href:"#", role:"button", className:"sr-only dropdown-toggle", 'data-toggle':"dropdown"}, "Dropdown ", React.DOM.b( {className:"caret"})),
                            React.DOM.ul( {className:"dropdown-menu", role:"menu", 'aria-labelledby':"dropdownMenu1"}, 
                                React.DOM.li( {className:"active", role:"presentation"}, React.DOM.a( {role:"menuitem", tabindex:"-1", href:"#"}, "Action")),
                                React.DOM.li( {role:"presentation"}, React.DOM.a( {role:"menuitem", tabindex:"-1", href:"#"}, "Another action")),
                                React.DOM.li( {role:"presentation"}, React.DOM.a( {role:"menuitem", tabindex:"-1", href:"#"}, "Something else here")),
                                React.DOM.li( {role:"presentation", className:"divider"}),
                                React.DOM.li( {role:"presentation"}, React.DOM.a( {role:"menuitem", tabindex:"-1", href:"#"}, "Separated link"))
                            )
                        ),




                        React.DOM.div( {className:"page-header"}, 
                            React.DOM.h1(null, "Navbars")
                        ),

                        React.DOM.div( {className:"navbar navbar-default"}, 
                            React.DOM.div( {className:"container"}, 
                                React.DOM.div( {className:"navbar-header"}, 
                                    React.DOM.button( {type:"button", className:"navbar-toggle", 'data-toggle':"collapse", 'data-target':".navbar-collapse"}, 
                                        React.DOM.span( {className:"sr-only"}, "Toggle navigation"),
                                        React.DOM.span( {className:"icon-bar"}),
                                        React.DOM.span( {className:"icon-bar"}),
                                        React.DOM.span( {className:"icon-bar"})
                                    ),
                                    React.DOM.a( {className:"navbar-brand", href:"#"}, "Project name")
                                ),
                                React.DOM.div( {className:"navbar-collapse collapse"}, 
                                    React.DOM.ul( {className:"nav navbar-nav"}, 
                                        React.DOM.li( {className:"active"}, React.DOM.a( {href:"#"}, "Home")),
                                        React.DOM.li(null, React.DOM.a( {href:"#about"}, "About")),
                                        React.DOM.li(null, React.DOM.a( {href:"#contact"}, "Contact")),
                                        React.DOM.li( {className:"dropdown"}, 
                                            React.DOM.a( {href:"#", className:"dropdown-toggle", 'data-toggle':"dropdown"}, "Dropdown ", React.DOM.b( {className:"caret"})),
                                            React.DOM.ul( {className:"dropdown-menu"}, 
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Action")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Another action")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Something else here")),
                                                React.DOM.li( {className:"divider"}),
                                                React.DOM.li( {className:"dropdown-header"}, "Nav header"),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Separated link")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "One more separated link"))
                                            )
                                        )
                                    )
                                )
                            )
                        ),

                        React.DOM.div( {className:"navbar navbar-inverse"}, 
                            React.DOM.div( {className:"container"}, 
                                React.DOM.div( {className:"navbar-header"}, 
                                    React.DOM.button( {type:"button", className:"navbar-toggle", 'data-toggle':"collapse", 'data-target':".navbar-collapse"}, 
                                        React.DOM.span( {className:"sr-only"}, "Toggle navigation"),
                                        React.DOM.span( {className:"icon-bar"}),
                                        React.DOM.span( {className:"icon-bar"}),
                                        React.DOM.span( {className:"icon-bar"})
                                    ),
                                    React.DOM.a( {className:"navbar-brand", href:"#"}, "Project name")
                                ),
                                React.DOM.div( {className:"navbar-collapse collapse"}, 
                                    React.DOM.ul( {className:"nav navbar-nav"}, 
                                        React.DOM.li( {className:"active"}, React.DOM.a( {href:"#"}, "Home")),
                                        React.DOM.li(null, React.DOM.a( {href:"#about"}, "About")),
                                        React.DOM.li(null, React.DOM.a( {href:"#contact"}, "Contact")),
                                        React.DOM.li( {className:"dropdown"}, 
                                            React.DOM.a( {href:"#", className:"dropdown-toggle", 'data-toggle':"dropdown"}, "Dropdown ", React.DOM.b( {className:"caret"})),
                                            React.DOM.ul( {className:"dropdown-menu"}, 
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Action")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Another action")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Something else here")),
                                                React.DOM.li( {className:"divider"}),
                                                React.DOM.li( {className:"dropdown-header"}, "Nav header"),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "Separated link")),
                                                React.DOM.li(null, React.DOM.a( {href:"#"}, "One more separated link"))
                                            )
                                        )
                                    )
                                )
                            )
                        ),



                        React.DOM.div( {className:"page-header"}, 
                            React.DOM.h1(null, "Alerts")
                        ),
                        React.DOM.div( {className:"alert alert-success"}, 
                            React.DOM.strong(null, "Well done!"), " You successfully read this important alert message. "                        ),
                        React.DOM.div( {className:"alert alert-info"}, 
                            React.DOM.strong(null, "Heads up!"), " This alert needs your attention, but it's not super important. "                        ),
                        React.DOM.div( {className:"alert alert-warning"}, 
                            React.DOM.strong(null, "Warning!"), " Best check yo self, you're not looking too good. "                        ),
                        React.DOM.div( {className:"alert alert-danger"}, 
                            React.DOM.strong(null, "Oh snap!"), " Change a few things up and try submitting again. "                        ),



                        React.DOM.div( {className:"page-header"}, 
                            React.DOM.h1(null, "Progress bars")
                        ),
                        React.DOM.div( {className:"progress"}, 
                            React.DOM.div( {className:"progress-bar", role:"progressbar", 'aria-valuenow':"60", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style} , React.DOM.span( {className:"sr-only"}, "60% Complete"))
                        ),
                        React.DOM.div( {className:"progress"}, 
                            React.DOM.div( {className:"progress-bar progress-bar-success", role:"progressbar", 'aria-valuenow':"40", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style}, React.DOM.span( {className:"sr-only"}, "40% Complete (success)"))
                        ),
                        React.DOM.div( {className:"progress"}, 
                            React.DOM.div( {className:"progress-bar progress-bar-info", role:"progressbar", 'aria-valuenow':"20", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style}, React.DOM.span( {className:"sr-only"}, "20% Complete"))
                        ),
                        React.DOM.div( {className:"progress"}, 
                            React.DOM.div( {className:"progress-bar progress-bar-warning", role:"progressbar", 'aria-valuenow':"60", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style}, React.DOM.span( {className:"sr-only"}, "60% Complete (warning)"))
                        ),
                        React.DOM.div( {className:"progress"}, 
                            React.DOM.div( {className:"progress-bar progress-bar-danger", role:"progressbar", 'aria-valuenow':"80", 'aria-valuemin':"0", 'aria-valuemax':"100", style:this.state.style}, React.DOM.span( {className:"sr-only"}, "80% Complete (danger)"))
                        ),
                        React.DOM.div( {className:"progress"}, 
                            React.DOM.div( {className:"progress-bar progress-bar-success", style:this.state.style}, React.DOM.span( {className:"sr-only"}, "35% Complete (success)")),
                            React.DOM.div( {className:"progress-bar progress-bar-warning", style:this.state.style}, React.DOM.span( {className:"sr-only"}, "20% Complete (warning)")),
                            React.DOM.div( {className:"progress-bar progress-bar-danger", style:this.state.style}, React.DOM.span( {className:"sr-only"}, "10% Complete (danger)"))
                        ),



                        React.DOM.div( {className:"page-header"}, 
                            React.DOM.h1(null, "List groups")
                        ),
                        React.DOM.div( {className:"row"}, 
                            React.DOM.div( {className:"col-sm-4"}, 
                                React.DOM.ul( {className:"list-group"}, 
                                    React.DOM.li( {className:"list-group-item"}, "Cras justo odio"),
                                    React.DOM.li( {className:"list-group-item"}, "Dapibus ac facilisis in"),
                                    React.DOM.li( {className:"list-group-item"}, "Morbi leo risus"),
                                    React.DOM.li( {className:"list-group-item"}, "Porta ac consectetur ac"),
                                    React.DOM.li( {className:"list-group-item"}, "Vestibulum at eros")
                                )
                            ),
                            React.DOM.div( {className:"col-sm-4"}, 
                                React.DOM.div( {className:"list-group"}, 
                                    React.DOM.a( {href:"#", className:"list-group-item active"}, 
" Cras justo odio "                                    ),
                                    React.DOM.a( {href:"#", className:"list-group-item"}, "Dapibus ac facilisis in"),
                                    React.DOM.a( {href:"#", className:"list-group-item"}, "Morbi leo risus"),
                                    React.DOM.a( {href:"#", className:"list-group-item"}, "Porta ac consectetur ac"),
                                    React.DOM.a( {href:"#", className:"list-group-item"}, "Vestibulum at eros")
                                )
                            ),
                            React.DOM.div( {className:"col-sm-4"}, 
                                React.DOM.div( {className:"list-group"}, 
                                    React.DOM.a( {href:"#", className:"list-group-item active"}, 
                                        React.DOM.h4( {className:"list-group-item-heading"}, "List group item heading"),
                                        React.DOM.p( {className:"list-group-item-text"}, "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.")
                                    ),
                                    React.DOM.a( {href:"#", className:"list-group-item"}, 
                                        React.DOM.h4( {className:"list-group-item-heading"}, "List group item heading"),
                                        React.DOM.p( {className:"list-group-item-text"}, "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.")
                                    ),
                                    React.DOM.a( {href:"#", className:"list-group-item"}, 
                                        React.DOM.h4( {className:"list-group-item-heading"}, "List group item heading"),
                                        React.DOM.p( {className:"list-group-item-text"}, "Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.")
                                    )
                                )
                            )
                        ),



                        React.DOM.div( {className:"page-header"}, 
                            React.DOM.h1(null, "Panels")
                        ),
                        React.DOM.div( {className:"row"}, 
                            React.DOM.div( {className:"col-sm-4"}, 
                                React.DOM.div( {className:"panel panel-default"}, 
                                    React.DOM.div( {className:"panel-heading"}, 
                                        React.DOM.h3( {className:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {className:"panel-body"}, 
" Panel content "                                    )
                                ),
                                React.DOM.div( {className:"panel panel-primary"}, 
                                    React.DOM.div( {className:"panel-heading"}, 
                                        React.DOM.h3( {className:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {className:"panel-body"}, 
" Panel content "                                    )
                                )
                            ),
                            React.DOM.div( {className:"col-sm-4"}, 
                                React.DOM.div( {className:"panel panel-success"}, 
                                    React.DOM.div( {className:"panel-heading"}, 
                                        React.DOM.h3( {className:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {className:"panel-body"}, 
" Panel content "                                    )
                                ),
                                React.DOM.div( {className:"panel panel-info"}, 
                                    React.DOM.div( {className:"panel-heading"}, 
                                        React.DOM.h3( {className:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {className:"panel-body"}, 
" Panel content "                                    )
                                )
                            ),
                            React.DOM.div( {className:"col-sm-4"}, 
                                React.DOM.div( {className:"panel panel-warning"}, 
                                    React.DOM.div( {className:"panel-heading"}, 
                                        React.DOM.h3( {className:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {className:"panel-body"}, 
" Panel content "                                    )
                                ),
                                React.DOM.div( {className:"panel panel-danger"}, 
                                    React.DOM.div( {className:"panel-heading"}, 
                                        React.DOM.h3( {className:"panel-title"}, "Panel title")
                                    ),
                                    React.DOM.div( {className:"panel-body"}, 
" Panel content "                                    )
                                )
                            )
                        ),



                        React.DOM.div( {className:"page-header"}, 
                            React.DOM.h1(null, "Wells")
                        ),
                        React.DOM.div( {className:"well"}, 
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

},{"../../../app/components/mixins/SetIntervalMixin":9}],5:[function(require,module,exports){
/** @jsx React.DOM */

var Navbar = React.createClass({displayName: 'Navbar',

    componentDidMount: function() {

    },

    openTBS : function()
    {
        Backbone.history.navigate("tbs", {trigger: true});

    },

    openHome : function()
    {
        Backbone.history.navigate("", {trigger: true});
    },

    render: function() {

        var marginBottom = {
            "margin-bottom":"5px"
        }

        return (
            React.DOM.div( {className:"navbar navbar-top navbar-top-fixed navbar-inverse", role:"navigation", style:marginBottom}, 
                React.DOM.div( {className:"container"}, 
                    React.DOM.div( {className:"navbar-header"}, 
                        React.DOM.button( {type:"button", className:"navbar-toggle", 'data-toggle':"collapse", 'data-target':".navbar-collapse"}, 
                            React.DOM.span( {className:"sr-only"}, "Toggle navigation"),
                            React.DOM.span( {className:"icon-bar"}),
                            React.DOM.span( {className:"icon-bar"}),
                            React.DOM.span( {className:"icon-bar"})
                        ),
                        React.DOM.a( {className:"navbar-brand", href:"#"}, "Project name")
                    ),
                    React.DOM.div( {className:"collapse navbar-collapse"}, 
                        React.DOM.ul( {className:"nav navbar-nav"}, 
                            React.DOM.li( {ref:"homeButton", className:"active", onClick:this.openHome}, React.DOM.a( {href:"#"}, "Home")),
                            React.DOM.li( {ref:"tbsButton"}, React.DOM.a( {href:"#tbs", onClick:this.openTBS}, "Twitter")),
                            React.DOM.li(null, React.DOM.a( {href:"#other"}, "Other")),
                            React.DOM.li(null, React.DOM.a( {href:"#section"}, "Section")),
                            React.DOM.li( {className:"dropdown"}, 
                                React.DOM.a( {'data-toggle':"dropdown", className:"dropdown-toggle", href:"#"}, "Dropdown ", React.DOM.b( {className:"caret"})),
                                React.DOM.ul( {className:"dropdown-menu"}, 
                                    React.DOM.li( {className:"dropdown-submenu"}, 
                                        React.DOM.a( {href:"#"}, "More options"),
                                        React.DOM.ul( {className:"dropdown-menu"}, 
                                            React.DOM.li(null, React.DOM.a( {href:"#"}, "Second level link")),
                                            React.DOM.li(null, React.DOM.a( {href:"#"}, "Second level link")),
                                            React.DOM.li(null, React.DOM.a( {href:"#"}, "Second level link")),
                                            React.DOM.li(null, React.DOM.a( {href:"#"}, "Second level link")),
                                            React.DOM.li(null, React.DOM.a( {href:"#"}, "Second level link"))
                                        )
                                    ),
                                    React.DOM.li(null, React.DOM.a( {href:"#"}, "Another action")),
                                    React.DOM.li(null, React.DOM.a( {href:"#"}, "Something else here"))
                                )
                            ),
                            React.DOM.li(null, React.DOM.a( {href:"#contact"}, "Contact"))
                        )
                    )
                )
            )

            );
    },




    attachToDOM: function(id,props) {
        React.renderComponent(

            Navbar(null ),

            document.getElementById(id)
        );
    }

});


module.exports = Navbar;


/*

 @Usage

 React.renderComponent(
 Navbar( {model:myApp.models.example} ), document.getElementById(myApp.rootEl)
 );

*/

},{}],6:[function(require,module,exports){
/** @jsx React.DOM */

var OffCanvasTemplate = React.createClass({displayName: 'OffCanvasTemplate',

    componentDidMount: function() {
        $('[data-toggle=offcanvas]').on('click',function() {
            $('.row-offcanvas').toggleClass('active');
        });
    },

    componentWillUnmount : function(){
        $('[data-toggle=offcanvas]').off('click');
    },


    render: function() {

        return (
            React.DOM.div( {className:"container"}, 

                React.DOM.div( {className:"row row-offcanvas row-offcanvas-right"}, 

                    React.DOM.div( {className:"col-xs-12 col-sm-9"}, 
                        React.DOM.p( {className:"pull-right visible-xs"}, 
                            React.DOM.button( {type:"button", className:"btn btn-primary btn-xs", 'data-toggle':"offcanvas"}, "Toggle nav")
                        ),
                        React.DOM.div( {className:"jumbotron"}, 
                            React.DOM.h1(null, "Hello, Kevins world!"),
                            React.DOM.p(null, "This is an example to show the potential of an offcanvas layout pattern in Bootstrap. Try some responsive-range viewport sizes to see it in action.")
                        ),
                        React.DOM.div( {className:"row"}, 
                            React.DOM.div( {className:"col-6 col-sm-6 col-lg-4"}, 
                                React.DOM.h2(null, "Heading"),
                                React.DOM.p(null, "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. " ),
                                React.DOM.p(null, React.DOM.a( {className:"btn btn-default", href:"#", role:"button"}, "View details »"))
                            ),
                            React.DOM.div( {className:"col-6 col-sm-6 col-lg-4"}, 
                                React.DOM.h2(null, "Heading"),
                                React.DOM.p(null, "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. " ),
                                React.DOM.p(null, React.DOM.a( {className:"btn btn-default", href:"#", role:"button"}, "View details »"))
                            ),
                            React.DOM.div( {className:"col-6 col-sm-6 col-lg-4"}, 
                                React.DOM.h2(null, "Heading"),
                                React.DOM.p(null, "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. " ),
                                React.DOM.p(null, React.DOM.a( {className:"btn btn-default", href:"#", role:"button"}, "View details »"))
                            ),
                            React.DOM.div( {className:"col-6 col-sm-6 col-lg-4"}, 
                                React.DOM.h2(null, "Heading"),
                                React.DOM.p(null, "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. " ),
                                React.DOM.p(null, React.DOM.a( {className:"btn btn-default", href:"#", role:"button"}, "View details »"))
                            ),
                            React.DOM.div( {className:"col-6 col-sm-6 col-lg-4"}, 
                                React.DOM.h2(null, "Heading"),
                                React.DOM.p(null, "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. " ),
                                React.DOM.p(null, React.DOM.a( {className:"btn btn-default", href:"#", role:"button"}, "View details »"))
                            ),
                            React.DOM.div( {className:"col-6 col-sm-6 col-lg-4"}, 
                                React.DOM.h2(null, "Heading"),
                                React.DOM.p(null, "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. " ),
                                React.DOM.p(null, React.DOM.a( {className:"btn btn-default", href:"#", role:"button"}, "View details »"))
                            )
                        )
                    ),

                    React.DOM.div( {className:"col-xs-6 col-sm-3 sidebar-offcanvas", id:"sidebar", role:"navigation"}, 
                        React.DOM.div( {className:"list-group"}, 
                            React.DOM.a( {href:"#", className:"list-group-item active"}, "Link"),
                            React.DOM.a( {href:"#", className:"list-group-item"}, "Link"),
                            React.DOM.a( {href:"#", className:"list-group-item"}, "Link"),
                            React.DOM.a( {href:"#", className:"list-group-item"}, "Link"),
                            React.DOM.a( {href:"#", className:"list-group-item"}, "Link"),
                            React.DOM.a( {href:"#", className:"list-group-item"}, "Link"),
                            React.DOM.a( {href:"#", className:"list-group-item"}, "Link"),
                            React.DOM.a( {href:"#", className:"list-group-item"}, "Link"),
                            React.DOM.a( {href:"#", className:"list-group-item"}, "Link"),
                            React.DOM.a( {href:"#", className:"list-group-item"}, "Link")
                        )
                    )
                )



            )

            );
    },




    attachToDOM: function(id,props) {
        React.renderComponent(

            OffCanvasTemplate(null ),

            document.getElementById(id)
        );
    }

});


module.exports = OffCanvasTemplate;


/*

 @Usage

 React.renderComponent(
 OffCanvasTemplate( {model:myApp.models.example} ), document.getElementById(myApp.rootEl)
 );

*/

},{}],7:[function(require,module,exports){
/** @jsx React.DOM */

if(!Code)
    if(!Code.PhotoSwipe)
        throw("Dependency missing - Make sure you have loaded Photoswipe already");


var Photoswipe = window.Code.PhotoSwipe;


var PhotoswipeGallery = React.createClass({displayName: 'PhotoswipeGallery',

    mixins: [],

    getInitialState: function() {
        return {
            PSInstance: null
        };
    },

    render: function() {
        //jsx in here
        return(
            React.DOM.div( {id:"Gallery", className:"gallery"} )
        );
    },

    componentDidMount: function() {

        var _this = this;
        if(!Photoswipe)
        {
            var intervalID = setInterval(function(){
                if(Photoswipe)
                {
                    clearInterval(intervalID);
                    _this.initAndRefresh();

                }
            },25);
        }
        else
            _this.initAndRefresh();
        //
    },

    initAndRefresh : function() {
        this.state.PSInstance = Photoswipe.attach( this.props.images,
            {
                target: this.getDOMNode(),
                preventHide: true,
                getImageSource: function(obj){
                    return obj.url;
                },
                getImageCaption: function(obj){
                    return obj.caption;
                }
            });
        this.state.PSInstance.show(0);
    },

    attachToDOM: function(id,props) {

        React.renderComponent(

            PhotoswipeGallery( {images:props.images} )

            , document.getElementById(id)
        );
    },

    componentWillUnmount: function() {
        this.state.PSInstance.destroy();
    }

});



module.exports = PhotoswipeGallery;






},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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




},{"./routers/ExampleRouter.jsx":12}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
/** @jsx React.DOM */
/*global testBb, Backbone*/

//var ExampleComponent = ctx.get('ExampleComponent');
//var PhotoswipeGallery = ctx.get('PhotoswipeGallery');
//var PhotoswipeGallery2 = ctx.get('PhotoswipeGallery');
//var ExampleModel = ctx.get('ExampleModel');


var ExampleComponent = require('../../components/ExampleComponent/ExampleComponent.jsx');
var PhotoswipeGallery = require('../../components/PhotoswipeGalleryComponent/PhotoswipeGallery.jsx');
var HelloBootstrap = require('../../components/HelloBootstrap/HelloBootstrap.jsx');
var OffCanvasTemplate = require('../../components/OffCanvasTemplate/OffCanvasTemplate.jsx');
var Navbar = require('../../components/Navbar/Navbar.jsx');
var ExampleModel = require('../models/Example-model');

var EBookView = require('../../components/EBookView/EBookView.jsx');
var EBookViewChapter = require('../../components/EBookView/EBookViewChapter.jsx');



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
            React.DOM.div(null, 
                Navbar(null ),
                OffCanvasTemplate( {title:"Hello World Demo"} )
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
                 Navbar(null ),
                 EBookView(null, 
                     EBookViewChapter(null, 
                         React.DOM.h1(null, "Page 1"),
                         React.DOM.hr(null),
                         React.DOM.p(null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."),
                         React.DOM.p(null, "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem."),
                         React.DOM.p(null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"),
                         React.DOM.p(null, "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"),
                         React.DOM.p(null, "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."),
                         React.DOM.p(null, "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."),
                         React.DOM.p(null, "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat..."),
                         React.DOM.br(null),
                         React.DOM.h2(null, "More Lorem Ipsum"),
                         React.DOM.hr(null),
                         React.DOM.p(null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."),
                         React.DOM.p(null, "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem."),
                         React.DOM.p(null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"),
                         React.DOM.p(null, "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"),
                         React.DOM.p(null, "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."),
                         React.DOM.p(null, "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."),
                         React.DOM.p(null, "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat..."),
                         React.DOM.br(null),
                         React.DOM.h2(null, "Even More Lorem Ipsum"),
                         React.DOM.hr(null),
                         React.DOM.p(null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."),
                         React.DOM.p(null, "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem."),
                         React.DOM.p(null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"),
                         React.DOM.p(null, "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"),
                         React.DOM.p(null, "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."),
                         React.DOM.p(null, "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."),
                         React.DOM.p(null, "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat..."),
                         React.DOM.br(null),React.DOM.br(null)
                     ),
                     EBookViewChapter(null, 
                         React.DOM.h1(null, "Page 2"),
                         React.DOM.hr(null),
                         React.DOM.p(null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."),
                         React.DOM.p(null, "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem."),
                         React.DOM.p(null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"),
                         React.DOM.p(null, "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"),
                         React.DOM.p(null, "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."),
                         React.DOM.p(null, "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."),
                         React.DOM.p(null, "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat..."),
                         React.DOM.br(null),
                         React.DOM.h2(null, "More Lorem Ipsum"),
                         React.DOM.hr(null),
                         React.DOM.p(null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."),
                         React.DOM.p(null, "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem."),
                         React.DOM.p(null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"),
                         React.DOM.p(null, "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"),
                         React.DOM.p(null, "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."),
                         React.DOM.p(null, "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."),
                         React.DOM.p(null, "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat..."),
                         React.DOM.br(null),
                         React.DOM.h2(null, "Even More Lorem Ipsum"),
                         React.DOM.hr(null),
                         React.DOM.p(null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."),
                         React.DOM.p(null, "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem."),
                         React.DOM.p(null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"),
                         React.DOM.p(null, "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"),
                         React.DOM.p(null, "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."),
                         React.DOM.p(null, "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."),
                         React.DOM.p(null, "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat..."),
                         React.DOM.br(null ),React.DOM.br(null )
                     ),
                     EBookViewChapter(null, 
                         React.DOM.h1(null, "Page 3"),
                         React.DOM.hr(null),
                         React.DOM.p(null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."),
                         React.DOM.p(null, "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem."),
                         React.DOM.p(null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"),
                         React.DOM.p(null, "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"),
                         React.DOM.p(null, "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."),
                         React.DOM.p(null, "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."),
                         React.DOM.p(null, "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat..."),
                         React.DOM.br(null),
                         React.DOM.h2(null, "More Lorem Ipsum"),
                         React.DOM.hr(null),
                         React.DOM.img( {src:"http://placehold.it/300x200", height:"200"}),
                         React.DOM.p(null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."),
                         React.DOM.p(null, "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem."),
                         React.DOM.p(null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"),
                         React.DOM.p(null, "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"),
                         React.DOM.p(null, "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."),
                         React.DOM.p(null, "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."),
                         React.DOM.p(null, "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat..."),
                         React.DOM.br(null),
                         React.DOM.h2(null, "Even More Lorem Ipsum"),
                         React.DOM.hr(null),
                         React.DOM.p(null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo."),
                         React.DOM.p(null, "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem."),
                         React.DOM.p(null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?"),
                         React.DOM.p(null, "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"),
                         React.DOM.p(null, "At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga."),
                         React.DOM.p(null, "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."),
                         React.DOM.p(null, "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat..."),
                         React.DOM.br(null ),React.DOM.br(null )
                     ),
                     EBookViewChapter(null, 
                         OffCanvasTemplate( {title:"Inline with iScroll"} )
                     )
                 )
                     )
//                , document.body
                  , document.getElementById("appContainer")
          );

    }

});

//ctx
module.exports = ExampleRouter;
//ctx.register("ExampleRouter", ExampleRouter,{});


},{"../../components/EBookView/EBookView.jsx":1,"../../components/EBookView/EBookViewChapter.jsx":2,"../../components/ExampleComponent/ExampleComponent.jsx":3,"../../components/HelloBootstrap/HelloBootstrap.jsx":4,"../../components/Navbar/Navbar.jsx":5,"../../components/OffCanvasTemplate/OffCanvasTemplate.jsx":6,"../../components/PhotoswipeGalleryComponent/PhotoswipeGallery.jsx":7,"../models/Example-model":11}]},{},[10])
;