import { Button, FaIcon, InputCaptionError, InputLabel, TextAreaInput } from '@atomic';
import { Flex } from '@atomic/obj.flex';
import { createAttribute } from '@coltorapps/builder';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { tv } from 'tailwind-variants';
import { z } from 'zod';
import { useRefWithErrorFocus } from './utils/error-focus';
import { formatError } from './utils/validation-error';

export const contentAttribute = createAttribute({
  name: 'content',
  validate(value) {
    return z
      .object({
        text: z.string().min(1).max(1000),
        bold: z.boolean().optional(),
        italic: z.boolean().optional(),
      })
      .parse(value);
  },
});

export const ContentAttributeComponent = createAttributeComponent(
  contentAttribute,
  function ContentAttributeComponent(props) {
    const inputRef = useRefWithErrorFocus<HTMLTextAreaElement>(props.attribute.error);

    return (
      <div>
        <Flex hAlign="between" className="mb-xs">
          <InputLabel htmlFor={props.attribute.name} aria-required>
            Conteúdo
          </InputLabel>
          <Flex className="gap-xs" noGrow>
            <Button
              size="xs"
              outlined={!props.attribute.value.italic}
              variant="neutral"
              aria-label="Toggle italic"
              onClick={() => props.setValue({ ...props.attribute.value, italic: !props.attribute.value.italic })}>
              <FaIcon.Italic className="h-4 w-4" />
            </Button>
            <Button
              outlined={!props.attribute.value.bold}
              variant="neutral"
              size="xs"
              aria-label="Toggle bold"
              onClick={() => props.setValue({ ...props.attribute.value, bold: !props.attribute.value.bold })}>
              <FaIcon.Bold className="h-4 w-4" />
            </Button>
          </Flex>
        </Flex>
        <TextAreaInput
          autoResize
          minRows={4}
          maxRows={10}
          ref={inputRef}
          className={style({
            bold: props.attribute.value.bold,
            italic: props.attribute.value.italic,
          })}
          id={props.attribute.name}
          name={props.attribute.name}
          value={props.attribute.value.text ?? ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            props.setValue({
              ...props.attribute.value,
              text: e.target.value,
            });
          }}
          required
          rows={10}
          autoFocus
        />
        <InputCaptionError hasError>
          {formatError(props.attribute.value, props.attribute.error)?.text?._errors?.[0]}
        </InputCaptionError>
      </div>
    );
  },
);

const style = tv({
  base: '',
  variants: {
    bold: {
      true: 'font-semibold',
    },
    italic: {
      true: 'italic',
    },
  },
});
