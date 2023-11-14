<script setup>
import { onMounted, onUnmounted, reactive, ref, computed, nextTick } from 'vue'
import DigitDisplay from './components/DigitDisplay.vue'
import DigitKeyboard from './components/DigitKeyboard.vue'

const display = ref([]);
const number = ref(0);
const bases = [16, 10, 2];
const selectedIndex = ref(-1);
const clipboarText = ref("");
let intervalId = 0;

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
async function handleInput(action) {
  console.log("KEYBOARD: ", action, selectedIndex) 
  if (selectedIndex.value<0) return;
  const selectedDisplay = display.value[selectedIndex.value];

  if (action.toLowerCase() == "copy") {
    navigator.clipboard.writeText(selectedDisplay.displayValue());
    console.log("COPY: ", selectedDisplay.displayValue())
  }
  if (action.toLowerCase() == "paste") {
    selectedDisplay.input("clear");
    let clip = await navigator.clipboard.readText();
    clip = clip.slice(-128);
    console.log("PASTE: ", clip)
    for (let i=0; i<clip.length; i++) {
      selectedDisplay.input(clip.charAt(i));
      await nextTick();
    } 
  }
  selectedDisplay.input(action);
}

const currentDisplayText = computed(() => {
  if (!display.value[selectedIndex.value]) return "";
  return display.value[selectedIndex.value].displayValue();
});


async function updateClipboard() {
  if (window.document.hasFocus()) {
    const clip = await navigator.clipboard.readText();
    clipboarText.value = clip.slice(-128);
  }
}

onMounted(() => {
  intervalId = setInterval(updateClipboard, 1000);
})
onUnmounted(() => {
  clearInterval(intervalId);
})

</script>

<template>
      <div class="title">hex-dec-bin converter</div>
      <DigitDisplay v-for="(base, index) in bases" ref="display" 
        v-model="number" 
        :base="base"
        @focus="selectedIndex=index"
        @blur="selectedIndex=-1"/>
      <DigitKeyboard 
        :clipboardText="clipboarText"
        :displayText="currentDisplayText"
        :base="selectedIndex>-1?bases[selectedIndex]:-1" 
        @input="handleInput"
        />
        
        <div class="title"><div>Developed by</div><div>Anton Teryaev</div></div>
        <div class="title"><div>Source Code</div><a href="https://github.com/ateryaev/hex-dec-bin">https://github.com/ateryaev/hex-dec-bin</a></div>      
</template>

<style scoped>
</style>
