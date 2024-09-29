<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import ImageApiService from "./services/imageApi";
import SearchInput from "./components/SearchInput.vue";
import { useDebounceFn } from "@vueuse/core";
import { Image } from "./models";
import ImageItem from "./components/ImageItem.vue";
import LoadingComponent from "./components/LoadingComponent.vue";
import ImageModal from "./components/ImageModal.vue";

const searchKeyword = ref("african");
const loading = ref(false);
const showImageModal = ref(false);
const selectedImageId = ref("");
const images = ref<Image[]>([]);

const firstColumn = computed(() => {
  return images.value.filter((_, index) => index % 3 === 0);
});
const secondColumn = computed(() => {
  return images.value.filter((_, index) => index % 3 === 1);
});
const thirdColumn = computed(() => {
  return images.value.filter((_, index) => index % 3 === 2);
});
const selectedImage = computed(() => {
  return images.value.find((image) => image.id === selectedImageId.value);
});
async function getImages() {
  try {
    loading.value = true;
    const response = await ImageApiService.searchImages(searchKeyword.value);
    images.value = response.results;
  } catch (error) {
    console.error(error);
    images.value = [];
  } finally {
    loading.value = false;
  }
}
function showImage(id: string) {
  selectedImageId.value = id;
  showImageModal.value = true;
}
function closeImageModal() {
  showImageModal.value = false;
  selectedImageId.value = "";
}
const debouncedRequest = useDebounceFn(getImages, 1000);

watch(searchKeyword, () => {
  debouncedRequest();
});
onMounted(async () => {
  await getImages();
});
</script>
<template>
  <div class="pb-12 h-full" :class="{ 'overflow-y-hidden': showImageModal }">
    <header class="bg-slate-200 px-4 py-20 md:px-[20%]">
      <SearchInput
        :loading="loading"
        :keyword="searchKeyword"
        v-model="searchKeyword"
      />
    </header>
    <section
      class="max-w-[800px] mx-auto px-4 py-10 md:relative md:top-[-70px]"
    >
      <LoadingComponent v-if="loading" />
      <div v-else-if="images.length === 0" class="mt-[70px] text-center">
        No images found
      </div>
      <div v-else class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        <div class="grid gap-4 md:gap-6">
          <ImageItem
            v-for="image in firstColumn"
            :key="image.id"
            :image="image"
            @showImage="(id) => showImage(id)"
          />
        </div>
        <div class="grid gap-4 md:gap-6">
          <ImageItem
            v-for="image in secondColumn"
            :key="image.id"
            :image="image"
            @showImage="(id) => showImage(id)"
          />
        </div>
        <div class="grid gap-4 md:gap-6">
          <ImageItem
            v-for="image in thirdColumn"
            :key="image.id"
            :image="image"
            @showImage="(id) => showImage(id)"
          />
        </div>
      </div>
    </section>
    <ImageModal
      :active="showImageModal"
      :image="selectedImage"
      @close="closeImageModal"
    />
  </div>
</template>

<style scoped></style>
