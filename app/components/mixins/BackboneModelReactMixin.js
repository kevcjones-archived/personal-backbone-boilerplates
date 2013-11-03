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


ctx.register("BackboneModelReactMixin").object(BackboneModelReactMixin);