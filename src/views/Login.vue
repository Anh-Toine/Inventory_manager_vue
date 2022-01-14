<template>
    <login-page-component/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPageComponent from '@/components/LoginPageComponent.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginPageComponent
  }
})
</script>
