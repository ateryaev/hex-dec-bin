<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
const props = defineProps({ 
    value:String, 
    index:Number, 
    cursor:Boolean,
    group:Boolean,
    odd:Boolean,
    readonly:Boolean })

const indexSrt = computed(() => ("00"+props.index).slice(-2));
const valueStr = computed(() => ("0"+props.value).slice(-1));
const blank = computed(() => (props.value == ""));

</script>

<template>
    <div class="digit" :class="{blank, cursor, odd, readonly, group}">
        <div class="value">{{ valueStr }}</div>
        <div class="index">{{ indexSrt }}</div>
    </div>
</template>

<style scoped>

div.digit {
    display: grid;
    grid-template-columns:40px;
    grid-template-rows:50px 20px;
}
div.digit>div.value {
    font-size: 125%;
    color:#000;
    background-color: #fff;
}

div.digit.group>div.value {
    border-right-color:#ccc;
}
div.digit.group.readonly>div.value {
    border-right: 2px solid #ddd;
}

div.digit>div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid transparent;
}
div.digit.blank>div.value {
    color:#aaa;
}
div.digit.readonly>div.value {
    background-color: #eee;
}
div.digit.readonly.blank>div.value {
    color:#ddd;
}
div.digit.readonly.odd>div.value {
    background-color: #eee;
}
div.digit.odd>div.value {
    background-color: #fcfcfc;
}

div.digit.cursor>div.value {
    background:#ddf;
    animation: blink 0.5s infinite;
}
div.digit.cursor>div.index {
    color:#fff;
    background: #999;
}
.index {
    background: #444;
    font-size: 50%;
    background: #bbb;
    color:#444;
}

div.readonly .index {
    background: #ddd;
    color:#aaa;
}

@keyframes blink {
    0% {border-right-color: black;}
    49% {border-right-color: black;}
    50% {border-right-color: transparent;}
    99% {border-right-color: transparent;}
}

</style>
