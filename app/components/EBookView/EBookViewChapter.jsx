/** @jsx React.DOM */

var EBookViewChapter = React.createClass({

    render: function() {
        return (

            <div class="chapter" >
                <div class="articleWrapper" ref="articleWrapper">
                    <div class="articleScroller">
                        {this.props.children}
                    </div>
                </div>
            </div>

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
