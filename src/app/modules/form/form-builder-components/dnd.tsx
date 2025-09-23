/** biome-ignore-all lint/correctness/useUniqueElementIds: <Intentional> */
import type { BuilderStore } from '@coltorapps/builder';
import { useBuilderStoreData } from '@coltorapps/builder-react';
import { DndContext, MouseSensor, useDraggable, useDroppable, useSensor } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type ReactNode, useState } from 'react';
import { tv } from 'tailwind-variants';

export function Droppable(props: { id: string; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} className={isOver ? 'bg-neutral-medium' : ''}>
      {props.children}
    </div>
  );
}
export function Draggable(props: { a: string; children: ReactNode; element?: React.ElementType }) {
  const Element = props.element || 'div';
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.a,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Element style={style} ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </Element>
  );
}

export function DndItem(props: { id: string; children: ReactNode }) {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const dndItemClass = tv({
    base: '',
    variants: {
      isDragging: {
        true: 'z-50',
        false: '',
      },
    },
  });

  return (
    <>
      {/* <Droppable id={props.id}>
        <div className="h-[2px]"></div>
      </Droppable> */}
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={dndItemClass({ isDragging })}
        aria-describedby="dnd">
        {props.children}
      </div>
    </>
  );
}

export function DndContainer(props: {
  builderStore: BuilderStore;
  children: (props: { draggingId?: string | null }) => ReactNode;
}) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const rootEntities = useBuilderStoreData(props.builderStore, events =>
    events.some(event => event.name === 'RootUpdated' || event.name === 'DataSet'),
  ).schema.root;

  return (
    <DndContext
      id="dnd"
      sensors={[mouseSensor]}
      onDragStart={e => {
        if (typeof e.active.id === 'string') {
          setDraggingId(e.active.id);
        }
      }}
      onDragEnd={e => {
        const overId = e.over?.id;

        setDraggingId(null);

        if (!overId || typeof e.active.id !== 'string') {
          return;
        }

        const index = rootEntities.indexOf(overId as string);

        props.builderStore.setEntityIndex(e.active.id, index);
      }}>
      <SortableContext id="sortable" items={[...rootEntities]} strategy={verticalListSortingStrategy}>
        {props.children({
          draggingId,
        })}
      </SortableContext>
    </DndContext>
  );
}
