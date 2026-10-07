<script setup lang="ts">
const route = useRoute()
// Static hosts may add a trailing slash; content paths never have one
const path = route.path.replace(/\/+$/, '')

const { data: post } = await useAsyncData(`writing-${path}`, () => queryCollection('writing').path(path).first())

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'File not found', fatal: true })
}

const date = computed(() => isoDate(post.value!.date))
const words = computed(() => countWords(post.value!.body))
const slug = computed(() => post.value!.path.split('/').pop())

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogType: 'article',
  ogImage: `${SITE_URL}/scafell.jpg`,
  articlePublishedTime: date.value,
})
</script>

<template>
  <article v-if="post">
    <p class="path muted">
      <NuxtLink to="/" class="up">cd ..</NuxtLink>
      <span aria-hidden="true"> · </span>
      <span>~/writing/{{ slug }}.md</span>
    </p>

    <header class="head">
      <h1 class="display">{{ post.title }}</h1>
      <p class="meta muted">
        <time :datetime="date">{{ date }}</time>
        <span aria-hidden="true"> | </span>{{ words.toLocaleString('en-GB') }} words
        <span aria-hidden="true"> | </span>~{{ readingMinutes(words) }} min read
      </p>
    </header>

    <ContentRenderer :value="post" class="prose" />

    <footer class="end muted">
      <p class="eof">[EOF]</p>
      <p><NuxtLink to="/">← back to all writing</NuxtLink></p>
    </footer>
  </article>
</template>

<style scoped>
.path {
  font-size: 0.85rem;
  margin: 0 0 2rem;
}

.up {
  color: var(--ink-soft);
}

.head {
  margin-bottom: 2.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 3px double var(--rule);
}

.head h1 {
  font-size: clamp(2.6rem, 9vw, 4rem);
  line-height: 0.95;
  margin: 0 0 0.75rem;
  text-wrap: balance;
}

.meta {
  margin: 0;
  font-size: 0.85rem;
}

.end {
  margin-top: 3rem;
  font-size: 0.85rem;
}

.end p {
  margin: 0 0 0.5rem;
}

.eof {
  color: var(--accent);
  text-shadow: var(--glow);
}
</style>
