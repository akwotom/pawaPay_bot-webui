<!--
    Copyright 2026 Son of Binary
    The pawaPay_bot Project
    The web_ui microservice

    This page allows the user to make payment for cheque he's sending.
-->



<script setup>
import FundCheque from '@/components/FundCheque.vue';

</script>


<template>

    <div class="make-payment">
        <FundCheque />
    </div>
</template>



<style scoped>
.make-payment {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>