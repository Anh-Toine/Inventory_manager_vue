<template>
    <suppliers-component/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SuppliersComponent from '@/components/SuppliersComponent.vue'

export default defineComponent({
  name: 'SuppliersPage',
  components: {
    SuppliersComponent
  }
})
</script>
