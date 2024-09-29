<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";

const props = defineProps<{
  active: boolean;
}>();

const emits = defineEmits<{
  (e: "close"): void;
}>();

const timeout = ref<number>();
const isVisible = ref(props.active);

function closeModal() {
  isVisible.value = false;
  setTimeout(() => emits("close"), 500);
}
watch(
  () => props.active,
  (newVal) => {
    if (newVal) {
      timeout.value = setTimeout(() => (isVisible.value = true), 10);
    }
  }
);
onUnmounted(() => {
  clearTimeout(timeout.value);
});
</script>
<template>
  <Transition
    name="fade"
    enter-from-class="opacity-0"
    enter-to-class="opacity-1"
    enter-active-class="transition ease-out duration-500"
    leave-from-class="opacity-1"
    leave-to-class="opacity-0"
    leave-active-class="transition-all ease-in duration-500"
  >
    <div v-if="active">
      <div class="modal-overlay-bg"></div>

      <div class="modal-overlay-content">
        <div class="relative w-full">
          <button
            @click="closeModal"
            class="absolute right-4 top-[-40px] lg:right-[-40px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#fff"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Transition
            name="slide"
            enter-from-class="transform translate-y-[400px] opacity-0"
            enter-to-class="transform translate-y-0 opacity-1"
            enter-active-class="transition ease-out duration-1000"
            leave-from-class="transform translate-y-0 opacity-1"
            leave-to-class="transform translate-y-[400px] opacity-0"
            leave-active-class="transition-all ease-in duration-1000"
          >
            <div v-if="isVisible" class="w-full">
              <slot></slot>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style>
/* .slide-fade-enter-active {
  transition: all 2s ease-out;
}

.slide-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(200px);
  opacity: 0;
} */
</style>
