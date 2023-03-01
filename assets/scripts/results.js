const key = document.querySelector('#key');
const text = document.querySelector('#text');
const notification = document.querySelector('#notification');

function getFromLocalStorage(keyname) {
    // try to get the a value from local storage by its keyname
    let result = localStorage.getItem(keyname);

    // if the value is not null
    if (result) {
        // parse the json string back to an object
        result = JSON.parse(result);
        // assign the values to their respective dom elements
        key.innerText = result.key;
        text.innerText = result.result;
    }
    // if local storgae is empty, navigate away from this page
    else window.location.href = './index.html';
};

function changeNotificationText(value) {
    notification.innerText = value;
};

function copyElementText(element) {
    // copy the innerText of the clicked element to the clipboard
    navigator.clipboard.writeText(element.innerText);
    changeNotificationText('Text has been copied to the clipboard');
};

// run when script starts - IIFE
(() => {
    getFromLocalStorage('CaesarCipher');
    text.onclick = () => copyElementText(text);
    text.onmouseenter = () => changeNotificationText('Click the text to copy to the clipboard');
})()