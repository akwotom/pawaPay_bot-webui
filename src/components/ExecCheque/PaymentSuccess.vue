<!--
    Copyright 2026 Son of Binary
    The pawaPay_bot Project
    The webui microservice

    This view shows when payment is successful.
-->


<script setup>
import PwButton from '../PwButton.vue';
import TickSvg from './icons/tick.svg.vue';

</script>


<template>
    <div class="payment-success">
        <TickSvg style="width:7em; height: 7em;" />
        <div>
            <slot />
        </div>
        <PwButton style="width: 100%">Thank you!</PwButton>
    </div>
</template>


<style scoped>
.payment-success {
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
}
</style>