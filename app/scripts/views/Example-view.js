/*global testBb, Backbone, JST*/

myApp.classes.views.myApp = Backbone.View.extend({

    template: JST['Example'],

    events :{
        "click p.templated" : "alertClicked"
    },

//    optional init auto called on creation of the view, incase you have extra steps you wish to take
//    initialize : function(options){
//
//
//    },

    render: function(){

        //assuming you passed a model into the new myApp({model:myApp}) call
        var attributes = this.model.toJSON();
        this.$el.html(this.template(attributes));
    },



    alertClicked: function(e)
    {
        alert('clicked on this!!' + this);
    }


});
