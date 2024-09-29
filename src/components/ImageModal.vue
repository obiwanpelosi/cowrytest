<script setup lang="ts">
import { Image } from "@/models";
import AppModalOverlay from "./AppModalOverlay.vue";
import { useTemplateRef, watch } from "vue";

defineProps<{
  active: boolean;
  image?: Image;
}>();

defineEmits<{
  (e: "close"): void;
}>();

const imageRef = useTemplateRef("imageRef");

function loaded() {
  if (imageRef.value) {
    imageRef.value.classList.add("loaded");
  }
}
watch(
  () => imageRef.value,
  () => {
    if (imageRef.value && imageRef.value.complete) {
      loaded();
    } else if (imageRef.value) {
      imageRef.value.addEventListener("load", loaded);
    }
  }
);
</script>
<template>
  <AppModalOverlay :active="active" @close="$emit('close')">
    <template #default>
      <div class="bg-white rounded-md w-4/5 mx-auto lg:w-full">
        <div class="h-[400px] md:h-[500px]">
          <img
            loading="lazy"
            ref="imageRef"
            :src="image?.urls.full"
            :alt="image?.alt_description"
            class="w-full h-full object-cover rounded-t-md opacity-0 transition-opacity duration-500"
          />
        </div>
        <div class="p-4 rounded-b-md">
          <h2 class="text-lg font-semibold">{{ image?.user.name }}</h2>
          <p class="text-sm text-gray-500">{{ image?.user.location }}</p>
        </div>
      </div>
    </template>
  </AppModalOverlay>
</template>

<style scoped>
img.loaded {
  opacity: 1;
}
</style>
