<script setup lang="ts">
const theme = ref<'light' | 'dark' | null>(null)

onMounted(() => {
  const saved = document.documentElement.dataset.theme
  theme.value = saved === 'light' || saved === 'dark'
    ? saved
    : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
})

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem('theme', theme.value)
  } catch {}
}
</script>

<template>
  <button type="button" class="toggle" :aria-label="`Switch to ${theme === 'dark' ? 'paper' : 'CRT'} theme`" @click="toggle">
    [{{ theme === 'light' ? 'crt' : 'paper' }}]
  </button>
</template>

<style scoped>
.toggle {
  font: inherit;
  color: var(--ink-soft);
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.toggle:hover {
  color: var(--accent);
}
</style>
