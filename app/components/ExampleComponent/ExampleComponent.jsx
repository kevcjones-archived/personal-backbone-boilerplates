/** @jsx React.DOM */
/** ctx is context for di-lite */

//var BackboneModelReactMixin = ctx.get('BackboneModelReactMixin');
var BackboneModelReactMixin = require('../../../app/components/mixins/BackboneModelReactMixin');

var ExampleComponent = React.createClass({

    mixins: [BackboneModelReactMixin],

    getBackboneModels: function() {
        return [this.props.model];
    },

    render: function() {
        return (

            <div class="testStyle">
                <h2>{this.props.title}</h2>
                <a href="void(0);" onClick={this.handleClick}>Pull the model - {this.props.model.get("counter")}</a>
                <p onClick={this.handleRedirectClick}>Redirect Test</p>
            </div>

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

            <ExampleComponent model={props.model} title={props.title}/>,

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
