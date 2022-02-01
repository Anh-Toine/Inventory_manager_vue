<template>
    <orders-component/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OrdersComponent from '@/components/OrdersComponent.vue'

export default defineComponent({
  name: 'OrdersPage',
  components: {
    OrdersComponent
  }
})
</script>
