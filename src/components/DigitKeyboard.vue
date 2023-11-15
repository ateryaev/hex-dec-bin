<script setup>
import { onMounted, onUnmounted, reactive, ref, computed, nextTick } from 'vue'
const props = defineProps({base:Number, clipboardText:String, displayText:String});
const emit = defineEmits(['input']);

const baseConig = {
    16: { digits: "0123456789ABCDEF", group: 4, name: "HEX" },
    10: { digits: "0123456789", group: 3, name: "DEC" },
    2: { digits: "01", group: 4, name: "BIN" }
};

const currentBaseText = computed(() => {
  if (isDisabled()) return "HEX/DEC/BIN";
  return baseConig[props.base].name;
});

const buttons =[
  "COPY", "PASTE", "CLEAR", "BACKSPACE",
  "0", "1", "2", "3", 
  "4", "5", "6", "7", 
  "8", "9", "a", "b", 
  "c", "d", "e", "f"
];

function isDisabled() {
  return !(props.base == 2 ||props.base == 10 ||props.base == 16);
}
function isDigit(action) {
  return (action.length == 1);
}

function handleMousedown(e, action) {
  //const isTouch = (window.ontouchstart !== undefined);
  //if (e.type === "mousedown" && isTouch) return;
  e.preventDefault();
  if(isDisabled()) return;
  emit('input', action);
}

function isDigitDisabled(action) {
  if (isDisabled()) {
    return true;
  }

  if (!isDigit(action)) {
    return false;
  }
  
  if (baseConig[props.base].digits.indexOf(action.toUpperCase())>=0) {
    return false;
  }
  return true;
}

</script>

<template>



<div class="main" :class="{disabled:isDisabled()}">
  <div class="subtitle" :class="{disabled:isDisabled()}">
    <div v-if="clipboardText">Clipboard:</div>
    <div v-if="clipboardText">{{ clipboardText }}</div>
  </div>  
  <div class="subtitle minidisplay"><div>{{ currentBaseText }}:</div><div>{{ displayText }}</div></div>
  <button v-for="action in buttons" :class="{digit:isDigit(action), disabled:isDigitDisabled(action)}"
    @mousedown="(e)=>handleMousedown(e, action)">
      {{ action }}
  </button>
</div>
  
</template>

<style scoped>

div.main {
    display: grid;
    grid-template-columns: 25% 25% 25% auto;
    grid-template-rows: 16px 40px 16px repeat(4, 40px);
    gap:0px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    overflow: hidden;
}

div.main>div.subtitle {
    grid-column-end: span 4;
}
div.subtitle:not(.minidisplay) {
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}
div.disabled div.subtitle:not(.minidisplay) {
  box-shadow: none;
}
div.main>div.minidisplay {
  grid-row-start: 3;
}
div.disabled button {
  background: transparent;
  color: rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.1);
}
div button.disabled {
  color: rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.1);
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  color: #000;
  margin-left: -1px;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  background: #eee;
  transition: background 0.2s, color 0.2s;
}

button:hover {
  background: #fff;
}
button:active {
  background: rgba(0,0,0,0.2);
  color: #fff;
  transition: all 0s;
}

button.digit {
  font-size: 125%;
  
  
}

</style>
