<script setup>
const url = window.location.href;
</script>

<template>
  <div>
    You are at: {{ url }}
    <RouterView />
  </div>
</template>

<style scoped></style>
