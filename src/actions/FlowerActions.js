import FlowerActionTypes from './FlowerActionTypes'

const loadFlowersSuccess = (auth, response) => ({
    type: FlowerActionTypes.LOAD_FLOWERS_SUCCESS,
    auth,
    response
})

const loadFlowersFailure = (error) =>  ({
    type: FlowerActionTypes.LOAD_FLOWERS_FAILURE,
    error
})

const loadFlowersRequest = (auth) => ({
    type: FlowerActionTypes.LOAD_FLOWERS_REQUEST,
    auth
})

export default {
    loadFlowersFailure,
    loadFlowersRequest,
    loadFlowersSuccess
}
