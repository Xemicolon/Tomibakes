<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '~/components/Nav/Header'

export default {
  components: {
    Header,
  },
}
</script>

<style>
html {
  font-family: 'Nunito', sans-serif;
}
</style>
