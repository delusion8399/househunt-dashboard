export function omitIf(obj: any, condition: any) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((k) => {
    if (obj[k] === condition) {
      delete obj[k];
    }
  });
  return newObj;
}
