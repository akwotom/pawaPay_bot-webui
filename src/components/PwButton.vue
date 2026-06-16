<!--
    Copyright 2026 Son of Binary
    The pawaPay_bot Project
    The webui microservice

    This component is a standard button used throughout the project
-->

<script setup>
</script>


<template>

    <div class="pw-button">
        <slot>The Button</slot>
    </div>

</template>


<style scoped>
.pw-button {
    padding: 0.6em;
    border-radius: 0.75em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--main-purple);
    color: white;
    cursor: pointer;
    font-size: 1.3em;
}
</style>