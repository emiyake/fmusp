import {
  celPhoneMask,
  cnpjMask,
  cpfMask,
  creditCardMask,
  customMask,
  datetimeMask,
  moneyMask,
  onlyNumbersMask,
  zipCodeMask,
} from 'react-masked-text';

export const TextFieldMasks = {
  cellPhone: celPhoneMask,
  custom: customMask,
  cnpj: cnpjMask,
  cpf: cpfMask,
  creditCard: creditCardMask,
  datetime: datetimeMask,
  money: moneyMask,
  onlyNumbers: onlyNumbersMask,
  zipcode: zipCodeMask,
};
