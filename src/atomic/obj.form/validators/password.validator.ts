import { HasAtLeastOnePatternValidator } from './has-at-least-one-pattern.validator';
import { HasLowercaseCharacterValidator } from './has-lower-case-character.validator';
import { HasUppercaseCharacterValidator } from './has-upper-case-character.validator';
import { MinLengthValidator } from './min-length.validator';
import { strings } from './validators.strings';

const PASSWORD_LENGTH = 8;

const lengthMessage = strings.passwordMinLength(PASSWORD_LENGTH);

export const PasswordValidators = [
  MinLengthValidator(PASSWORD_LENGTH, lengthMessage),
  HasUppercaseCharacterValidator(),
  HasLowercaseCharacterValidator(),
  HasAtLeastOnePatternValidator([/\W/, /_/], strings.passwordSpecialChars),
];
