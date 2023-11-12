<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import Digit from './Digit.vue'

const props = defineProps({
    modelValue: {type: Number, required: false, default: 2},
    base: {type: Number, required: false, default: 10},
})

const cursorPosition = ref(0);
const startIndex = ref(0);
const displayDiv = ref(null);
const readonly = ref(true);
const digitCount = ref(10);


const baseConig = {
    16: { digits: "0123456789ABCDEF", group: 4, name: "HEX" },
    10: { digits: "0123456789", group: 3, name: "DEC" },
    2: { digits: "01", group: 4, name: "BIN" }
}
//const emit = defineEmits(['tap'])

const emit = defineEmits(['update:modelValue'])

defineExpose({
    input
  });

function input(key) {
    if (key.length == 1) {
        if (baseConig[props.base].digits.indexOf(key.toUpperCase())>=0) {
            let str = "000000000000000" + displayValue();
            let beforeCursor = str.slice(0, str.length - cursorPosition.value);
            let afterCursor = str.slice(str.length - cursorPosition.value);
            const newStr = beforeCursor+key+afterCursor;
            const newVal = parseInt(newStr, props.base);
            emit('update:modelValue', newVal);
        }
    } else {
        switch (key) {
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
    //console.log("KEY METHOD", key, key == "ArrowLeft", props.modelValue);
    //handleNumberChange(50);
    if (e.metaKey || e.ctrlKey) {
        return;
    }
    if ((key == "ArrowLeft" && e.altKey) || key == "End") {
        setCursorPosition(digits.value.length);
        e.preventDefault();
    } else if (key == "ArrowLeft") {
        setCursorPosition(cursorPosition.value+1);
        e.preventDefault();
    }
    if ((key == "ArrowRight" && e.altKey) || key == "Home") {
        setCursorPosition(0);
        e.preventDefault();
    } else if (key == "ArrowRight") {
        setCursorPosition(cursorPosition.value-1);
        e.preventDefault();
    }

    if (key == "Backspace") {
        let str = "00000000000000" + displayValue();
        let beforeCursor = str.slice(0, str.length - cursorPosition.value - 1);
        let afterCursor = str.slice(str.length - cursorPosition.value);
        const newStr = beforeCursor+afterCursor;
        const newVal = parseInt("0" + newStr, props.base);
        emit('update:modelValue', newVal);
        e.preventDefault();
    }

    if (baseConig[props.base].digits.indexOf(key.toUpperCase())>=0) {
        let str = "000000000000000" + displayValue();
        let beforeCursor = str.slice(0, str.length - cursorPosition.value);
        let afterCursor = str.slice(str.length - cursorPosition.value);
        const newStr = beforeCursor+key+afterCursor;
        const newVal = parseInt(newStr, props.base);
        emit('update:modelValue', newVal);
        e.preventDefault();
    }
}

function displayValue() {
    return props.modelValue.toString(props.base);
}

function handleNumberChange(newValue) {
    emit('update:modelValue', props.modelValue);
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

function handleMouseDown(n) {
    setCursorPosition(n2i(n));
}
function setStartIndex(index) {
    if (index < 0) startIndex.value = 0;
    else if (index > 31 -  digitCount.value + 1) startIndex.value = 31-  digitCount.value + 1;
    else startIndex.value = index;
}
function setCursorPosition(index) {
    if (index > 31 || index < 0) return;
    console.log("TEST", index, startIndex.value, startIndex.value + digitCount.value)
    if (readonly.value == true) return;
    cursorPosition.value = index;
    
    if (index < startIndex.value+1) {
        setStartIndex(index - 1);
    }
    if (index > startIndex.value + digitCount.value - 2) {
        setStartIndex(index - digitCount.value + 2);
    }
}
function n2i(n) {
    return n - 1 + startIndex.value;
} 
function handleResize() {
    digitCount.value = Math.floor(displayDiv.value.offsetWidth/40) + 1;
}
onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
})
onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
})

function handleFocus(e) {readonly.value = false;}
function handleBlur(e) {readonly.value = true;}

//window.addEventListener("resize", this.myEventHandler);
</script>

<template>
    <div class="main" :class="{readonly}" tabindex="1"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="(e)=>keyboard(e)">
        <div class="title">{{ baseConig[base].name }}</div>
        <div class="display" :class="{readonly}" ref="displayDiv">
            <Digit v-for="n in digitCount" 
            :value="digitAt(n2i(n))" 
            :index="n2i(n)"
            :cursor="!readonly && n2i(n)===cursorPosition"
            :group="((n2i(n)+1) % baseConig[base].group == 1 && n!=1)"
            :odd="(Math.floor((n2i(n))/baseConig[base].group) % 2 == 0)"
            :readonly="readonly"
            @mousedown="handleMouseDown(n)"
            ></Digit>
        </div>
    </div>
</template>

<style scoped>

div.main:focus {
    box-shadow: 0 0 0 2px #eef;
}
div.main {
    display: grid;
    grid-template-columns: 50px auto;
    outline: 0;
}
div.main>div.title {
    background: #57a;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 70%;
    border: 2px solid #000;
    border-right: 0;
    
}
div.main.readonly>div.title {
    background: #ddd;
    color: #000;
}
div.main>div.display {
    border:1px solid red;
    padding: 0px;
    border:2px solid #000;
}
div.display {
    background: #fff;
    color: #fff;
    padding: 10px;
    border:2px solid red;
    overflow: hidden;
    display: flex;
    flex-direction: row-reverse;
    overflow: hidden;
}

</style>
