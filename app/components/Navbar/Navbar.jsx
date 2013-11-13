/** @jsx React.DOM */

var Navbar = React.createClass({

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
            <div class="navbar navbar-top navbar-inverse" role="navigation" style={marginBottom}>
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Project name</a>
                    </div>
                    <div class="collapse navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li ref="homeButton" class="active" onClick={this.openHome}><a href="#">Home</a></li>
                            <li ref="tbsButton"><a href="#tbs" onClick={this.openTBS}>Twitter</a></li>
                            <li><a href="#other">Other</a></li>
                            <li><a href="#section">Section</a></li>
                            <li class="dropdown">
                                <a data-toggle="dropdown" class="dropdown-toggle" href="#">Dropdown <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li class="dropdown-submenu">
                                        <a href="#">More options</a>
                                        <ul class="dropdown-menu">
                                            <li><a href="#">Second level link</a></li>
                                            <li><a href="#">Second level link</a></li>
                                            <li><a href="#">Second level link</a></li>
                                            <li><a href="#">Second level link</a></li>
                                            <li><a href="#">Second level link</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            );
    },




    attachToDOM: function(id,props) {
        React.renderComponent(

            <Navbar />,

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
