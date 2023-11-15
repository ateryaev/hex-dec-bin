let isClipBoardReady = false;
let lastClipboardText = "";

function write(text) {
    navigator.clipboard.writeText(text);
    lastClipboardText = text;
}

function canPreRead() {
    return (navigator.userAgent.toLowerCase().indexOf("chrome") > -1);
}

async function preRead() {
    if (canPreRead()) return read();
    return lastClipboardText;
}

async function read() {
    const text = await navigator.clipboard.readText();
    lastClipboardText = text;
    return text;
}

export const clipboard = {
    write,
    read,
    preRead
}
