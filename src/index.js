/**
 * Copyright 2026 Son of Binary
 * The pawaPay_bot Project
 * The webui microservice
 * 
 * This module is the entry point of the page.
 */

import router from "./router";

console.log = console.error = console.info = (...data) => {
    for (const item of data) {
        const div = document.createElement('div')
        div.innerHTML = `${item}`
        document.body.appendChild(div)
    }
}

let telegramData = window.Telegram?.WebApp?.initDataUnsafe?.start_param;

if (telegramData) {
    telegramData = telegramData.split('_')

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
