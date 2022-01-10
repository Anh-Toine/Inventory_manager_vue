<template>
  <products-component />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductsComponent from '@/components/ProductsComponent.vue' // @ is an alias to /src

export default defineComponent({
  name: 'ProductsPage',
  components: {
    ProductsComponent
  }
})
</script>
