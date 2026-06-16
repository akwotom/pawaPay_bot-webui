<!--
    Copyright 2026 Son of Binary
    The pawaPay_bot Project
    The webui microservice

    This view is constantly active, as long as the user has a pending payment.
-->


<script setup>
import PwButton from '../PwButton.vue';
import LoadingSvg from './icons/loading.svg.vue';
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
    state: {}
})

function startPolling(delay) {
    setInterval(() => props.state.pollCheque(), delay)
}

let shortInterval = startPolling(3_000);
let longInterval = undefined;

setTimeout(() => {
    // After 30s start polling according to the long interval
    if (!shortInterval) return; // Transaction was already complete.
    clearInterval(shortInterval);
    shortInterval = undefined;
    longInterval = startPolling(10_000)
}, 30_000)

onUnmounted(() => {
    clearInterval(shortInterval)
    clearInterval(longInterval)
    shortInterval = undefined;
    longInterval = undefined;
})

onMounted(() => props.state.pollCheque())


</script>



<template>

    <div class="payment-polling">
        <LoadingSvg width="5em" />
        <div>Waiting for transaction to complete...</div>
        <PwButton style="width:100%" @click="props.state.data.view = 'input'">Cancel</PwButton>
    </div>

</template>

<style scoped>
.payment-polling {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items: center;
}
</style>