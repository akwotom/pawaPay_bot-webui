<script setup>
const url = window.location.href;
</script>

<template>
  <div>
    You are attt: {{ url }}
    <RouterView />
  </div>
</template>

<style scoped></style>
