<script setup lang="ts">
const route = useRoute()

// Normalised so /writing/x/ and /writing/x share one canonical
const canonical = computed(() => SITE_URL + (route.path.replace(/\/+$/, '') || '/'))

useHead({ link: [{ rel: 'canonical', href: canonical }] })
useSeoMeta({ ogUrl: canonical })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
