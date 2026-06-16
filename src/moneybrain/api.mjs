/**
 * Copyright 2026 Son of Binary
 * The pawaPay_bot Project
 * The webui microservice
 * 
 * This module contains the logic necessary for accessing moneybrain's APIs.
 * moneybrain is the main microservice in charge of managing cheques and payments.
 */



/**
 * This method makes a request to the moneybrain microservice.
 * @param {string} method 
 * @param {string} path 
 * @param {string} body 
 */
async function makeRequest(method, path, headers, body) {
    const BASE_URL = import.meta.env.VITE_MONEYBRAIN_URL
    console.log(`Making request to ${BASE_URL}`)

    if (!BASE_URL) throw new Error(`Programmer Error: API URL for moneybrain was not defined.`);

    const response = await fetch(new URL(path, BASE_URL,).href, {
        body,
        method,
        headers,
    })

    if (response.status > 299 || response.status < 200) {
        let err;
        try {
            err = await response.text();
            const json = JSON.parse(err)
            err = json.msg || json
        } catch { }

        throw new Error(`${err}\nStatus: ${response.status}`)
    }

    return await response.json()
}




/**
 * This method makes a post request to the moneybrain microservice.
 * @param {string} path 
 * @param {object} body 
 */
function post(path, body) {
    return makeRequest("POST", path, { 'Content-Type': 'application/json' }, JSON.stringify(body))
}


/**
 * This method makes a post request to the moneybrain microservice.
 * @param {string} path 
 * @param {string} body 
 */
function get(path) {
    return makeRequest("GET", path)
}


const moneybrainApi = {
    post,
    get,
}

export default moneybrainApi;