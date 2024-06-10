export default function stringToLowerCase(text: string) {
  return text.replace(/[A-Z]/g, function (match) {
    return '_' + match.toLocaleLowerCase();
  });
}
