import React from 'react';
import logo from '../images/logo.jpg';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';

export class NavigationMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: false,
            showSignup: false,
        }

        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
    }

    toggleLoginModal() {
        this.setState({
            showLogin: !this.state.showLogin
        });

        this.refs.loginmodal.toggle();
    }

    toggleSignupModal() {
        this.setState({
            showSignup: !this.state.showSignup
        });

        this.refs.signupmodal.toggle();
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
                            show={this.state.showLogin}
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
                            show={this.state.showSignup}
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
