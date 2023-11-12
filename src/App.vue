<script setup>
import { reactive, ref, computed } from 'vue'
import DigitDisplay from './components/DigitDisplay.vue'
import DigitKeyboard from './components/DigitKeyboard.vue'

const display = ref([]);
const number = ref(0);
const bases = [16, 10, 2];
const selectedIndex = ref(-1);

function handlePaste(e) {
  console.log(e.clipboardData.getData("text"))
}

function handleCopy(e) {
  navigator.clipboard.writeText("1234567890");
}
function handleBtn(e) {
  console.log("BTN", display.value[0].keyboard)
  e.preventDefault();
  //e.target.blur();
}
function handleInput(action) {
  console.log("KEYBOARD: ", action, selectedIndex) 
  if (selectedIndex.value<0) return;
  display.value[selectedIndex.value].input(action);
}
</script>

<template>
      <h1>hex-dec-bin converter</h1>
      <div>
        <DigitDisplay v-for="(base, index) in bases" ref="display" 
          v-model="number" 
          :base="base"
          @focus="selectedIndex=index"
          @blur="selectedIndex=-1"/>
        </div>
        <div>
          <DigitKeyboard :base="selectedIndex>-1?bases[selectedIndex]:-1" @input="handleInput"/>
      </div>
      
</template>

<style scoped>
button:focus {
  border: 2px solid red;
}
button:active {
  border: 2px solid red;
}
</style>
