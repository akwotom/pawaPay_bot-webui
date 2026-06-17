<!--
    Copyright 2026 Son of Binary
    The pawaPay_bot Project
    The web_ui microservice

    This component is a common UI between both funding, and liquidation operations of a cheque
-->

<script setup>
import Frame from '../Frame.vue';
import PwButton from '../PwButton.vue';
import LoadingSvg from './icons/loading.svg.vue';
import InputPaymentMethod from './InputPaymentMethod.vue';
import PaymentPolling from './PaymentPolling.vue';
import PaymentSuccess from './PaymentSuccess.vue';
import createHandlePaymentState from './state.mjs';



const { isComplete, execCheque, urlParamKeys } = defineProps({
    isComplete: {
        type: Function,
    },
    execCheque: {
        type: Function,
    },
    urlParamKeys: {
        type: Array,
    }
})
const state = createHandlePaymentState({ execFxn: execCheque, isComplete, urlParamKeys })


</script>


<template>

    <div>

        <Frame>
            <div v-if="state.fatal_error">{{ state.fatal_error }}</div>


            <div v-else-if="state.data.error" class="error">
                <div>{{ state.data.error.msg }}</div>
                <PwButton @click="state.data.error.retry()">Retry</PwButton>
            </div>

            <PaymentPolling v-else-if="state.data.view == 'polling'" :state="state" />
            <PaymentSuccess v-else-if="state.data.view == 'success'" :state="state">
                <slot name="success"></slot>
            </PaymentSuccess>

            <div v-else class="cheque-funding-ui">

                <div class="title">
                    <div class="amount">
                        <div class="value">{{ state?.data.amount?.value }}</div>
                        <div class="currencyCode">{{ state?.data.amount?.currency_code }}</div>
                    </div>
                </div>

                <div class="input-view">
                    <div>Payment Method</div>
                    <InputPaymentMethod :state="state" />
                </div>

                <div class="action">
                    <PwButton @click="state.execCheque()">
                        <slot name="action-button" />
                        <LoadingSvg v-if="state.data.isExecuting"
                            style="width:2em; height: 1.5em; --main-purple: white; margin-left: 1em;" />
                    </PwButton>
                </div>

                <div class="info">
                    <slot name="info" />
                </div>

            </div>
        </Frame>

    </div>

</template>


<style scoped>
.cheque-funding-ui {
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.cheque-funding-ui>.title {
    font-size: 5em;
}

.cheque-funding-ui>.title>.amount {
    display: flex;
    font-weight: 900;
}

.cheque-funding-ui>.title>.amount>.currencyCode {
    font-size: 0.5em;
    font-weight: 100;
}

.cheque-funding-ui>.input-view {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.cheque-funding-ui>.info {
    color: rgba(39, 39, 40, 0.773);
}

.error {
    display: flex;
    flex-direction: column;
    gap: 3em;
}
</style>