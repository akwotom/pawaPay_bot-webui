/**
 * Copyright 2026 Son of Binary
 * The pawaPay_bot Project
 * The webui microservice
 * The HandlePayment component
 * 
 * This module contains the state management logic for the component.
 */

import moneybrainApi from "@/moneybrain/api.mjs";
import { defineStore } from "pinia";
import { reactive } from "vue";


/**
 * This method gets all values specified by the keys, from the url query
 * @param {string[]} urlParamKeys 
 * @returns 
 */
function getInitialValues(urlParamKeys) {

    // Get the initial values from the url query string
    // TODO: Get them securely from Telegram


    let params = new URL(window.location.href).searchParams;

    /**
     * 
     * @param {string} key 
     */
    function getValue(key,) {

        const value = params.get(key)

        if (!value) {
            console.log(`${key} was not found in url query params `)
            throw new Error("Check the link you clicked. It is missing necessary information.");
        }

        return value;
    }

    let values = {}


    for (const key of urlParamKeys) {

        console.log(`Looping at key `, key)

        if (key.includes('.')) {
            const [prefix, ...parts] = key.split('.')
            let ref = values[prefix] ||= {}

            for (let i = 0; i < parts.length - 1; i++) {
                ref = ref[parts[i]] ||= {}
            }

            for (let i = 0; i < parts.length; i++) {
                eval(`values.${key}=getValue('${key}')`)
            }
        } else {
            values[key] = getValue(key, params)
        }
    }


    return values
}

const createHandlePaymentState = function ({ execFxn, isComplete, urlParamKeys, }) {
    return defineStore('handlePayment', () => {

        try {

            let data = reactive({
                view: "input",
                payment_method_account_id: undefined,
                cheque_id: undefined,
                funded: false,
                ...getInitialValues(urlParamKeys),
            });


            async function pollCheque() {
                let details = await moneybrainApi.get(`/api/cheque/${data.cheque_id}/payment-states`)
                data.funded = details.funded;
                data.liquidated = details.liquidated;
                if (details.amount) data.amount = details.amount;

                if (data.view == 'polling' && isComplete(data)) {
                    data.view = 'success'
                }
                console.log(`Cheque status `, details)

            }

            const execCheque = async () => {
                try {
                    const response = await execFxn(data)
                    console.log(`Just got this response `, response)
                    data.cheque_id = data.cheque_id || response.id
                    data.view = "polling";
                    console.log(`data.cheque_id is now `, data.cheque_id)
                } catch (e) {
                    data.error = {
                        msg: `${e}`,
                        retry: execCheque,
                    }
                    console.log(`An error `, e)
                }
            }


            return {
                pollCheque,
                execCheque,
                data,
            }
        } catch (e) {
            console.log(`There's an error `,)
            return {
                fatal_error: `${e}`
            }
        }
    })()
}

export default createHandlePaymentState