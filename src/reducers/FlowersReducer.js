import FlowerActionTypes from '../actions/FlowerActionTypes';

export default (state = [], action) => {
    switch(action.type){
        case FlowerActionTypes.LOAD_FLOWERS_SUCCESS:
            const flowers = action.response.flowers;

			return {flowers};
		default:
			return state;
	}
}
