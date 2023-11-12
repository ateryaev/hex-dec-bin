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

const buttons =[
  "end", "left", "right", "home", "backspace", "clear all",
  "a", "b", "c", "d", "e", "f", 
  "0", "1", "2", "3", "4", "5", "6",   "7",    "8",     "9",
  "copy", "paste"
  
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
  <button v-for="action in buttons" :class="{'material-symbols-outlined':!isDigit(action)}"
    @mousedown="(e)=>handleMousedown(e, action)">
      {{ isDigit(action)?action:icons[action] }}
  </button>
</div>
  
</template>

<style scoped>

div.main {
    box-shadow: 0 0 0 2px #eef;
    border:2px solid #000;
    background: #fff;
    display: grid;
    grid-template-columns: 16.7% 16.7% 16.7% 16.7% 16.7% auto;
    grid-template-rows: repeat(4, 60px);
    gap:0px;
    padding: 0px;
}
div.disabled {
  background: #eee;
  box-shadow: none;
}
div.disabled button {
  background: #eee;
  box-shadow: none;
  color: #888;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 125%;
  background: #ddf;
  border: 2px solid #000;
  margin: -2px;
}
button.material-symbols-outlined {
  font-size: 160%;
  background: #fff;
  
}
button:active {
  background: #57a;
  color: #fff;
}
button.material-symbols-outlined:active {
  background: #57a;
  color: #fff;
}

</style>
