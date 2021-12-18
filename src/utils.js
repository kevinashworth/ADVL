// random number between 0 and x - 1
export function randomNumber(x) {
  return Math.floor(Math.random() * x);
}

export function randomArrayEntry(arr) {
  if (arr.length === 0) {
    return null;
  }
  const randomIndex = randomNumber(arr.length);
  return arr[randomIndex];
}

export function randomVariant() {
  const variants = [
    "h3",
    "h4",
    "h5",
  ];
  const randomIndex = randomNumber(variants.length);
  return variants[randomIndex];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}