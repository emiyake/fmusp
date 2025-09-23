import { InputCaptionError, InputLabel } from '@atomic';
import { createAttribute } from '@coltorapps/builder';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { z } from 'zod';
import { formatError } from './utils/validation-error';

export const defaultDateValueAttribute = createAttribute({
  name: 'defaultValue',
  validate(value) {
    return z.coerce.date().optional().parse(value);
  },
});

export const DefaultDateValueAttributeComponent = createAttributeComponent(
  defaultDateValueAttribute,
  function DefaultDateValueAttributeComponent(props) {
    return (
      <div>
        <InputLabel htmlFor={props.attribute.name}>Default Value</InputLabel>
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              outlined
              className={cn(
                'w-full justify-start rounded-md text-left font-normal',
                !props.attribute.value && 'text-muted-foreground',
              )}>
              <FaIcon.Calendar className="mr-2 h-4 w-4" />
              {props.attribute.value ? format(props.attribute.value, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={props.attribute.value}
              onSelect={(value: Date | undefined) => {
                props.setValue(value);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover> */}
        <InputCaptionError hasError>
          {formatError(props.attribute.value, props.attribute.error)?._errors?.[0]}
        </InputCaptionError>
      </div>
    );
  },
);
