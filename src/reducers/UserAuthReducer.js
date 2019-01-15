import UserAuthActionTypes from '../actions/UserAuthActionTypes'

export default (state = [], action) => {
    switch (action.type) {
        case UserAuthActionTypes.USER_LOGIN_SUCCESS:
            let auth_token = action.authToken.auth_token;

            return {
                ...state,
                type: UserAuthActionTypes.USER_LOGIN_SUCCESS,
                auth_token
            };
        case UserAuthActionTypes.USER_LOGIN_FAILURE:
            const error = action.error;

            return {
                ...state,
                type: UserAuthActionTypes.USER_LOGIN_FAILURE,
                error
            };
        case UserAuthActionTypes.USER_SIGNUP_SUCCESS:
            auth_token = action.authToken.auth_token;
        
            return {
                ...state,
                type: UserAuthActionTypes.USER_SIGNUP_SUCCESS,
                auth_token,
                userData: action.userData
            };
        case UserAuthActionTypes.SHOW_USER_SECTION:
            return {
                ...state,
                type: UserAuthActionTypes.SHOW_USER_SECTION
            }
        case UserAuthActionTypes.SHOW_USER_PROFILE:
            return {
                ...state,
                type: UserAuthActionTypes.SHOW_USER_PROFILE
            }
        default:
            return state;
    }
}
