import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input';

const MIN_DIGITS = 5;
const MAX_DIGITS = 15;

export const getFormattedPhoneValue = (value: string) => `${!!value && !value.startsWith('+') ? '+' : ''}${value}`;
export const getCountryCode = (value: string) => {
  const isPhoneLengthValid = value.length > MIN_DIGITS && value.length < MAX_DIGITS;
  return isPhoneLengthValid ? parsePhoneNumber(value, { defaultCountry: 'BR' })?.country : undefined;
};

export const validatePhoneNumber = (val: string | undefined | null) => !!val && isValidPhoneNumber(val);

export const formatInternationalPhoneNumber = (val: string) => formatPhoneNumberIntl(getFormattedPhoneValue(val));
export const formatLocalPhoneNumber = (val: string) => formatPhoneNumber(getFormattedPhoneValue(val));
export const formatPhoneNumberToBackend = (val: string) => val.replace(/[^\d]/g, '');
