import { Button, Card, Divider, FaIcon, Flex } from '@atomic';

import Tippy from '@tippyjs/react';
import { useState } from 'react';

interface AddElementComponentProps {
  onAdd?: (type: string) => void;
}

export const AddElementComponent = (props: AddElementComponentProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAdd = (params: any) => {
    props.onAdd?.(params);
    setMenuVisible(false);
  };

  return (
    <Tippy
      placement="bottom"
      interactive
      render={attrs => {
        return (
          menuVisible && (
            <div {...attrs} className="relative">
              <Card>
                <Flex row={false} noGap className="p-xs">
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() => handleAdd({ type: 'textField', attributes: { label: 'Text Field' } })}>
                    <FaIcon.Plus />
                    Text Field
                  </Button>
                  <Divider className="my-xs" />
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() => handleAdd({ type: 'textareaField', attributes: { label: 'Textarea Field' } })}>
                    <FaIcon.Plus />
                    Textarea Field
                  </Button>
                  <Divider className="my-xs" />
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() =>
                      handleAdd({
                        type: 'selectField',
                        attributes: { label: 'Select Field', options: ['option 1', 'option 2', 'option 3'] },
                      })
                    }>
                    <FaIcon.Plus />
                    Select Field
                  </Button>
                  <Divider className="my-xs" />
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() => handleAdd({ type: 'paragraph', attributes: { content: { text: '' } } })}>
                    <FaIcon.Plus />
                    Paragraph
                  </Button>
                  <Divider className="my-xs" />
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() => handleAdd({ type: 'datePickerField', attributes: { label: 'Date Picker Field' } })}>
                    <FaIcon.Plus />
                    Date Picker Field
                  </Button>
                  <Divider className="my-xs" />
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() =>
                      handleAdd({
                        type: 'radioField',
                        attributes: { label: 'Radio Field', options: ['opção 1', 'opção 2'] },
                      })
                    }>
                    <FaIcon.Plus />
                    Radio Field
                  </Button>
                  <Divider className="my-xs" />
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() =>
                      handleAdd({
                        type: 'checkboxField',
                        attributes: { label: 'Checkbox Field', options: ['opção 1'] },
                      })
                    }>
                    <FaIcon.Plus />
                    Checkbox Field
                  </Button>
                  <Divider className="my-xs" />
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() =>
                      handleAdd({
                        type: 'radioGridField',
                        attributes: {
                          label: 'Radio Grid Field',
                          rows: ['linha 1'],
                          columns: ['coluna 1'],
                          required: false,
                        },
                      })
                    }>
                    <FaIcon.Plus />
                    Radio Grid Field
                  </Button>
                  <Divider className="my-xs" />
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() =>
                      handleAdd({
                        type: 'checkGridField',
                        attributes: {
                          label: 'Check Grid Field',
                          rows: ['linha 1'],
                          columns: ['coluna 1'],
                          required: false,
                        },
                      })
                    }>
                    <FaIcon.Plus />
                    Check Grid Field
                  </Button>
                  <Divider className="my-xs" />
                  <Button
                    variant="neutral"
                    link
                    className="justify-start px-sm"
                    onClick={() => handleAdd({ type: 'fileUpload', attributes: { label: 'File Upload' } })}>
                    <FaIcon.Plus />
                    File Upload
                  </Button>
                </Flex>
              </Card>
            </div>
          )
        );
      }}
      visible={menuVisible}
      onClickOutside={() => setMenuVisible(false)}>
      <Button variant="primary" outlined size="sm" onClick={() => setMenuVisible(!menuVisible)}>
        <FaIcon.Plus /> Adicionar
      </Button>
    </Tippy>
  );
};
