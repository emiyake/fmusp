import { InputLabel } from '@atomic';
import { createEntity } from '@coltorapps/builder';
import { createEntityComponent } from '@coltorapps/builder-react';
import { useId } from 'react';
import { z } from 'zod';
import { DefaultDateValueAttributeComponent, defaultDateValueAttribute } from './default-date.attribute';
import { LabelAttributeComponent, labelAttribute } from './label.atribute';
import { RequiredAttributeComponent, requiredAttribute } from './required-attribute';

export const datePickerFieldEntity = createEntity({
  name: 'datePickerField',
  attributes: [labelAttribute, defaultDateValueAttribute, requiredAttribute],
  validate(value, context) {
    const schema = z.coerce.date();

    if (context.entity.attributes.required) {
      return schema.parse(value);
    }

    return schema.optional().parse(value);
  },
  defaultValue(context) {
    return context.entity.attributes.defaultValue;
  },
});

export const DatePickerFieldEntityComponent = createEntityComponent(
  datePickerFieldEntity,
  function DatePickerFieldEntityComponent(props) {
    const id = useId();

    // const buttonRef = useRefWithErrorFocus<HTMLButtonElement>(props.entity.error);

    return (
      <div>
        <InputLabel htmlFor={id} aria-required={props.entity.attributes.required}>
          {props.entity.attributes.label.trim() ? props.entity.attributes.label : 'Label'}
        </InputLabel>
        {/* <Popover modal>
          <PopoverTrigger asChild>
            <Button
              ref={buttonRef}
              id={id}
              variant={'outline'}
              className={cn(
                'w-full justify-start rounded-md text-left font-normal',
                !props.entity.value && 'text-muted-foreground',
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {props.entity.value ? format(props.entity.value, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={props.entity.value} onSelect={props.setValue} initialFocus />
          </PopoverContent>
        </Popover> */}
        {/* <ValidationError>{formatError(props.entity.value, props.entity.error)?._errors?.[0]}</ValidationError> */}
      </div>
    );
  },
);

export function DatePickerFieldEntityAttributes() {
  return (
    <>
      <LabelAttributeComponent />
      <RequiredAttributeComponent />
      <DefaultDateValueAttributeComponent />
    </>
  );
}
