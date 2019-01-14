export default (state = [], action) => {
    switch(action.type){
		case 'SET_NAVIGATION_COURSE':
			return Object.assign({}, state, {
				visibilityFilter: action.type
			});
		default:
			return state;
	}
}
