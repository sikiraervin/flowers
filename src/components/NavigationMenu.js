import React from 'react';
import logo from '../images/logo.jpg';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import UserAuthActionTypes from '../actions/UserAuthActionTypes';
import userImage from '../images/profile.jpg';
import client from '../client';

import { connect } from 'react-redux';
import UserProfileModal from './UserProfileModal';

class NavigationMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoginModal: false,
            showSignupModal: false,
            userSectionVisible: false,
            showUserProfile: false,
            userProfile: {
                name: 'aaaa',
                lastName: 'ssss'
            }
        }

        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
        this.showUserProfileModal = this.showUserProfileModal.bind(this);
    }

    toggleLoginModal(e = null, toggleSignal) {
        if (typeof toogleSignal === 'undefined') {
            this.setState({
                showLoginModal: !this.state.showLoginModal
            });
        } else {
            this.setState({
                showLoginModal: toggleSignal
            })
        }
    }

    toggleSignupModal(e, toggleSignal, showLoginModal) {
        if (typeof toogleSignal === 'undefined') {
            this.setState({
                showSignupModal: !this.state.showSignupModal
            });
        } else {
            this.setState({
                showSignupModal: toggleSignal
            })
        }

        if(showLoginModal){
           this.setState({
               showLoginModal: true
           })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UserAuthReducer && nextProps.UserAuthReducer.type === UserAuthActionTypes.SHOW_USER_SECTION) {
            this.setState({
                userSectionVisible: true,
                showUserProfile: false,
                userProfile: nextProps.UserAuthReducer.userData
            });

            return;
        }

        if (nextProps.UserAuthReducer && nextProps.UserAuthReducer.type === UserAuthActionTypes.SHOW_USER_PROFILE) {
            client.getUserProfile()
                .then(response => {
                    this.setState({
                        userSectionVisible: true,
                        showUserProfile: true,
                        userProfile: response
                    })
                })
        }

        if(nextProps.UserAuthReducer && nextProps.UserAuthReducer.type === UserAuthActionTypes.USER_LOGIN_SUCCESS){
            client.getUserData(nextProps.auth_token)
            .then(res => {
                console.log(res);
            })
        }
    }

    showUserProfileModal(e = null, toggleSignal) {
        if(typeof toggleSignal === 'undefined'){
            this.setState({
                showUserProfile: !this.state.showUserProfile
            })
        } else {
            this.setState({
                showUserProfile: toggleSignal
            })
        }
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
                    <div className="Navbar__Link" style={{ 'display': this.state.userSectionVisible ? 'none' : 'block' }}>
                        <LoginModal
                            showLoginModal={this.state.showLoginModal}
                            ref="loginmodal"
                            onClose={this.toggleLoginModal}
                        />
                        <button
                            className="Navbar__Link__Button Login__Btn"
                            onClick={this.toggleLoginModal}
                        >
                            Login
                        </button>
                    </div>
                    <div className="Navbar__Link" style={{ 'display': this.state.userSectionVisible ? 'none' : 'block' }}>
                        <SignupModal
                            showSignupModal={this.state.showSignupModal}
                            ref="signupmodal"
                            onClose={this.toggleSignupModal}
                        />
                        <button
                            className="Navbar__Link__Button NewAcc__Btn"
                            onClick={this.toggleSignupModal}
                        >
                            New Account
                        </button>
                    </div>
                    <div 
                        className="Navbar__Link" 
                        style={{ 'display': this.state.userSectionVisible ? 'block' : 'none' }}
                    >
                        <UserProfileModal
                            showUserProfile={this.state.showUserProfile}
                            ref='userprofilemodal'
                            profile={this.state.userProfile}
                            onClose={this.showUserProfileModal}
                        />
                        <button
                            className="Navbar__Link__Button"
                            onClick={this.showUserProfileModal}
                        >
                            {this.state.userProfile.name + ' ' + this.state.userProfile.lastName}
                        </button>
                        <div className='User__Profile__Section__Img'>
                            <img
                                className="User__Icon"
                                src={userImage}
                                alt='fav'
                                onClick={this.showUserProfileModal}
                                style={{cursor: 'pointer', borderRadius: '50%'}}
                            />
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default connect((state) => state, null)(NavigationMenu)
