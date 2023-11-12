<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
const props = defineProps({ })

</script>

<template>
    <div class="window">
        <slot/>
    </div>
</template>

<style scoped>
div.window {
    background: #ddd;
    border: 4px solid #000;
    margin: 0 auto;
    height: fit-content;
    width: 90%;
}
div.window>div {
    margin: 10px;
    box-shadow: inset 0 0 10px red;
}
</style>
