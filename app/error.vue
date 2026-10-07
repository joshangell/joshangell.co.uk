<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const isNotFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ title: isNotFound.value ? 'File not found' : 'Error' })
</script>

<template>
  <NuxtLayout>
    <section class="error">
      <p class="display code">{{ error.statusCode }}</p>
      <p v-if="isNotFound">Not ready reading drive C:<br />File not found.</p>
      <p v-else>General failure reading the page.</p>
      <p class="muted">
        Abort, <a href="#" @click.prevent="clearError({ redirect: '/' })">Retry</a>, Fail?
      </p>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.error {
  padding: 3rem 0;
}

.code {
  font-size: 6rem;
  line-height: 1;
  margin: 0 0 1rem;
}
</style>
