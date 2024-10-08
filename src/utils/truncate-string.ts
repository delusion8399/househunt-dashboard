export const truncate = (text: string, len: number) => {
  if (text.length > len && text.length > 0) {
    return `${text.split(" ").slice(0, len).join(" ")} ...`;
  } else {
    return text;
  }
};
