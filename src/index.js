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

    if (telegramData) {

        if (telegramData.length > 2) {

            window.location = "/fund";
            await router.push({
                path: '/fund?iii=33'
            });
        } else {
            window.location = "/liquidate";
            router.push({
                path: '/liquidate?ddd=ke'
            })
        }
    }

}