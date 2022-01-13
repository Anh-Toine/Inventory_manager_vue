<template>
  <categories-component />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CategoriesComponent from '@/components/CategoriesComponent.vue' // @ is an alias to /src

export default defineComponent({
  name: 'CategoriesPage',
  components: {
    CategoriesComponent
  }
})
</script>
