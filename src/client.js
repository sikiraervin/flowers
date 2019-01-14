// -----------------------------------------------------------------------------------------------
// TODO: Investigate if browser support for fetch is veri guuud, or use 'cross-fetch' polyfill
// -----------------------------------------------------------------------------------------------
// TODO: Pull API urls to constants.js
// -----------------------------------------------------------------------------------------------

import { PUBLIC_API_TOKEN } from './constants' 

// ----------- FOR DEBUG PURPOSES ------------

import { FLOWERS } from './mocked-data'
const MOCK_API = true
const MOCKED_AUTH_TOKEN = {
    auth_token: 'qwerty'
}

// -------------------------------------------

const login = (data) => {
    
    if(MOCK_API){
        return new Promise(resolve => resolve(MOCKED_AUTH_TOKEN));
    }

    return fetch('https://flowrspot-api.herokuapp.com/api/v1/users/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(checkStatus)
        .then(parseJSON)
}

const signup = data => {
    
    if(MOCK_API){
        return new Promise(resolve => resolve(MOCKED_AUTH_TOKEN));
    }

    return fetch('https://flowrspot-api.herokuapp.com/api/v1/users/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    'first_name': data.name,
                    'last_name': data.lastName,
                    'date_of_birth': data.dateOfBirth,
                    'email': data.email,
                    'password': data.password
                })
        })
        .then(checkStatus)
        .then(parseJSON)
}

const getFlowers = () => {
    if(MOCK_API){
        return new Promise((resolve) => resolve({flowers: FLOWERS}));
    }

    return  fetch('https://flowrspot-api.herokuapp.com/api/v1/flowers', {
        method: 'get',
        headers: {
            'Authorization': PUBLIC_API_TOKEN
        }
    })
    .then(checkStatus)
    .then(parseJSON)
}

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    
    console.log(error);
    
    throw error;
}

const parseJSON = (response) => response.json()

export default {
    login,
    signup,
    getFlowers
}