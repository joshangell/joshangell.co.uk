<script setup lang="ts">
const { data: posts } = await useAsyncData('writing-list', () =>
  queryCollection('writing').select('path', 'title', 'date', 'description', 'body').order('date', 'DESC').all(),
)

const rows = computed(() =>
  (posts.value ?? []).map((post) => ({
    path: post.path,
    title: post.title,
    description: post.description,
    date: isoDate(post.date),
    words: countWords(post.body),
  })),
)

useSeoMeta({
  title: 'Josh Angell',
  description: 'Writing by Josh Angell — web developer in North Wales, mostly about building things for the web.',
  ogTitle: 'Josh Angell',
  ogImage: `${SITE_URL}/scafell.jpg`,
})
</script>

<template>
  <section class="intro">
    <figure class="window">
      <div class="titlebar" aria-hidden="true">
        <span class="boxes"><i /><i /><i /></span>
        <span>SCAFELL.JPG</span>
        <span class="boxes" />
      </div>
      <img
        src="/scafell.jpg"
        width="1200"
        height="817"
        alt="A boy in glasses and a plaid shirt, rucksack on, gazing across the rolling green fells of the Lake District under a heavy grey sky."
      />
      <figcaption class="muted">fig. 1 — me, the Lake District, the 90s. Still looking at the horizon.</figcaption>
    </figure>

    <div class="hello">
      <h1 class="display">Hello, I’m Josh.</h1>
      <p>
        I build things for the web from North Wales, and have done since the days of spacer gifs and tables. These
        days I’m working on <a href="https://www.success.co">Success.co</a>.
      </p>
      <p>This is where I write about building software, and about playing with it.</p>
    </div>
  </section>

  <section aria-labelledby="writing-heading" class="listing">
    <h2 id="writing-heading" class="command">
      <span class="muted">$</span> ls -lt ~/writing
    </h2>
    <p class="muted total">total {{ rows.length }}</p>

    <ol class="posts">
      <li v-for="post in rows" :key="post.path">
        <time :datetime="post.date" class="muted">{{ post.date }}</time>
        <span class="words muted">{{ post.words.toLocaleString('en-GB') }}w</span>
        <span class="entry">
          <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
          <span class="desc muted">{{ post.description }}</span>
        </span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.intro {
  display: grid;
  gap: 2rem;
  align-items: center;
  margin-bottom: 4rem;
}

@media (min-width: 720px) {
  .intro {
    grid-template-columns: 1.15fr 1fr;
  }
}

.window {
  margin: 0;
  background: var(--bg-raised);
  border: 2px solid var(--ink);
  box-shadow: 6px 6px 0 var(--rule);
}

@media (min-width: 720px) {
  .window {
    transform: rotate(-1deg);
  }
}

.titlebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.15rem 0.5rem;
  border-bottom: 2px solid var(--ink);
  background: repeating-linear-gradient(to bottom, var(--ink) 0, var(--ink) 1px, transparent 1px, transparent 3px);
  background-clip: content-box;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.titlebar > span:nth-child(2) {
  background: var(--bg-raised);
  padding: 0 0.6em;
}

.boxes {
  display: flex;
  gap: 4px;
  min-width: 46px;
  background: var(--bg-raised);
  padding: 0 4px;
}

.boxes i {
  width: 10px;
  height: 10px;
  border: 1.5px solid var(--ink);
}

.window img {
  display: block;
  width: 100%;
  height: auto;
  image-rendering: auto;
  filter: saturate(0.92) contrast(1.02);
}

.window figcaption {
  font-size: 0.75rem;
  padding: 0.4rem 0.6rem;
  border-top: 2px solid var(--ink);
  line-height: 1.4;
}

.hello h1 {
  font-size: 3.2rem;
  line-height: 1;
  margin: 0 0 1rem;
}

.hello p {
  margin: 0 0 1em;
}

.command {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.total {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
}

.posts {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px dashed var(--rule);
}

.posts li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.15rem 1.25rem;
  padding: 0.9rem 0;
  border-bottom: 1px dashed var(--rule);
  font-size: 0.95rem;
}

.posts time,
.words {
  font-size: 0.85rem;
  white-space: nowrap;
}

.words {
  text-align: right;
}

.entry {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
}

.entry a {
  font-weight: 600;
}

.desc {
  font-size: 0.85rem;
}

@media (min-width: 640px) {
  .posts li {
    grid-template-columns: 6.5rem 4.5rem 1fr;
  }

  .entry {
    grid-column: auto;
  }
}
</style>
