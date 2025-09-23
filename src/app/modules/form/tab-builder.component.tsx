import { FaIcon } from '@atomic';
import type { BuilderStore } from '@coltorapps/builder';
import { BuilderEntities } from '@coltorapps/builder-react';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { DndContainer, DndItem } from './form-builder-components/dnd';
import { type basicFormBuilder, entitiesComponents } from './form-builder-components/form-builder';
import { AddElementComponent } from './tab-builder-add.component';

const BuilderEntity = (props: {
  entityId: string;
  children: ReactNode;
  isActive: boolean;
  onFocus?: () => void;
  onDelete?: () => void;
  builderStore: BuilderStore;
}) => {
  const entityButtonClass = tv({
    base: 'absolute top-0 right-0 bottom-0 left-0 rounded-xl border-1 transition-all',
    variants: {
      isActive: {
        true: 'border-neutral-medium',
        false: 'border-transparent hover:border-neutral-medium/30',
      },
    },
    compoundVariants: [
      {
        isActive: false,
        hasError: true,
        class: 'border-destructive',
      },
    ],
  });

  return (
    <div className="relative mb-xs">
      <div className="absolute inset-0 rounded-xl" />
      <div
        className="pointer-events-none relative p-sm"
        tabIndex={-1}
        onFocusCapture={e => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        {props.children}
      </div>
      <button
        type="button"
        className={entityButtonClass({
          isActive: props.isActive,
        })}
        onPointerDown={props.onFocus}
      />
      {props.isActive ? (
        <button
          type="button"
          className="-top-xs -right-xs absolute flex h-5 w-5 items-center justify-center rounded-full bg-fixed-black"
          onClick={props.onDelete}>
          <FaIcon.Close className="w-3 text-fixed-white" />
        </button>
      ) : null}
    </div>
  );
};

interface TabBuilderProps {
  builderStore: BuilderStore<typeof basicFormBuilder>;
  onFocus: (entityId: string) => void;
  activeEntityId: string | null;
}

export const TabBuilder: React.FC<TabBuilderProps> = ({ builderStore, onFocus, activeEntityId }) => {
  return (
    <div className="grid gap-md">
      <DndContainer builderStore={builderStore}>
        {({ draggingId }: { draggingId?: string | null }) => (
          <BuilderEntities builderStore={builderStore} components={entitiesComponents}>
            {props => (
              <>
                <DndItem id={props.entity.id}>
                  <BuilderEntity
                    builderStore={builderStore}
                    entityId={props.entity.id}
                    isActive={activeEntityId === props.entity.id && draggingId !== props.entity.id}
                    onFocus={() => onFocus(props.entity.id)}
                    onDelete={() => builderStore.deleteEntity(props.entity.id)}>
                    {props.children}
                  </BuilderEntity>
                </DndItem>
              </>
            )}
          </BuilderEntities>
        )}
      </DndContainer>
      <AddElementComponent onAdd={(params: any) => builderStore.addEntity(params)} />
    </div>
  );
};
