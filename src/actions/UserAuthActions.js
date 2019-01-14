import UserAuthActionTypes from './UserAuthActionTypes'

const userLoginRequest = (email, password) => ({
    type: UserAuthActionTypes.USER_LOGIN_REQUEST,
    email: email,
    password: password
})

const userLoginSuccess = (authToken) => ({
    type: UserAuthActionTypes.USER_LOGIN_SUCCESS,
    authToken: authToken
})

const userLoginFailure = (error) => ({
    type: UserAuthActionTypes.USER_LOGIN_FAILURE,
    error
})

const userSignupRequest = (email, password) => ({
    type: UserAuthActionTypes.USER_SIGNUP_REQUEST,
    email: email,
    password: password
})

const userSignupSuccess = (authToken) => ({
    type: UserAuthActionTypes.USER_SIGNUP_SUCCESS,
    authToken: authToken
})

const userSignupFailure = (error) => ({
    type: UserAuthActionTypes.USER_SIGNUP_FAILURE,
    error
})

export default {
    userLoginFailure,
    userLoginRequest,
    userLoginSuccess,
    userSignupFailure,
    userSignupRequest,
    userSignupSuccess
}
