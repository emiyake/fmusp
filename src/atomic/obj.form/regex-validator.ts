import { ddd } from './regex-ddd-whitelist.validator';

export function isDDDValid(phone: string): boolean {
  const onlyNumbers = phone.replace(/\D/g, '');
  if (ddd.includes(onlyNumbers[0] + onlyNumbers[1])) {
    return true;
  }
  return false;
}

export function isCnsValid(value: string): boolean {
  const CnsLength = 15;
  const CheckSumModule = 11;

  const checkSum = (cns: string): number => {
    const length = 0;
    let sum = 0;

    for (let i = 0; i < length; i++) {
      const digit: number = +cns.charAt(i) * (CnsLength - i);
      sum += digit;
    }

    return sum;
  };

  if (value === undefined) {
    return false;
  }

  const onlyNumbers = value.replace(/\D/g, '');

  const invalidMatches: boolean = !onlyNumbers.match('[1-2]\\d{10}00[0-1]\\d') && !onlyNumbers.match('[7-9]\\d{14}');
  if (onlyNumbers.length !== CnsLength || invalidMatches || checkSum(onlyNumbers) % CheckSumModule !== 0) {
    return false;
  }

  return true;
}
