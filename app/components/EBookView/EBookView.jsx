/** @jsx React.DOM */

var EBookViewChapter = require('./EBookViewChapter.jsx');


var EBookView = React.createClass({

    mixins: [],

    render: function() {
        return (

            <div class="frame">
                <div class="chapterWrapper" ref="chapterWrapper">
                    <div class="chapterScroller" ref="chapterScroller">
                        {this.props.children}
                    </div>
                </div>
            </div>

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
