/**
 * Copyright 2026 Son of Binary
 * The pawaPay_bot Project
 * The webui microservice
 * 
 * This module contains just features necessary for running this view within Telegram.
 */


export function getTelegramParams() {
    return new URLSearchParams(window.location.search).get('tgWebAppStartParam')?.split('___')
}