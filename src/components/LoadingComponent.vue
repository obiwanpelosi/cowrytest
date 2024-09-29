<script setup lang="ts">
import ImageSkeleton from "./ImageSkeleton.vue";
</script>
<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
    <div class="grid gap-4 md:gap-6">
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
    </div>
    <div class="grid gap-4 md:gap-6">
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
    </div>
    <div class="grid gap-4 md:gap-6">
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
    </div>
  </div>
</template>

<style scoped></style>
