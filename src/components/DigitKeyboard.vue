<script setup>
const props = defineProps({base:Number});
const emit = defineEmits(['input']);

const icons = {
  "end":"first_page",
  "left":"chevron_left",
  "right":"chevron_right",
  "home":"last_page",
  "backspace":"backspace",
  "clear all":"cancel",
  "copy":"content_copy",
  "paste":"content_paste",
}

const buttons2 =[
  "end", "left", "right", "home", "backspace", "clear all",
  "a", "b", "c", "d", "e", "f", 
  "0", "1", "2", "3", "4", "5", "6",   "7",    "8",     "9",
  "copy", "paste"
  
];

const buttons =[
  "copy", "paste", "clear all", "backspace",
  "0", "1", "2", "3", 
  "4", "5", "6", "7", 
  "8", "9", "A", "B", 
  "C", "D", "E", "F"
];

function isDisabled() {
  return !(props.base == 2 ||props.base == 10 ||props.base == 16);
}
function isDigit(buttonName) {
  return (buttonName.length == 1);
}

function handleMousedown(e, action) {
  e.preventDefault();
  if(isDisabled()) return;
  emit('input', action);
}
</script>

<template>

<div class="main" :class="{disabled:isDisabled()}">
  <div class="title">number&nbsp;keyboard</div>
  <div class="title minidisplay">DEC: 4 985 100 101</div>
  <button v-for="action in buttons" :class="{'material-symbols-outlined':!isDigit(action)}"
    @mousedown="(e)=>handleMousedown(e, action)">
      {{ isDigit(action)?action:icons[action] }}
  </button>
</div>
  
</template>

<style scoped>

div.main {
    display: grid;
    xgrid-template-columns: 16.7% 16.7% 16.7% 16.7% 16.7% auto;
    xgrid-template-rows: repeat(4, 60px);
    grid-template-columns: 25% 25% 25% auto;
    grid-template-rows: 20px 50px 20px repeat(4, 50px);
    gap:0px;
    xpadding: 0px;
    xmargin: -8px;
    xbackground: #000;
    xpadding: 1px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
}
div.main>* {
  border: 0px solid #000;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  margin: 0px;
  display: block;
}
div.main>div.title {
    background: #eee;
    color: #135;
    xborder: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-end: span 4;
    text-transform: uppercase;
    padding: 0 4px;
    font-size: 70%;
}

div.main>div.title.minidisplay {
  grid-column-start: 1;
    grid-column-end: span 4;
    grid-row-start: 3;
  text-align: right;
  padding: 0 4px;
  justify-content: end;
    text-transform: uppercase;
}
div.main.disabled>div.title {
  background: rgba(255,255,255,0.4);
}
div.disabled button {
  background: transparent;
  outline: 0;
  xbox-shadow: none;
  color: rgba(0,0,0,0.2);
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid #000;
  color: #000;
  text-transform: uppercase;
  font-size: 100%;
  xmargin: -1px;
  
}
button.material-symbols-outlined {
  font-size: 160%;
  background: #eee;
  
}
button:active {
  background: #fff;
  color: #579;
}
</style>
