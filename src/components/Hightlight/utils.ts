export function isin(
  a: { [key: string]: string | number },
  b: { [key: string]: string | number }
) {
  for (let k in a) if (!(k in b) || a[k] !== b[k]) return false;
  return true;
}
