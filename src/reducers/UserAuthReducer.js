import UserAuthActionTypes from '../actions/UserAuthActionTypes'

export default (state = [], action) => {
    switch(action.type){
        case UserAuthActionTypes.USER_LOGIN_SUCCESS:
            let auth_token = action.authToken.auth_token;

            return {...state, auth_token};
        case UserAuthActionTypes.USER_LOGIN_FAILURE:
            const error = action.error;

            return {...state, error};
        case UserAuthActionTypes.USER_SIGNUP_SUCCESS:
             auth_token = action.authToken.auth_token;

            return {...state, auth_token};
		default:
			return state;
	}
}
