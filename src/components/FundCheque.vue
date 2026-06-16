<!--
    Copyright 2026 Son of Binary
    The pawaPay_bot Project
    The webui microservice

    This view is where the user gets to pay for his cheque, before the correspondent gets to liquidate it.
-->

<script setup>
import moneybrainApi from '@/moneybrain/api.mjs';
import ExecCheque from './ExecCheque/ExecCheque.vue';


function guessProvier(account_id) {
    // TODO: Actually parse the phone number to determine the provider.
    return "MTN_MOMO_CMR";
}

/**
* This method begins the process of allowing the user pay for his cheque.
*/
async function fundCheque(data) {

    console.log(`Before funding cheque, data is `, data, `\ndata.amount is `, data.amount)
    return (await moneybrainApi.post("/api/cheque/fund-new-cheque", {
        telegram: {
            inline_message_id: data.inline_message_id,
        },
        amount: {
            ...data.amount,
            value: parseInt(data.amount.value)
        },
        payment_method: {
            account_id: data.payment_method_account_id,
            provider: guessProvier(data.payment_method_account_id),
        }
    })).data;


}

</script>


<template>

    <ExecCheque :exec-cheque="fundCheque" :is-complete="v => v.funded"
        :url-param-keys="['amount.value', 'amount.currency_code', 'inline_message_id']">
        <template #action-button>Pay</template>
        <template #info>
            After payment, your recipient will be able to receive the money via any payment method of his choice.
        </template>
        <template #success>This order has been fully paid for, and now, the recipient can collect the money.</template>
    </ExecCheque>

</template>