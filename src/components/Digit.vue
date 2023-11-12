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
    border-left:1px solid transparent;
    border-right:1px solid transparent;
}

div.digit.group>div.value {
    border-right-color:#000;
    xborder-left-color:#000;
    
}

div.digit>div {
    display: flex;
    justify-content: center;
    align-items: center;
    xborder-right: 1px solid transparent;
    xborder-left: 1px solid transparent;
}
div.digit.blank>div.value {
    color:rgba(0,0,0,0.2);
}
div.digit.readonly:not(.blank)>div.value {
    color:#fff;
}

div.readonly .index {
    color:rgba(255,255,255,0.4);
}

div.digit.odd>div.value {
    background: rgba(255,255,255,0.05);
}
div.digit>div.value {
    background: rgba(0,0,0,0.05);
}

div.digit.cursor>div.value {
    xbackground:#cde;
    background:rgba(100,140,180,0.5);
    animation: blink 0.5s infinite;
    border-left:2px solid transparent;
    border-right:2px solid transparent;
    xbox-shadow: 0 0 4px #000;
}
div.digit.cursor>div.index {
    background: #000;
    color: #fff;
    margin-bottom: -1px;
    margin-left: -1px;
    
}
.index {
    border:0;
    border-top: 1px solid #000;
    background: rgba(0,0,0,0.2);
    font-size: 70%;
    color:rgba(0,0,0,0.5);
    xborder-right: 1px solid transparent;
    xborder-left: 1px solid transparent;
}

@keyframes blink {
    0% {border-right-color: black;}
    49% {border-right-color: black;}
    50% {border-right-color: transparent;}
    99% {border-right-color: transparent;}
}

</style>
