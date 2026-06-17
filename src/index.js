/**
 * Copyright 2026 Son of Binary
 * The pawaPay_bot Project
 * The webui microservice
 * 
 * This module is the entry point of the page.
 */

import router from "./router";
import { getTelegramParams } from "./telegram.mjs";


export async function appInit() {
    console.log(`I exist`)

    let telegramData = getTelegramParams()

    console.log(`This is the telegram data `, telegramData)

    window.Telegram?.WebApp?.read()

    if (telegramData) {

        if (telegramData.length > 2) {
            const [
                amount_value,
                amount_currency_code,
                inline_message_id
            ] = telegramData;
            console.log(`Will be redirecting shortly..`)
            window.location = `/fund?amount.value=${amount_value}&amount.currency_code=${amount_currency_code}&inline_message_id=${inline_message_id}`
        } else {
            window.location = `/liquidate?cheque_id=${telegramData[0]}`;
        }
    }

}