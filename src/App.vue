<script setup>
import { onMounted, onUnmounted, reactive, ref, computed, nextTick } from 'vue'
import DigitDisplay from './components/DigitDisplay.vue'
import DigitKeyboard from './components/DigitKeyboard.vue'
import {clipboard} from './clipboard'


const display = ref([]);
const number = ref(0);
const bases = [16, 10, 2];
const selectedIndex = ref(-1);
const clipboarText = ref("");
const zoom = ref(1);


async function handleInput(action) {
  console.log("KEYBOARD: ", action, selectedIndex) 
  if (selectedIndex.value<0) return;
  const selectedDisplay = display.value[selectedIndex.value];

  if (action.toLowerCase() == "copy") {
    clipboard.write(selectedDisplay.displayValue());
    clipboarText.value = selectedDisplay.displayValue();
    console.log("COPY: ", selectedDisplay.displayValue())
  }
  if (action.toLowerCase() == "paste") {
    selectedDisplay.input("clear");
    let clip = await clipboard.read();
    clip = clip.slice(-128);
    clipboarText.value = clip;
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

async function handleDisplayFocus(index) {
  selectedIndex.value=index;
  if (index < 0) return;
  clipboarText.value = await clipboard.preRead();
}
let zoomIndex = -1;
const zooms = [1, 1.5, 2.0];

function handleZoom(e) {
  const isTouch = (window.ontouchstart !== undefined);
  if (e.type === "mousedown" && isTouch) return;
  zoomIndex = (zoomIndex + 1) % zooms.length;
  document.body.style.zoom = zooms[zoomIndex];
}

 onMounted(() => {
  document.body.style.zoom = zooms[zoomIndex];;
 });
// onUnmounted(() => {
//   clearInterval(intervalId);
// })

</script>

<template>
      <div class="title">
        <div>hex-dec-bin converter</div>
        <button @mousedown.prevent="handleZoom" @touchstart.prevent="handleZoom">ZOOM &plusmn;</button>
      </div>
      <DigitDisplay v-for="(base, index) in bases" ref="display" 
        v-model="number" 
        :base="base"
        @copy.prevent="handleInput('copy')"
        @paste.prevent="handleInput('paste')"
        @focus="handleDisplayFocus(index)"
        @blur="handleDisplayFocus(-1)"/>
      <DigitKeyboard 
        :clipboardText="clipboarText"
        :displayText="currentDisplayText"
        :base="selectedIndex>-1?bases[selectedIndex]:-1" 
        @input="handleInput"
        />
        
        <div class="title">
          <div>
            Developed by
          </div>
          <div style="text-align: right;">
            Anton Teryaev
          </div>
        </div>
        <div class="title" style="margin-top: -8px;">
            <a href="https://github.com/ateryaev/hex-dec-bin">https://github.com/ateryaev/hex-dec-bin</a>
            <a onclick="document.getElementById('metaViewport').content='initial-scale=0.5,user-scalable=no';this.style.color='red'">2023</a>
        </div>
</template>

<style scoped>
</style>
