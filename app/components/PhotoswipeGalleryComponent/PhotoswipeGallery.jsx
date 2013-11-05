/** @jsx React.DOM */
/** ctx is context for di-lite */

//var BackboneModelReactMixin = ctx.get('BackboneModelReactMixin');
var PhotoswipeGallery = null;
var Photoswipe = null;
if(!ctx.has("PhotoSwipe"))
{
    ///Users/user/Documents/Work/MY/personal-backbone-boilerplates/app/components/PhotoswipeGalleryComponent/bower_components/photoswipe/release/3.0.3/code.photoswipe-3.0.3.min.js
    $LAB
        .script("./components/PhotoswipeGalleryComponent/bower_components/photoswipe/release/3.0.3/lib/klass.min.js")
        .script("./components/PhotoswipeGalleryComponent/bower_components/photoswipe/release/3.0.3/code.photoswipe-3.0.3.js")
        .wait(function()
        {
            ctx.register("PhotoSwipe", window.Code.PhotoSwipe);
            Photoswipe = window.Code.PhotoSwipe;
        });
}else
{
    Photoswipe = window.Code.PhotoSwipe;
}


PhotoswipeGallery = React.createClass({




    mixins: [],

    getInitialState: function() {
        return {
            PSInstance: null
        };
    },

    initAndRefresh : function() {
        console.log("CALLING INIT AND REFRESH");
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


    render: function() {
        //jsx in heere
        return(

            <div id="Gallery" class="gallery">

            </div>

            );
    },



    attachToDOM: function(id,props) {

        React.renderComponent(

            <PhotoswipeGallery images={props.images} />

            , document.getElementById(id)
        );
    },

    componentDidUnmount: function() {
        this.state.PSInstance.destroy();
    }

});


ctx.register("PhotoswipeGallery").object(PhotoswipeGallery);





