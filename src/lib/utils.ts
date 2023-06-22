const startAsciiCode = 400;

export function getRandomInt(intValue: number): number {
  return Math.floor(Math.random() * intValue);
}

export function getRandomIntMinMax(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomHex(): number {
  return getRandomInt(256);
}

export function getRandomAsciiChar(): string {
  return `&#${startAsciiCode + getRandomInt(47)};`;
}

export function getChar(
  _posX: number,
  _posY: number,
  isWhite?: boolean
): string {
  const newChar = getRandomAsciiChar();
  const newGreen = getRandomHex();
  const style = isWhite
    ? "class='whiteChar'"
    : `style='color:rgb(0,${newGreen},0)'`;
  return `<span ${style}>${newChar}</span>`;
}

export function getProbability(min: number, max: number): number {
  return getRandomIntMinMax(min, max);
}
