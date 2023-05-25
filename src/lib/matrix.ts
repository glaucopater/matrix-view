let matrixString = "";
const pixelWidth = 12;
const pixelHeight = 20;
const prob = 10; // Adjust probability as needed
const startAsciiCode = 400;
const maxWhiteChars = 100;

function getRandomInt(intValue: number): number {
  return Math.floor(Math.random() * intValue);
}

function getRandomIntMinMax(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHex(): number {
  return getRandomInt(256);
}

function getRandomAsciiChar(): string {
  return `&#${startAsciiCode + getRandomInt(47)};`;
}

function getChar(_posX: number, _posY: number, isWhite?: boolean): string {
  const newChar = getRandomAsciiChar();
  const newGreen = getRandomHex();
  const style = isWhite ? "class='whiteChar'" : `style='color:rgb(0,${newGreen},0)'`;
  return `<span ${style}>${newChar}</span>`;
}

function getProbability(min: number, max: number): number {
  return getRandomIntMinMax(min, max);
}

function render(str: string): void {
  const panel = document.querySelector(".panel") as HTMLElement;
  panel.innerHTML = str;
}

function calculateDimensions(): { width: number; height: number } {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width, height };
}

function generateMatrix(minWhiteCharCount: number): void {
  const { width, height } = calculateDimensions();
  const hChars = Math.floor(width / pixelWidth); // Use Math.floor for accurate character count
  const vChars = Math.floor(height / pixelHeight); // Use Math.floor for accurate character count

  let whiteCharCount = 0;

  matrixString = "";

  for (let j = 0; j < vChars; j++) {
    let newSequence = "";
    let lastCharPosition = -1;

    for (let i = 0; i < hChars; i++) {
      const isWhiteProb = getProbability(0, 100) <= prob;
      newSequence += getChar(i, j, isWhiteProb) + " ";

      if (!isWhiteProb) {
        lastCharPosition = i;
        whiteCharCount++;
      }

    }

    for (let i = lastCharPosition + 1; i < hChars; i++) {
      newSequence += getChar(i, j) + " ";
    }

    matrixString += `<p>${newSequence}</p>`;
  }

  if (whiteCharCount < minWhiteCharCount) {
    generateMatrix(minWhiteCharCount); // Regenerate the matrix if whiteCharCount is less than minWhiteCharCount
  } else {
    render(matrixString);
  }
}

window.addEventListener("resize", () => {
  generateMatrix(maxWhiteChars); // Regenerate the matrix on window resize with a minimum of 100 white characters
});

generateMatrix(maxWhiteChars);


const whiteChars = document.querySelectorAll(".whiteChar") as NodeListOf<HTMLElement>;
whiteChars.forEach((char) => {
  const delay = Math.random() * 2; // Generate a random delay between 0 and 2 seconds
  char.style.animation = `blink 3s ${delay}s infinite`; // Customize animation duration and delay as needed
});

console.log(`%c${"Matrix View v2.0 - https://github.com/glaucopater/matrix-view"}`, "color: green; font-weight: bold;");
