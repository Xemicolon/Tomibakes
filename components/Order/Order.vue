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
            @click="additem"
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
            @click="additem"
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
            @click="additem"
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
            @click="additem"
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
            @click="additem"
          />
          Chinchin
        </label>
      </div>
      <button
        v-if="this.$store.state.cart.items.length !== 0"
        class="
          p-3
          bg-purple-700
          hover:bg-purple-800
          w-full
          rounded-sm
          text-white
          focus:outline-none
        "
        type="button"
      >
        Next
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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
