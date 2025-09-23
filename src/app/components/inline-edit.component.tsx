/** biome-ignore-all lint/a11y/noStaticElementInteractions: <Intentional> */
import { Button, FaIcon, Form, FormField } from '@atomic';

import { Flex } from '@atomic/obj.flex';
import React from 'react';
import { style } from './inline-edit.component.style';

interface InlineEditProps {
  label?: string;
  children?: React.ReactNode;
  initialValue?: any;
  renderer?: (value: any) => React.ReactNode;
  onSave?: (value: any) => void;
  noBlock?: boolean;
  onRemove?: () => void;
  readonly?: boolean;
}

export const InlineEdit: React.FC<InlineEditProps> = props => {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(props.initialValue);

  const _handleValueChange = (val: any) => {
    setValue(val);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = (data: any) => {
    console.log('handleSave', data?.value);
    props.onSave?.(data?.value);
    setEditing(false);
  };

  const handleUnblockEdit = (e: any) => {
    if (!props.noBlock && !props.readonly) {
      e.stopPropagation();
      setEditing(true);
    }
  };

  const handleBlockEdit = (e: any) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleBlockRemove = (e: any) => {
    e.stopPropagation();
    props.onRemove?.();
  };

  return (
    <>
      {!props.readonly && (
        <div className={style().wrapper()}>
          {!editing && (
            <div className={style().rendererWrapper({ noBlock: props.noBlock })}>
              <Flex hAlign="start" vAlign="center">
                {props.renderer?.(value)}
                <FaIcon.ArrowDropDown className="text-neutral-medium text-xl" />
              </Flex>
            </div>
          )}
          {editing && (
            <div onClick={(e: any) => e.stopPropagation()} onKeyDown={(e: any) => e.stopPropagation()}>
              <Form onSubmit={handleSave}>
                <Flex hAlign="stretch" vAlign="center">
                  <div className="flex-1">
                    <FormField name="value" label={props.label} defaultValue={props.initialValue}>
                      {props.children}
                    </FormField>
                  </div>
                  <Flex noGrow>
                    <Button variant="primary" size="sm" type="submit">
                      <FaIcon.Check />
                    </Button>
                  </Flex>
                  <Flex noGrow>
                    <Button variant="neutral" onClick={handleCancel} size="sm">
                      <FaIcon.Close />
                    </Button>
                  </Flex>
                </Flex>
              </Form>
            </div>
          )}
          {!editing && !props.readonly && (
            <div
              className={style().clickArea({ noBlock: props.noBlock })}
              onClick={handleUnblockEdit}
              onKeyDown={handleUnblockEdit}
              onKeyUp={handleUnblockEdit}>
              {props.noBlock && (
                <>
                  <button className={style().buttonWrapper()} onClick={handleBlockEdit} type="button">
                    <FaIcon.Edit />
                  </button>
                  {props.onRemove && (
                    <button
                      className={style().buttonWrapper({ alert: true })}
                      onClick={handleBlockRemove}
                      type="button">
                      <FaIcon.Trash />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
      {props.readonly && props.renderer?.(value)}
    </>
  );
};
