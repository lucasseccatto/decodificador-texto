// Variáveis para elementos do DOM
const warning = document.querySelector(".content-left-rules p");
const input = document.querySelector(".text");
const encryptButton = document.querySelector(".encrypt");
const decryptButton = document.querySelector(".decrypt");
const messageTitle = document.querySelector(".content-right-message h2");
const messageParagraph = document.querySelector(".content-right-message p");
const encryptedText = document.querySelector(".encrypted-text");
const imagesRightContent = document.querySelector(".content-right-items");
const copyButton = document.querySelector(".content-right-copy");

function updateUI(text) {
  if (text == "") {
    encryptedText.style.display = "none";
    imagesRightContent.style.display = "flex";
    copyButton.style.display = "none";
    return;
  }

  if (/[^a-z, ]/.test(text)) {
    warning.style.color = "#ec2828";
    copyAllowed = false;
    messageTitle.style.color = "#ec2828";
    messageTitle.textContent = "Mensagem incorreta!";
    messageParagraph.textContent = "Apenas letras minúsculas e sem acento.";
  } else {
    warning.style.color = "#495057";
    copyAllowed = true;
    messageTitle.style.color = "#0A3871";
    messageTitle.textContent = "Mensagem encontrada com sucesso!";
    messageParagraph.textContent =
      "Pronto para criptografar ou descriptografar.";
  }
}

function encryptText(text) {
  return text
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
}

function decryptText(text) {
  return text
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
}

function handleButtonClick(encrypting) {
  const text = input.value;
  let processedText;

  if (text != "") {
    if (copyAllowed) {
      processedText = encrypting ? encryptText(text) : decryptText(text);
      navigator.clipboard.writeText(processedText);
      this.textContent = encrypting ? "Criptografado!" : "Descriptografado!";
      setTimeout(() => {
        this.textContent = encrypting ? "Criptografar" : "Descriptografar";
      }, 2500);

      encryptedText.style.display = "block";
      imagesRightContent.style.display = "none";
      copyButton.style.display = "block";
      encryptedText.textContent = processedText;
    } else {
      this.textContent = "Texto incorreto!";
      setTimeout(() => {
        this.textContent = encrypting ? "Criptografar" : "Descriptografar";
      }, 2500);

      encryptedText.style.display = "none";
      imagesRightContent.style.display = "flex";
      copyButton.style.display = "none";
    }
  }
}

function handleCopyButtonClick() {
  const copiedText = encryptedText.textContent;
  navigator.clipboard.writeText(copiedText);

  this.textContent = "Copiado!";
  setTimeout(() => {
    this.textContent = "Copiar";
  }, 2500);
}

input.addEventListener("input", () => updateUI(input.value));
encryptButton.addEventListener(
  "click",
  handleButtonClick.bind(encryptButton, true)
);
decryptButton.addEventListener(
  "click",
  handleButtonClick.bind(decryptButton, false)
);
copyButton.addEventListener("click", handleCopyButtonClick);
