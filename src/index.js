/**
 * Copyright 2026 Son of Binary
 * The pawaPay_bot Project
 * The webui microservice
 * 
 * This module is the entry point of the page.
 */

import router from "./router";
import { getTelegramParams } from "./telegram.mjs";

console.log(`I exist`)

let telegramData = getTelegramParams()

if (telegramData) {

    if (telegramData.length > 2) {
        router.push({
            path: '/fund?iii=33'
        });
    } else {
        router.push({
            path: '/liquidate?ddd=ke'
        })
    }
}
