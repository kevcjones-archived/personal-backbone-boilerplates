/** @jsx React.DOM */
/** ctx is context for di-lite */

var BackboneModelReactMixin = ctx.get('BackboneModelReactMixin');

var ExampleComponent = React.createClass({

    mixins: [BackboneModelReactMixin],

    componentDidMount: function() {
        // Additional functionality for todomvc: fetch() the collection on init
        this.props.model.fetch();
    },

    getBackboneModels: function() {
        return [this.props.model];
    },

    handleClick: function(event) {
        var counter = this.props.model.get("counter");
        counter++;
        this.props.model.set("counter",counter);
        this.props.model.save();
        return false;
    },

    handleRedirectClick: function(event) {
        ctx.get("history").navigate("test", {trigger: true});
        return false;
    },

    render: function() {
        return (

            <div class="testStyle">
                <h2>{this.props.title}</h2>
                <p onClick={this.handleClick}>Pull the model - {this.props.model.get("counter")}</p>
                <p onClick={this.handleRedirectClick}>Redirect Test</p>
            </div>

        );
    },

    attachToDOM: function(id,props) {
        React.renderComponent(

            <ExampleComponent model={props.model} title={props.title}/>,

            document.getElementById(id)
        );
    }

});


ctx.register("ExampleComponent").object(ExampleComponent);


/*

 @Usage

 React.renderComponent(
 ExampleComponent( {model:myApp.models.example} ), document.getElementById(myApp.rootEl)
 );

*/
