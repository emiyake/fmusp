import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: 'relative',
    overlay:
      'border-dashed border border-neutral bg-neutral-soft absolute top-0 bottom-0 left-0 right-0 z-4 flex items-center justify-center',
    message: 'text-black text-lg font-bold',
    removeButton:
      'text-feedback-danger absolute top-xs right-xs border-none bg-fixed-white rounded-full cursor-pointer',
    preview: 'relative border border-neutral rounded-lg  bg-neutral-xxsoft p-xs text-center',
    dragMessageWrapper:
      'cursor-pointer mb-sm flex h-[100px] w-full items-center justify-center bg-background text-neutral-strong text-sm',
    previewImage: 'w-full h-[60px] object-contain rounded-lg',
    previewIcon: 'text-6xl ',
    previewName:
      'text-left z-50 p-xs text-xs truncate hover:overflow-visible hover:absolute hover:bg-neutral-xxsoft hover:shadow-md',
    previewList: 'grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-x-sm',
  },
});
