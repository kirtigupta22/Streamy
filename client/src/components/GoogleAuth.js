import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    //state = { isSignedIn: null};

    componentDidMount() {

        window.gapi.load('client:auth2' , () => {  //to tell that this gapi variable is available inside the windows scope of browser we add window.we load up the client portion of the library
            window.gapi.client.init({
                clientId: '241491252097-4af6l9nghli8fal1tboihrg4ejhg15tj.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();// auth object
                //this.setState({ isSignedIn : this.auth.isSignedIn.get() }); //update component level state for component to rerender itself and update jsx accordingy.
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // =========without redux ===========//
    // onAuthChange = () => {// as this is a call back function therefore we use arrow function to bind its context to places where it is referenced.

    //     this.setState({ isSignedIn: this.auth.isSignedIn.get() });

    // }
    //==================================//

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } 
        else {
            this.props.signOut();
        }
    }


    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {//use state instead of props when doing without redux.
            return null;
        }
        else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick= {this.onSignOutClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        else {
            return (
                <button className="ui green google button" onClick={this.onSignInClick}>
                    <i className="google icon" />
                    Sign in with Google
                </button>
            );
        }
    }

    render() {

        return <div>{this.renderAuthButton()}</div>;
    }

}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect( mapStateToProps, { signIn, signOut })(GoogleAuth);
//client - id : 241491252097-4af6l9nghli8fal1tboihrg4ejhg15tj.apps.googleusercontent.com


