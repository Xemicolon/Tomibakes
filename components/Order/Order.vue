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
            @click="saveOrder"
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
            @click="saveOrder"
          />
          parfaitake
        </label>
      </div>

      <div class="border rounded flex items-center mb-5">
        <label for="parfait" class="p-3 w-full cursor-pointer">
          <input
            id="parfait"
            type="checkbox"
            value="parfait"
            class=""
            @click="saveOrder"
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
            @click="saveOrder"
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
            @click="saveOrder"
          />
          Chinchin
        </label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      removed: [],
    }
  },
  methods: {
    saveOrder(e) {
      // if item is checked, add to orders array
      if (e.target.checked) {
        // this.orders.filter()
      }
    },
  },
}
</script>
