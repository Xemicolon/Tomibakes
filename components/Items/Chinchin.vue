<template>
  <div class="cake-options mb-20">
    <h1 class="text-2xl text-center font-bold mb-3">Chinchin</h1>
    <p class="">✔ the options you want for your chinchin</p>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Size</p>
      <div class="grid grid-cols-2">
        <label for="6inchesch" class="text-sm">
          <input
            id="6inchesch"
            type="checkbox"
            value="6inches"
            @click="updateitem('size', $event.target)"
          />
          Small
        </label>

        <label for="8inchesch" class="text-sm">
          <input
            id="8inchesch"
            type="checkbox"
            value="8inches"
            @click="updateitem('size', $event.target)"
          />
          Medium
        </label>

        <label for="10inchesch" class="text-sm">
          <input
            id="10inchesch"
            type="checkbox"
            value="10inches"
            @click="updateitem('size', $event.target)"
          />
          Big
        </label>

        <label for="12inchesch" class="text-sm">
          <input
            id="12inchesch"
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
        @click="uodatechinchin"
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
      size: [],
    }
  },
  mounted() {
    const orders = JSON.parse(localStorage.getItem('orders'))
    const inputs = document.querySelectorAll('input')

    if (!orders) {
      return
    }

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].name === 'chinchin') {
        if (orders[i].size) {
          this.size = orders[i].size
        }
      }
    }

    if (this.size.length > 0) {
      for (let i = 0; i < this.size.length; i++) {
        for (let j = 0; j < inputs.length; j++) {
          // size
          if (inputs[j].id === this.size[i].id) {
            inputs[j].checked = true
          }
        }
      }
    }
  },
  methods: {
    updateitem(type, e) {
      if (type === 'size' && e.checked === true) {
        return this.size.push({ id: e.id, inches: e.value })
      }

      if (type === 'size' && e.checked === false) {
        this.size = this.size.filter((item) => item.inches !== e.value)
      }
    },
    uodatechinchin() {
      this.$store.dispatch('cart/updateItems', {
        name: 'chinchin',
        size: this.size,
      })
    },
  },
}
</script>
