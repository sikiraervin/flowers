import React from 'react';
import logo from '../images/logo.jpg';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export class NavigationMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoginModal: false,
            showSignupModal: false,
        }

        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
    }

    toggleLoginModal() {
        this.setState({
            showLoginModal: true
        });
    }

    toggleSignupModal() {
        this.setState({
            showSignupModal: true
        });
    }

    render() {
        return (
            <div className="Navbar">
                <nav className="Navbar__Items">
                    <div className="Navbar__Link Navbar__Link-brand">
                        <img src={logo} alt="logo" />
                    </div>
                </nav>
                <nav className="Navbar__Items Navbar__Items--right">
                    <div className="Navbar__Link">
                        <button className="Navbar__Link__Button">Flowers</button>
                    </div>
                    <div className="Navbar__Link">
                        <button className="Navbar__Link__Button">Latest Sightings</button>
                    </div>
                    <div className="Navbar__Link">
                        <button className="Navbar__Link__Button">Favorites</button>
                    </div>
                    <div className="Navbar__Link">
                        <LoginModal
                            showLoginModal={this.state.showLoginModal}
                            ref="loginmodal"
                        />
                        <button
                            className="Navbar__Link__Button Login__Btn"
                            onClick={this.toggleLoginModal}
                        >
                            Login
                        </button>
                    </div>
                    <div className="Navbar__Link">
                        <SignupModal
                            showSignupModal={this.state.showSignupModal}
                            ref="signupmodal"
                        />
                        <button
                            className="Navbar__Link__Button NewAcc__Btn"
                            onClick={this.toggleSignupModal}
                        >
                            New Account
                        </button>
                    </div>
                </nav>
            </div>
        );
    }
}
