export function toPersianNumber(str: string | number) {
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let result = str.toString();
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(english[i], "g"), persian[i]);
  }
  return result;
}

export function toEnglishNumber(str: string | number): string {
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let result = str.toString();

  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(persian[i], "g"), english[i]);
  }

  return result;
}
