<!--
    Copyright 2026 Son of Binary
    The pawaPay_bot Project
    The web_ui microservice

    This component provides a consistent sizing and view, which frames other views.
-->



<template>

    <div class="frame">
        <slot />
    </div>

</template>

<style scoped>
.frame {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em;
    border-radius: 2em;
    background-color: var(--project-gray-1);
    min-width: clamp(50px, 500px, 100vw - 15em);
    min-height: clamp(50px, 500px, 100vw - 3em);
    max-width: clamp(500px, 500px, 100vw - 8em);
}
</style>