<template>
  <div class="cake-options mb-20">
    <h1 class="text-2xl text-center font-bold mb-3">Cake</h1>
    <p class="">✔ the options you want for your cake</p>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Flavor</p>
      <div class="grid grid-cols-3">
        <label for="vanillack" class="text-sm">
          <input
            id="vanillack"
            type="checkbox"
            value="vanilla"
            @click="updateitem('flavor', $event.target)"
          />
          Vanilla
        </label>

        <label for="chocolateck" class="text-sm">
          <input
            id="chocolateck"
            type="checkbox"
            value="chocolate"
            @click="updateitem('flavor', $event.target)"
          />
          Chocolate
        </label>

        <label for="red-velvetck" class="text-sm">
          <input
            id="red-velvetck"
            type="checkbox"
            value="red-velvet"
            @click="updateitem('flavor', $event.target)"
          />
          Red velvet
        </label>
      </div>
    </div>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Size</p>
      <div class="grid grid-cols-2">
        <label for="6inchesck" class="text-sm">
          <input
            id="6inchesck"
            type="checkbox"
            value="6inches"
            @click="updateitem('size', $event.target)"
          />
          Small
        </label>

        <label for="8inchesck" class="text-sm">
          <input
            id="8inchesck"
            type="checkbox"
            value="8inches"
            @click="updateitem('size', $event.target)"
          />
          Medium
        </label>

        <label for="10inchesck" class="text-sm">
          <input
            id="10inchesck"
            type="checkbox"
            value="10inches"
            @click="updateitem('size', $event.target)"
          />
          Big
        </label>

        <label for="12inchesck" class="text-sm">
          <input
            id="12inchesck"
            type="checkbox"
            value="12inches"
            @click="updateitem('size', $event.target)"
          />
          Large
        </label>
      </div>
    </div>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Frosting</p>
      <div class="grid">
        <label for="buttercreamck" class="text-sm">
          <input
            id="buttercreamck"
            type="checkbox"
            value="buttercream"
            @click="updateitem('frosting', $event.target)"
          />
          Buttercream
        </label>
      </div>
    </div>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Occasion</p>
      <div class="grid grid-cols-2">
        <label for="birthdayck" class="text-sm">
          <input
            id="birthdayck"
            type="checkbox"
            value="birthday"
            @click="updateitem('occassion', $event.target)"
          />
          Birthday
        </label>

        <label for="weddingck" class="text-sm">
          <input
            id="weddingck"
            type="checkbox"
            value="wedding"
            @click="updateitem('occassion', $event.target)"
          />
          Wedding
        </label>

        <label for="naming-ceremonyck" class="text-sm">
          <input
            id="naming-ceremonyck"
            type="checkbox"
            value="naming-ceremony"
            @click="updateitem('occassion', $event.target)"
          />
          Naming ceremony
        </label>

        <label for="personalck" class="text-sm">
          <input
            id="personalck"
            type="checkbox"
            value="personal"
            @click="updateitem('occassion', $event.target)"
          />
          Personal
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
        @click="updatecake"
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
      frosting: {},
      occassion: [],
    }
  },
  mounted() {
    const orders = JSON.parse(localStorage.getItem('orders'))
    const inputs = document.querySelectorAll('input')

    if (!orders) {
      return
    }

    //

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].name === 'cake') {
        if (orders[i].flavor) {
          this.flavor = orders[i].flavor
        }

        if (orders[i].size) {
          this.size = orders[i].size
        }

        if (orders[i].occassion) {
          this.occassion = orders[i].occassion
        }

        if (orders[i].frosting) {
          this.frosting = orders[i].frosting
        }
      }
    }

    if (this.flavor && this.flavor.length > 0) {
      for (let i = 0; i < this.flavor.length; i++) {
        for (let j = 0; j < inputs.length; j++) {
          // flavor
          if (inputs[j].id === this.flavor[i].id) {
            inputs[j].checked = true
          }
        }
      }
    }

    if (this.size && this.size.length > 0) {
      for (let i = 0; i < this.size.length; i++) {
        for (let j = 0; j < inputs.length; j++) {
          // size
          if (inputs[j].id === this.size[i].id) {
            inputs[j].checked = true
          }
        }
      }
    }

    if (this.occassion && this.occassion.length > 0) {
      for (let i = 0; i < this.occassion.length; i++) {
        for (let j = 0; j < inputs.length; j++) {
          // occassion
          if (inputs[j].id === this.occassion[i].id) {
            inputs[j].checked = true
          }
        }
      }
    }

    if (this.frosting && this.frosting.length > 0) {
      for (let j = 0; j < inputs.length; j++) {
        // frosting
        if (inputs[j].id === 'buttercreamck') {
          inputs[j].checked = true
        }
      }
    }
  },
  methods: {
    updateitem(type, e) {
      if (type === 'flavor' && e.checked === true) {
        return this.flavor.push({ id: e.id, type: e.value })
      }

      if (type === 'flavor' && e.checked === false) {
        this.flavor = this.flavor.filter((item) => item.type !== e.value)
        return
      }

      if (type === 'size' && e.checked === true) {
        return this.size.push({ id: e.id, inches: e.value })
      }

      if (type === 'size' && e.checked === false) {
        this.size = this.size.filter((item) => item.inches !== e.value)
        return
      }

      if (type === 'occassion' && e.checked === true) {
        return this.occassion.push({ id: e.id, type: e.value })
      }

      if (type === 'occassion' && e.checked === false) {
        this.occassion = this.occassion.filter((item) => item.type !== e.value)
        return
      }

      if (type === 'frosting' && e.checked === true) {
        this.frosting = e.value
      }

      if (type === 'frosting' && e.checked === false) {
        this.frosting = ''
      }
    },
    updatecake() {
      this.$store.dispatch('cart/updateItems', {
        name: 'cake',
        flavor: this.flavor,
        size: this.size,
        occassion: this.occassion,
        frosting: this.frosting,
      })
    },
  },
}
</script>
