<template>
  <div class="options px-3">
    <div class="pb-8 pt-4">
      <nuxt-link
        to="/order"
        class="text-purple-600 hover:text-purple-800 text-md font-bold"
        >Go back to orders</nuxt-link
      >
    </div>

    <div v-if="cake">
      <Cake />
    </div>

    <div v-if="cupcake" class="pt-6">
      <Cupcake />
    </div>

    <div v-if="parfait" class="pt-6">
      <Parfait />
    </div>

    <div v-if="chinchin" class="pt-6">
      <Chinchin />
    </div>
  </div>
</template>

<script>
import Cake from '~/components/Items/Cake'
import Cupcake from '~/components/Items/Cupcake'
import Parfait from '~/components/Items/Parfait'
import Chinchin from '~/components/Items/Chinchin'

export default {
  components: {
    Cake,
    Cupcake,
    Parfait,
    Chinchin,
  },
  data() {
    return {
      cake: false,
      cupcake: false,
      parfait: false,
      chinchin: false,
    }
  },

  mounted() {
    const orders = JSON.parse(localStorage.getItem('orders'))
    this.$store.dispatch('cart/addItems', orders)
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].name === 'cake') {
        this.cake = true
      }
      if (orders[i].name === 'cupcake') {
        this.cupcake = true
      }

      if (orders[i].name === 'parfait') {
        this.parfait = true
      }

      if (orders[i].name === 'chinchin') {
        this.chinchin = true
      }
    }
  },
  methods: {
    // getorders() {},
  },
}
</script>
