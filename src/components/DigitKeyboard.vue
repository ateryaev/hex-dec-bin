<script setup>
const props = defineProps({base:Number});
const emit = defineEmits(['input']);

const baseConig = {
    16: { digits: "0123456789ABCDEF", group: 4, name: "HEX" },
    10: { digits: "0123456789", group: 3, name: "DEC" },
    2: { digits: "01", group: 4, name: "BIN" }
};


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

//e.clipboardData.getData("text")
</script>

<template>



<div class="main" :class="{disabled:isDisabled()}">
  <div class="subtitle" :class="{disabled:isDisabled()}">BUFFER CONTENT: 123 FFAB</div>  
  <div class="subtitle minidisplay">MINI DISPLAY: 4 985 100 101</div>
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
    grid-template-rows: 20px 50px 20px repeat(4, 50px);
    gap:0px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
}

div.main>div.subtitle {
    grid-column-end: span 4;
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

button.digit {
  font-size: 125%;
  background: #fff;
  
}
button:active {
  background: rgba(0,0,0,0.2);
  color: #fff;
  transition: all 0s;
}
</style>
