<script setup lang="ts">
import { Image } from "@/models";
import { onMounted, useTemplateRef } from "vue";

defineProps<{
  image: Image;
}>();
defineEmits<{
  (e: "showImage", id: string): void;
}>();

const imageRef = useTemplateRef("imageRef");

function loaded() {
  if (imageRef.value) {
    imageRef.value.classList.add("loaded");
  }
}
onMounted(() => {
  if (imageRef.value && imageRef.value.complete) {
    loaded();
  } else if (imageRef.value) {
    imageRef.value.addEventListener("load", loaded);
  }
});
</script>
<template>
  <div
    class="bg-white rounded-md shadow-md h-auto max-w-full relative cursor-pointer"
    @click="$emit('showImage', image.id)"
  >
    <img
      ref="imageRef"
      :src="image.urls.regular"
      :alt="image.alt_description"
      loading="lazy"
      class="w-full h-full min-h-[200px] object-cover rounded-md opacity-0 transition-opacity duration-300"
    />
    <div class="absolute inset-0 bg-black opacity-20 rounded-md"></div>
    <div class="absolute bottom-0 z-10 text-white w-full pl-4 pb-2">
      <h2 class="text-lg font-semibold">{{ image.user.name }}</h2>
      <p class="text-sm">{{ image.user.location }}</p>
    </div>
  </div>
</template>
<style scoped>
img.loaded {
  opacity: 1;
}
</style>
