// select the form
const form = document.querySelector('#form');

// add an event listner to the form submit
form.addEventListener('submit', onFormSubmit);

/* 
    when the form is submitted, 
    prevent the default action from happening
    get the key and text values from the form
    pass key and text to encryption function
*/
function onFormSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const key = Number(target.key.value);
    const text = target.text.value;
    const option = target.option.value;

    console.log({key, text, option});

    return option === 'encrypt'
        ? encryptText(key, text)
        : decryptText(key, text);
};

// encrypt text based on key value
function encryptText(key, text) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let letter = text.charCodeAt(i) + key;
        result += String.fromCharCode(letter);
    };

    saveToLocalStorage(key, result);
};

// decrypt text based on key value
function decryptText(key, text) {

};

function saveToLocalStorage(key, result) {
    console.log({result});
};
