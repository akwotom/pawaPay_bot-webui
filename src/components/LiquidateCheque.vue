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
* This method begins the process of allowing the user to cash out his cheque.
*/
async function liquidateCheque(data) {


    return (await moneybrainApi.post(`/api/cheque/${data.cheque_id}/liquidate`, {
        payment_method: {
            account_id: data.payment_method_account_id,
            provider: guessProvier(data.payment_method_account_id),
        }
    })).data;


}

</script>


<template>

    <ExecCheque :exec-cheque="liquidateCheque" :initial-value="value" :is-complete="v => v.liquidated"
        :url-param-keys="['cheque_id']">
        <template #action-button>Collect Funds</template>
        <template #info>
            Enter your account details and collect the money. Make sure someone else has not already collected the
            funds.
        </template>
        <template #success>This order has been fully paid for, and now, the recipient can collect the money.</template>
    </ExecCheque>

</template>