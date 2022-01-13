<template>
    <suppliers-component/>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import SuppliersComponent from '@/components/SuppliersComponent.vue'
export default defineComponent({
    name: 'SuppliersPage',
    components:{
        SuppliersComponent
    }
})
</script>