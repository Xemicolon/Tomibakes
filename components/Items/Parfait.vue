<template>
  <div class="cake-options mb-20">
    <h1 class="text-2xl text-center font-bold mb-3">Parfait</h1>
    <p class="">✔ the options you want for your parfait</p>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Flavor</p>
      <div class="grid grid-cols-3">
        <label for="vanillap" class="text-sm">
          <input
            id="vanillap"
            type="checkbox"
            value="vanilla"
            @click="
              updateitem('flavor', $event.target.checked, $event.target.value)
            "
          />
          Vanilla
        </label>

        <label for="chocolatep" class="text-sm">
          <input
            id="chocolatep"
            type="checkbox"
            value="chocolate"
            @click="
              updateitem('flavor', $event.target.checked, $event.target.value)
            "
          />
          Chocolate
        </label>

        <label for="red-velvetp" class="text-sm">
          <input
            id="red-velvetp"
            type="checkbox"
            value="red-velvet"
            @click="
              updateitem('flavor', $event.target.checked, $event.target.value)
            "
          />
          Red velvet
        </label>
      </div>
    </div>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Size</p>
      <div class="grid grid-cols-4">
        <label for="smallp" class="text-sm">
          <input
            id="smallp"
            type="checkbox"
            value="small"
            @click="
              updateitem('size', $event.target.checked, $event.target.value)
            "
          />
          Small
        </label>

        <label for="mediump" class="text-sm">
          <input
            id="mediump"
            type="checkbox"
            value="medium"
            @click="
              updateitem('size', $event.target.checked, $event.target.value)
            "
          />
          Medium
        </label>

        <label for="bigp" class="text-sm">
          <input
            id="bigp"
            type="checkbox"
            value="big"
            @click="
              updateitem('size', $event.target.checked, $event.target.value)
            "
          />
          Big
        </label>
      </div>
    </div>
    <div class="button float-right">
      <button
        type="button"
        class="
          bg-teal-600
          hover:bg-teal-700
          text-white
          px-3
          py-1
          focus:outline-none
        "
        @click="updateparfait"
      >
        Apply
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flavor: [],
      size: [],
    }
  },
  methods: {
    updateitem(type, checked, value) {
      if (type === 'flavor' && checked === true) {
        return this.flavor.push({ type: value })
      }

      if (type === 'flavor' && checked === false) {
        this.flavor = this.flavor.filter((item) => item.type !== value)
        return
      }

      if (type === 'size' && checked === true) {
        return this.size.push({ inches: value })
      }

      if (type === 'size' && checked === false) {
        this.size = this.size.filter((item) => item.inches !== value)
      }
    },
    updateparfait() {
      this.$store.dispatch('cart/updateItems', {
        name: 'parfait',
        flavor: this.flavor,
        size: this.size,
      })
    },
  },
}
</script>
