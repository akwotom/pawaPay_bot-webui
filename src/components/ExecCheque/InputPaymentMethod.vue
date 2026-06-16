<!--
    Copyright 2026 Son of Binary
    The pawaPay_bot Project
    The webui microservice

    This component allows the user to input his payment method when funding a cheque.
-->


<script setup>
import MtnSvg from './icons/mtn.svg.vue';
import OrangeSvg from './icons/orange.svg.vue';

const props = defineProps({
    state: {
        type: Object,
    }
});



</script>


<template>

    <div class="input-payment-method">
        <div class="icons">
            <OrangeSvg />
            <MtnSvg />
        </div>
        <input v-model="props.state.data.payment_method_account_id">
    </div>
</template>


<style scoped>
.input-payment-method {
    position: relative;
    display: flex;
    flex-direction: column;
}

.input-payment-method>.icons {
    display: flex;
    align-items: center;
    gap: 0.25em;
    position: absolute;
    top: 0.68em;
    left: 0.5em;
}

.input-payment-method>.icons>* {
    width: 1.5em;
    height: 1.5em;
    border-radius: 0.25em;
}

.input-payment-method>input {
    padding: 0.35em;
    padding-left: 2.75em;
    font-size: 1.95em;
    outline: transparent;
    background-color: rgba(255, 255, 255, 0.51);
    border-radius: 0.5em;
    border: 0.05em solid grey;
    font-family: monospace;
}
</style>