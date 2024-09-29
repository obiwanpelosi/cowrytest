<template>
  <div
    class="bg-gray-100 rounded-md shadow-md min-h-[250px] max-w-full relative"
  >
    <div
      class="absolute bottom-0 z-50 w-full pl-4 pb-2 h-[40px] flex flex-col gap-2"
    >
      <Skeleton class="h-4 w-20" />
      <Skeleton class="h-4 w-12" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from "./Skeleton.vue";
</script>

<style scoped></style>
