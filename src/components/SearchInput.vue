<script setup lang="ts">
const model = defineModel({ type: String });
defineProps<{
  loading: boolean;
  keyword: string;
}>();
</script>
<template>
  <div>
    <p v-if="loading" class="text-blue-800 text-xl md:text-4xl font-semibold">
      Searching for <span class="text-slate-500">"{{ keyword }}"</span>
    </p>
    <input
      v-else
      type="text"
      placeholder="Search for photo"
      v-model="model"
      class="outline-none block w-full rounded-md px-4 py-4 placeholder-black"
    />
  </div>
</template>

<style scoped></style>
