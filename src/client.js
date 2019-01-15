// -----------------------------------------------------------------------------------------------
// TODO: Investigate if browser support for fetch is veri guuud, or use 'cross-fetch' polyfill
// -----------------------------------------------------------------------------------------------
// TODO: Pull API urls to constants.js
// -----------------------------------------------------------------------------------------------

import { PUBLIC_API_TOKEN } from './constants' 

// ----------- FOR DEBUG PURPOSES ------------

import { FLOWERS } from './mocked-data'
const MOCK_API = false
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
                'Accept': 'application/json',
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

    //TODO: Implement dispatches

    return  fetch('https://flowrspot-api.herokuapp.com/api/v1/flowers', {
        method: 'get',
        headers: {
            'Authorization': PUBLIC_API_TOKEN
        }
    })
    .then(checkStatus)
    .then(parseJSON)
}

const getUserData = (authToken) => {
    if(MOCK_API){
        return new Promise((resolve) => resolve({
            name: 'John',
            lastName: 'Doe'
        }))
    }


    return fetch('flowrspot-api.herokuapp.com/api/v1/users/me', {
        method: 'get',
        headers: {
            'Authorization': authToken
        }
    })
    .then(checkStatus)
    .then(parseJSON)
}

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } 

    return response.text().then(err => err);
}

const parseJSON = (response) => {
    if(response.ok){
        try {
            var parsed = response.json();
            return parsed;
        } catch(err){
            console.log(err)
            return response.text();
        }
    } 

    try {
        let rawError = JSON.parse(response);
        return Promise.reject(rawError.error.join('\n'));
    } catch(errorParsing){
        console.log('Error parsing the response.');

        return "There was an issue with your request!";
    }
}

export default {
    login,
    signup,
    getFlowers,
    getUserData
}