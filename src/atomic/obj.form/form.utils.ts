import type { ArrayFieldRulesType, RulesType } from '@atomic/obj.form/form.model';
import type { FieldValues } from 'react-hook-form';

export const getRulesFromValidators = <T extends FieldValues>(
  validators: RulesType<T>[] | ArrayFieldRulesType<T>[],
) => {
  return (
    validators?.reduce((acc, rule, index) => {
      if (rule.validate) {
        const validateKey = `validate_${index}`;

        if (typeof rule.validate === 'function') {
          return Object.assign({}, acc, { validate: { ...acc.validate, [validateKey]: rule.validate } });
        }

        return Object.assign({}, acc, { validate: { ...acc.validate, ...rule.validate } });
      }

      return Object.assign({}, acc, rule);
    }, {}) ?? {}
  );
};
