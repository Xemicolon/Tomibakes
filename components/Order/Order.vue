<template>
  <div class="order px-4 w-full">
    <h1 class="mt-4 font-bold text-2xl">What do you want to order?</h1>
    <form action="" class="mt-6">
      <div class="border rounded flex items-center mb-5">
        <label for="cake" class="p-3 w-full cursor-pointer">
          <input
            id="cake"
            type="checkbox"
            value="cake"
            class=""
            @click="additem($event)"
          />
          Cake
        </label>
      </div>

      <div class="border rounded flex items-center mb-5">
        <label for="cupcake" class="p-3 w-full cursor-pointer">
          <input
            id="cupcake"
            type="checkbox"
            value="cupcake"
            class=""
            @click="additem($event)"
          />
          Cupcake
        </label>
      </div>

      <div class="border rounded flex items-center mb-5">
        <label for="parfait" class="p-3 w-full cursor-pointer">
          <input
            id="parfait"
            type="checkbox"
            value="parfait"
            class=""
            @click="additem($event)"
          />
          Parfait
        </label>
      </div>

      <div class="border rounded flex items-center mb-5">
        <label for="brownies" class="p-3 w-full cursor-pointer">
          <input
            id="brownies"
            type="checkbox"
            value="brownies"
            class=""
            @click="additem($event)"
          />
          Brownies
        </label>
      </div>

      <div class="border rounded flex items-center mb-5">
        <label for="chinchin" class="p-3 w-full cursor-pointer">
          <input
            id="chinchin"
            type="checkbox"
            value="chinchin"
            class=""
            @click="additem($event)"
          />
          Chinchin
        </label>
      </div>
      <nuxt-link
        v-if="this.$store.state.cart.items.length !== 0"
        to="/order/options"
        class="
          bg-teal-700
          h-12
          hover:bg-purple-800
          w-full
          rounded
          grid
          items-center
          text-white
          focus:outline-none
          text-center
        "
        type="button"
      >
        Next
      </nuxt-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      isChecked: false,
    }
  },
  mounted() {
    const orders = JSON.parse(localStorage.getItem('orders'))
    const inputs = document.querySelectorAll('input')

    if (!orders) {
      return
    }

    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < orders.length; j++) {
        if (inputs[i].value === orders[j].name) {
          inputs[i].checked = true
        }
      }

      this.$store.dispatch('cart/addItems', orders)
      // if (inputs[i] === orders.name[i]) {
      //   inputs[i].checked = true
      // }
    }
  },
  methods: {
    additem(e) {
      if (e.target.checked) {
        return this.$store.dispatch('cart/addItem', e.target.value)
      }

      if (!e.target.checked) {
        return this.$store.dispatch('cart/removeItem', e.target.value)
      }
    },
    saveorder() {
      return this.$store.dispatch('cart/saveorder')
    },
  },
}
</script>
