// select the form
const form = document.querySelector('#form');

// add an event listner to the form submit
form.addEventListener('submit', onFormSubmit);

// when the form is submitted, capture event
function onFormSubmit(event) {
    // prevent the default page relaod
    event.preventDefault();
    const { target } = event;

    // get all the form inputs values
    const key = Number(target.key.value);
    const text = target.text.value;
    const option = target.option.value;

    // pass values to encrypt/decrypt function
    transformText(key, text, option);
};

// a-z = 97 - 122  || A -Z = 65 - 90
function transformText(key, text, option) {
    // store text in result varaible
    let result = '';
    // iterate of user entered text
    for (let character of text) {
        // test is the character is an alphabet character
        const isAlpha = /[a-zA-Z]/.test(character);
        // test if the character is upper of lowercase
        const isUpper = character === character.toUpperCase();
        // convert the character to an ascii integer value
        let ascii = character.charCodeAt(0);

        // if its an alphabet character
        if (isAlpha) {
            // it we are encrypting
            if (option === 'encrypt') {
                // add the key to the ascii value
                ascii = character.charCodeAt(0) + key;
                // if the ascii value falls out of the alphabet range, subtract 26 
                if ((!isUpper && ascii > 'z'.charCodeAt(0)) || (isUpper && ascii > 'Z'.charCodeAt(0)))
                    ascii -= 26;
            }
            // it we are decrypting
            else if (option === 'decrypt') {
                // subtract the key to the ascii value
                ascii = character.charCodeAt(0) - key;
                 // if the ascii value falls out of the alphabet range, add 26 
                if ((!isUpper && ascii < 'a'.charCodeAt(0)) || (isUpper && ascii < 'A'.charCodeAt(0)))
                    ascii += 26;
            }
        };
         // add the transformed key to the result string
        result += String.fromCharCode(ascii);
    };
     // pass the key and result to the save to local storage function
    saveToLocalStorage(key, result);
};


function saveToLocalStorage(key, result) {
    // settign an item in local storage
    // the setItem method takes:
    // A key name (in order to identify and retrieve it), and a value as its paramters
    // Always convert your value whatever it is to a json string
    localStorage.setItem('CaesarCipher', JSON.stringify({ key, result }));

    // navigate to the results page
    window.location.href = './results.html'
};


