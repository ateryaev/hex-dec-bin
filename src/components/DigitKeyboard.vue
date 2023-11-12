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
  <div class="title"><span>number&nbsp;keyboard</span></div>
  <div class="title minidisplay"><span>4 985 100 101</span></div>
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
    grid-template-rows: 20px 40px 20px repeat(4, 40px);
    gap:1px;
    xpadding: 0px;
    xmargin: -8px;
    background: #000;
    padding: 1px;
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
div.main>div.title>span {
    xtransform: rotate(-90deg);
    font-size: 70%;
    xcolor: #000;
}
div.disabled {
  xbackground: #eee;
  box-shadow: none;
}
div.disabled button {
  xbackground: #eee;
  xbox-shadow: none;
  color: rgba(0,0,0,0.2);
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #579;
  border: 0px solid #000;
  color: #fff;
  text-transform: uppercase;
  font-size: 100%;
  
}
button.material-symbols-outlined {
  font-size: 160%;
  xbackground: #fff;
  
}
button:active {
  background: #fff;
  color: #579;
}
button.material-symbols-outlined {
  background: #579;
  color: #fff;
}

</style>
