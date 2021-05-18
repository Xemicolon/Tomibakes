<template>
  <div class="cake-options mb-20">
    <h1 class="text-2xl text-center font-bold mb-3">Cupcake</h1>
    <p class="">✔ the options you want for your cupcake</p>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Flavor</p>
      <div class="grid grid-cols-2">
        <label for="vanillac" class="text-sm">
          <input
            id="vanillac"
            type="checkbox"
            value="vanilla"
            @click="updateitem('flavor', $event.target)"
          />
          Vanilla
        </label>

        <label for="chocolatec" class="text-sm">
          <input
            id="chocolatec"
            type="checkbox"
            value="chocolate"
            @click="updateitem('flavor', $event.target)"
          />
          Chocolate
        </label>

        <label for="red-velvetc" class="text-sm">
          <input
            id="red-velvetc"
            type="checkbox"
            value="red-velvet"
            @click="updateitem('flavor', $event.target)"
          />
          Red velvet
        </label>

        <label for="buttercreamc" class="text-sm">
          <input
            id="buttercreamc"
            type="checkbox"
            value="buttercream"
            @click="updateitem('flavor', $event.target)"
          />
          Buttercream
        </label>

        <label for="whipped-cream" class="text-sm">
          <input
            id="whipped-cream"
            type="checkbox"
            value="whipped-cream"
            @click="updateitem('flavor', $event.target)"
          />
          Whipped cream
        </label>
      </div>
    </div>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Size</p>
      <div class="grid grid-cols-2">
        <label for="6inchesc" class="text-sm">
          <input
            id="6inchesc"
            type="checkbox"
            value="6inches"
            @click="updateitem('size', $event.target)"
          />
          Small
        </label>

        <label for="8inchesc" class="text-sm">
          <input
            id="8inchesc"
            type="checkbox"
            value="8inches"
            @click="updateitem('size', $event.target)"
          />
          Medium
        </label>

        <label for="10inchesc" class="text-sm">
          <input
            id="10inchesc"
            type="checkbox"
            value="10inches"
            @click="updateitem('size', $event.target)"
          />
          Big
        </label>

        <label for="12inchesc" class="text-sm">
          <input
            id="12inchesc"
            type="checkbox"
            value="12inches"
            @click="updateitem('size', $event.target)"
          />
          Large
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
        @click="updatecupcake"
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
    updatecupcake() {
      this.$store.dispatch('cart/updateItems', {
        name: 'cupcake',
        flavor: this.flavor,
        size: this.size,
      })
    },
  },
}
</script>
