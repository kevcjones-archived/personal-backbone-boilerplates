/** @jsx React.DOM */

if(!Code)
    if(!Code.PhotoSwipe)
        throw("Dependency missing - Make sure you have loaded Photoswipe already");


var Photoswipe = window.Code.PhotoSwipe;


var PhotoswipeGallery = React.createClass({

    mixins: [],

    getInitialState: function() {
        return {
            PSInstance: null
        };
    },

    render: function() {
        //jsx in here
        return(
            <div id="Gallery" class="gallery" />
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

            <PhotoswipeGallery images={props.images} />

            , document.getElementById(id)
        );
    },

    componentWillUnmount: function() {
        this.state.PSInstance.destroy();
    }

});



module.exports = PhotoswipeGallery;





