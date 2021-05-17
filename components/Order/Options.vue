<template>
  <div class="options px-3">
    <div class="mt-4">
      <nuxt-link
        to="/order"
        class="text-purple-600 hover:text-purple-800 text-sm"
        >Go back to orders</nuxt-link
      >
    </div>

    <div class="my-8">
      <h1 class="text-2xl font-bold">Options available for selected Items</h1>
      <span>({{ getorders.toString() }})</span>
    </div>

    <div v-if="cake">
      <Cake />
    </div>

    <div v-if="cupcake">
      <Cupcake />
    </div>

    <div v-if="parfait">
      <Parfait />
    </div>

    <div v-if="chinchin">
      <Chinchin />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      getorders: 'cart/getOrders',
    }),
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
