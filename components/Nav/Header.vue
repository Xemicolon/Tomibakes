<template>
  <div class="bg-white py-3 px-6 border-b">
    <div class="flex flex-row justify-between items-center">
      <nuxt-link to="/" class="font-semibold">Logo</nuxt-link>
      <div class="flex flex-row">
        <div @click="show = !show">
          <p
            v-if="cartCount || count > 0"
            class="
              w-6
              h-6
              cartcount
              flex
              items-center
              justify-center
              rounded-full
              text-xs
              font-bold
              text-gray-200
              bg-teal-600
              absolute
              ml-4
            "
          >
            {{ cartCount || count }}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            class="w-8"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <rect fill="none" height="24" width="24" />
              <path
                d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div
      v-if="show"
      style="right: 10px; top: 50px; height: 95px"
      class="
        rounded-md
        border
        p-3
        absolute
        bg-white
        grid
        place-content-center
        shadow-sm
        w-8/12
      "
    >
      <p>Items: [ {{ getorders.toString() }} ]</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      count: 0,
      show: false,
    }
  },
  computed: {
    ...mapGetters({
      cartCount: 'cart/getCartCount',
      getorders: 'cart/getOrders',
    }),
  },

  mounted() {
    // const orders = JSON.parse(localStorage.getItem('orders'))

    this.count = this.cartCount
  },
}
</script>

<style scoped></style>
