<script setup lang="ts">
import { Avatar } from "@avatune/vue";
import theme from "@avatune/pacovqzz-theme/vue";
</script>

<template>
  <div class="container">
    <NuxtRouteAnnouncer />
    <Avatar :size="64" :theme="theme" seed="https://github.com/shadcn.png?12" />
    <Avatar :size="64" :theme="theme" seed="https://github.com/shadcn.png?34" />
    <Avatar :size="64" :theme="theme" seed="https://github.com/shadcn.png?56" />
    <Avatar :size="64" :theme="theme" seed="https://github.com/shadcn.png?78" />
    <Avatar :size="64" :theme="theme" seed="https://github.com/shadcn.png?90" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 3rem;
}
</style>
