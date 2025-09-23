import { createEntity } from '@coltorapps/builder';
import { createEntityComponent } from '@coltorapps/builder-react';
import { tv } from 'tailwind-variants';
import { ContentAttributeComponent, contentAttribute } from './content.attribute';

export const paragraphEntity = createEntity({
  name: 'paragraph',
  attributes: [contentAttribute],
});

export const ParagraphEntityComponent = createEntityComponent(
  paragraphEntity,
  function ParagraphEntityComponent(props) {
    return (
      <pre
        className={paragraphClass({
          bold: props.entity.attributes.content.bold,
          italic: props.entity.attributes.content.italic,
        })}>
        {props.entity.attributes.content.text.trim() ? (
          props.entity.attributes.content.text
        ) : (
          <span className="text-neutral-medium">Empty paragraph.</span>
        )}
      </pre>
    );
  },
);

export function ParagraphEntityAttributes() {
  return <ContentAttributeComponent />;
}

const paragraphClass = tv({
  base: '!bg-transparent !text-neutral-400 !ring-0 m-0 whitespace-pre-wrap break-words p-0 font-sans text-sm [word-break:break-word]',
  variants: {
    bold: {
      true: 'font-semibold',
    },
    italic: {
      true: 'italic',
    },
  },
});
