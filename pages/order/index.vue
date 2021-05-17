<template>
  <div class="order-page sm:w-7/12 md:w-6/12 mx-auto bg-white h-screen pt-12">
    <Order />
  </div>
</template>

<script>
import Order from '~/components/Order/Order'
export default {
  components: {
    Order,
  },
}
</script>
