<template>
  <div class="bg-gray-300">
    <Header class="sm:w-7/12 md:w-6/12 mx-auto" />
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
