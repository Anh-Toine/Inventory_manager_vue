<template>
  <reports-component />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ReportsComponent from '@/components/ReportsComponent.vue' // @ is an alias to /src

export default defineComponent({
  name: 'ReportsPage',
  components: {
    ReportsComponent
  }
})
</script>
