const passInput = document.querySelector(".generator__output input");
const copyBtn = document.querySelector(".generator__copy");
const indicator = document.querySelector(".generator__indecator");
const passLength = document.querySelector(".generator__length--box input");
const passOptions = document.querySelectorAll(".generator__option input");
const generateBtn = document.getElementById("generate");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
};

copyBtn.addEventListener("click", copyPassword);
passLength.addEventListener("input", updateLength);
generateBtn.addEventListener("click", generatePassword);

function copyPassword() {
    navigator.clipboard.writeText(passInput.value);
}

function updateLength() {
    document.querySelector(".generator__length--content span").innerText = passLength.value;
    indicator.id = passLength.value <= 6 ? "weak" : passLength.value <= 12 ? "medium" : "strong";
    checkOptions();
}

function checkOptions() {
    let srtCharactersForPass = "";
    let excludeDuplicate = false;

    passOptions.forEach(option => {
        if (option.checked) {
            if (option.id !== "excDuplicate" && option.id !== "incSpaces") {
                srtCharactersForPass += characters[option.id];
            } else if (option.id === "incSpaces") {
                srtCharactersForPass = srtCharactersForPass.length > 35 ? `  ${srtCharactersForPass}  ` : ` ${srtCharactersForPass} `;
            } else {
                if(srtCharactersForPass.length <= 26 && passLength.value > 25) {
                    option.checked = false;
                    passLength.value = 26;
                    document.querySelector(".generator__length--content span").innerText = passLength.value;
                    alert("The number of characters is not allowed! Expand the options of the included area.");
                }
                excludeDuplicate = true;
            }
        }
    });

    generatePassword(srtCharactersForPass, excludeDuplicate);
}

function generatePassword(arrCharacters, excludeDuplicate) {
    let passRandom= "",
        passwordLength = passLength.value;

    for (let i = 0; i < passwordLength; i++) {
        let randomChar = arrCharacters[Math.floor(Math.random() * arrCharacters.length)];
        if (excludeDuplicate) {
            !passRandom.includes(randomChar) || randomChar == " " ? passRandom += randomChar : i--;
        } else {
            passRandom += randomChar;
        }
    }
    passInput.value = passRandom;
}

updateLength();
