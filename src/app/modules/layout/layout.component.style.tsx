import { tv } from 'tailwind-variants';

export const style = tv({
  slots: {
    wrapper: ['min-h-full', 'bg-linear-to-b from-background-strong from-97% to-fixed-transparent to-100%'],
    aside: ['transition-all overflow-x-hidden hidden md:block w-[86px] pt-[86px]', 'hover:w-[230px] group/aside'],
    main: [
      'min-w-0 max-w-full md:max-w-auto min-h-screen flex-1 pb-10 overflow-hidden pt-[86px]',
      'bg-background',
      "before:content-[''] before:w-full before:h-px before:block",
    ],
  },
});
