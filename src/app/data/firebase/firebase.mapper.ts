export const formatName = (text: string, maxLength: number): string =>
  text
    .replace(/-/g, '_')
    .replace(/\s/g, '_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .slice(0, maxLength);

export const formatParams = <T extends Record<string, any>>(
  eventParams: T,
  maxLength: { name: number; value: number },
): T => {
  const params = {} as T;

  Object.entries(eventParams).forEach(([name, value]) => {
    const newName = formatName(name, maxLength.name);
    const newValue = typeof value === 'string' ? value.slice(0, maxLength.value) : value;

    params[newName as keyof T] = newValue;
  });

  return params;
};
