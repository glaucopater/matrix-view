let matrixString = "";
const pixelWidth = 12;
const pixelHeight = 20;
const prob = 5;
const startAsciiCode = 400;

function getRandomInt(intValue: number): number {
  return Math.floor(Math.random() * intValue);
}

function getRandomIntMinMax(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min; 
}

function getRandomHex(): number {
  return getRandomInt(256);
}

function getRandomAsciiChar(): string {
  return `&#${startAsciiCode + getRandomInt(47)};`;
}

function getChar(posX: number, posY: number, isWhite?: boolean): string {
  const newChar = getRandomAsciiChar();
  const newGreen = getRandomHex();
  const style = isWhite ? "class='whiteChar'" : `style='color:rgb(0,${newGreen},0)'`;
  return `<span ${style}>${newChar}</span>`;
}

function getProbability(min: number, max: number): number {
  return getRandomIntMinMax(min, max);
}

function _print(str: string): void {
  const panel = document.querySelector(".panel") as HTMLElement;
  console.log(panel);
  panel.innerHTML = str;
}

function main(): void {
  const width = window.outerWidth;
  const height = window.outerHeight;
  const hChars = Math.round(width / pixelWidth);
  const vChars = Math.round(height / pixelHeight);
  
  for (let j = 0; j < vChars; j++) {
    let newSequence = "";
    let lastCharPosition: number = -1; // Initialize with a default value
    
    for (let i = 0; i < hChars; i++) {
      const isWhiteProb = getProbability(0, 100) === prob;
      newSequence += getChar(i, j, isWhiteProb) + " ";
      
      if (!isWhiteProb) {
        lastCharPosition = i;
        break;
      }
    }
    
    for (let i = lastCharPosition + 1; i < hChars; i++) {
      newSequence += getChar(i, j) + " ";
    }
    
    matrixString += `<p>${newSequence}</p>`;
  }
  
  _print(matrixString);
}

main();
