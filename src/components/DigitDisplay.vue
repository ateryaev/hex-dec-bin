<script setup>
import { reactive, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Digit from './Digit.vue'

const maxSize = 32;
const props = defineProps({
    modelValue: {type: Number, required: false, default: 2},
    base: {type: Number, required: false, default: 10},
})
const digit = ref([]);

const cursorPosition = ref(0);
const displayDiv = ref(null);
const readonly = ref(true);
const resetTimeout = ref(null);

const baseConig = {
    16: { digits: "0123456789ABCDEF", group: 4, name: "HEX" },
    10: { digits: "0123456789", group: 3, name: "DEC" },
    2: { digits: "01", group: 4, name: "BIN" }
}

const emit = defineEmits(['update:modelValue'])

defineExpose({
    input,
    displayValue
  });

watch(readonly, (oldReadonly, newReadonly) => {
    if (newReadonly) {
        window.clearTimeout(resetTimeout.value);
    } else {
        resetTimeout.value = window.setTimeout(() => {
            displayDiv.value.children[0].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }, 2000 );
    }
    console.log("readonly: "+ newReadonly + oldReadonly);
})
function input(key, params) {
    console.log(key)
    if (key.length == 1) {
        if (baseConig[props.base].digits.indexOf(key.toUpperCase())>=0) {
            let str = "000000000000000" + displayValue();
            let beforeCursor = str.slice(0, str.length - cursorPosition.value);
            let afterCursor = str.slice(str.length - cursorPosition.value);
            const newStr = beforeCursor+key+afterCursor;
            const newVal = parseInt(newStr, props.base);
            setCursorPosition(cursorPosition.value);
            emit('update:modelValue', newVal);
        }
    } else {
        switch (key.toLowerCase()) {
            case "left":
                setCursorPosition(cursorPosition.value+1);
                break;
            case "right":
                setCursorPosition(cursorPosition.value-1);
                break;
            case "backspace":
                let str = "00000000000000" + displayValue();
                let beforeCursor = str.slice(0, str.length - cursorPosition.value - 1);
                let afterCursor = str.slice(str.length - cursorPosition.value);
                const newStr = beforeCursor+afterCursor;
                const newVal = parseInt("0" + newStr, props.base);
                emit('update:modelValue', newVal);
                break;
            case "clear":
                setCursorPosition(0);
                emit('update:modelValue', 0);
                break;
            case "home":
                setCursorPosition(0);
                break;
            case "end":
                setCursorPosition(digits.value.length);
                break;
        }
    }
}

function keyboard(e) {
    const key = e.key;
    if (e.metaKey || e.ctrlKey) {
        return;
    }
    if ((key == "ArrowLeft" && e.altKey) || key == "End") {
        input("end");
    } else if (key == "ArrowLeft") {
        input("left");
    } else if ((key == "ArrowRight" && e.altKey) || key == "Home") {
        input("home");
    } else if (key == "ArrowRight") {
        input("right");
    } else if (key == "Backspace") {
        input("backspace");
    } else if (baseConig[props.base].digits.indexOf(key.toUpperCase())>=0) {
        input(key);
    } else {
        return;
    }
    e.preventDefault();
}

function displayValue() {
    return props.modelValue.toString(props.base);
}

const digits = computed(() => {
  let str = props.modelValue.toString(props.base);
  return str.split('').reverse();
});

function digitAt(index) {
    if (!isMeanfullAt(index)) return "";
    return digits.value[index];
}
function isMeanfullAt(index) {
    if (index >= digits.value.length) return false;
    return true;
}

function handleMouseDown(idx) {
    if (readonly.value) return;
    setCursorPosition(idx);
}

function setCursorPosition(idx) {
    if (idx > 31 || idx < 0) return;
    cursorPosition.value = idx;
    displayDiv.value.children[idx].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}
function n2i(n) {
    return n - 1;
} 


function handleFocus(e) {readonly.value = false;}
function handleBlur(e) {readonly.value = true;}

//window.addEventListener("resize", this.myEventHandler);
</script>

<template>
    <div class="main" :class="{readonly}" tabindex="1"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="(e)=>keyboard(e)">
        <div class="subtitle"><span>{{ baseConig[base].name }}</span></div>
        <div class="display" :class="{readonly}" ref="displayDiv">
            <Digit v-for="n in maxSize" 
            ref="digit"
            :value="digitAt(n2i(n))" 
            :index="n2i(n)"
            :cursor="!readonly && n2i(n)===cursorPosition"
            :group="((n2i(n)+1) % baseConig[base].group == 1 && n!=1)"
            :readonly="readonly"
            @mousedown="handleMouseDown(n2i(n))"
            ></Digit>
        </div>
    </div>
</template>

<style scoped>

div.main {
    overflow: hidden;
    display: grid;
    grid-template-columns: 16px auto;
    outline: 0;
}

.subtitle{
  z-index: 2;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}
div.readonly .subtitle {
    box-shadow: none;
}
div.display.readonly {
    background: transparent;
}
div.display {
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: row-reverse;
	overflow-x: scroll;
    scrollbar-width: none;
}
div.display::-webkit-scrollbar {
    display: none;
}

</style>
