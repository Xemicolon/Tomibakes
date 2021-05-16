<template>
  <div class="homepage px-4">
    <h1 class="text-2xl font-bold mt-6">
      Welcome to Tomibakes 😁👩‍🍳, how may we be of help today?
    </h1>
    <div class="menu mt-8 grid">
      <nuxt-link
        to="/order"
        class="
          hover:bg-gray-200
          text-gray-700
          p-3
          border
          rounded-md
          mb-4
          font-semibold
        "
        >📦 Place an order</nuxt-link
      >

      <nuxt-link
        to="/order"
        class="
          hover:bg-gray-200
          text-gray-700
          p-3
          border
          rounded-md
          mb-4
          font-semibold
        "
        >⭐ Reviews</nuxt-link
      >

      <nuxt-link
        to="/order"
        class="
          hover:bg-gray-200
          text-gray-700
          p-3
          border
          rounded-md
          mb-4
          font-semibold
        "
        >🖼️ Gallery</nuxt-link
      >

      <p
        class="
          hover:bg-gray-200
          text-gray-700
          p-3
          border
          rounded-md
          mb-4
          font-semibold
          cursor-pointer
        "
        @click="show = !show"
      >
        ☎️ Contact me
      </p>

      <div v-if="show">
        <p>📞 09023690908, 09053283288</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
}
</script>

<style scoped></style>
