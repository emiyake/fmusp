import { cnpj, cpf } from 'cpf-cnpj-validator';

export const validateCpf = (cpfString: string) => {
  return cpf.isValid(cpfString);
};

export const validateCnpj = (cnpjString: string) => {
  return cnpj.isValid(cnpjString);
};

export const formatCpf = (value: string) => {
  return cpf.format(value);
};
