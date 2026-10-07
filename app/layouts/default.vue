<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="site">
    <a class="skip" href="#main">Skip to content</a>

    <header class="wrap masthead">
      <NuxtLink to="/" class="prompt" :aria-current="isHome ? 'page' : undefined">
        <span class="user">josh</span><span class="muted">@</span><span class="host">angell</span><span class="muted">:~$</span>
        <span class="cursor" aria-hidden="true" />
        <span class="visually-hidden">Josh Angell — home</span>
      </NuxtLink>
      <nav class="nav" aria-label="Site">
        <NuxtLink to="/">writing</NuxtLink>
        <a href="/feed.xml">rss</a>
        <ThemeToggle />
      </nav>
    </header>

    <main id="main" class="wrap">
      <slot />
    </main>

    <footer class="wrap footer muted">
      <p>
        <span aria-hidden="true">--</span> © {{ new Date().getFullYear() }} Josh Angell, North Wales.
        Hand-built with Nuxt and a lot of play. Best viewed at 800×600.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Column flex would shrink-wrap these, un-centring the .wrap */
.site > * {
  width: 100%;
}

main {
  flex: 1;
}

.skip {
  position: absolute;
  left: -9999px;
}

.skip:focus {
  left: 16px;
  top: 8px;
  background: var(--bg-raised);
  padding: 0.25em 0.5em;
  z-index: 20;
}

.masthead {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.prompt {
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 1.9rem;
  line-height: 1;
  text-decoration: none;
  color: var(--ink);
}

.prompt .user,
.prompt .host {
  color: var(--accent);
  text-shadow: var(--glow);
}

.nav {
  display: flex;
  align-items: baseline;
  gap: 1.1rem;
  font-size: 0.9rem;
}

.nav a {
  color: var(--ink-soft);
  text-decoration: none;
}

.nav a::before {
  content: '/';
  color: var(--rule);
}

.nav a:hover,
.nav a.router-link-exact-active {
  color: var(--accent);
}

.footer {
  border-top: 1px dashed var(--rule);
  margin-top: 4rem;
  padding-top: 1rem;
  padding-bottom: 2.5rem;
  font-size: 0.8rem;
}

.footer p {
  margin: 0;
}
</style>
